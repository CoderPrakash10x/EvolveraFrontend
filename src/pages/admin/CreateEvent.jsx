import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createAdminEvent,
  updateAdminEvent,
  getAdminEvents
} from "../../services/event.admin.service";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const eventId = params.get("id");

  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventStartAt: "",
    eventEndAt: "",
    registrationStartAt: "",
    registrationEndAt: "",
    registrationMode: "individual",
    minTeamSize: 1,
    maxTeamSize: 5,
    skills: "",
    perks: "",
    rules: ""
  });

  /* ================= LOAD EVENT (EDIT MODE) ================= */
  useEffect(() => {
    if (!eventId) return;

    getAdminEvents().then((events) => {
      const e = events.find((x) => x._id === eventId);
      if (!e) return;

      setForm({
        title: e.title || "",
        description: e.description || "",
        location: e.location || "",
        eventStartAt: e.eventStartAt?.slice(0, 16) || "",
        eventEndAt: e.eventEndAt?.slice(0, 16) || "",
        registrationStartAt: e.registrationStartAt?.slice(0, 16) || "",
        registrationEndAt: e.registrationEndAt?.slice(0, 16) || "",
        registrationMode: e.registrationMode || "individual",
        minTeamSize: e.minTeamSize || 1,
        maxTeamSize: e.maxTeamSize || 5,
        skills: (e.skills || []).join("\n"),
        perks: (e.perks || []).join("\n"),
        rules: (e.rules || []).join("\n")
      });
    });
  }, [eventId]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date();
    const eventStart = new Date(form.eventStartAt);

    if (eventStart < now) {
      toast.error("Event start time cannot be in the past");
      setLoading(false);
      return;
    }

    if (
      form.registrationStartAt &&
      new Date(form.registrationStartAt) > eventStart
    ) {
      toast.error("Registration start cannot be after event start");
      setLoading(false);
      return;
    }

    if (
      form.registrationEndAt &&
      new Date(form.registrationEndAt) > eventStart
    ) {
      toast.error("Registration end cannot be after event start");
      setLoading(false);
      return;
    }

    if (
      form.registrationMode !== "individual" &&
      Number(form.minTeamSize) > Number(form.maxTeamSize)
    ) {
      toast.error("Min team size cannot be greater than max team size");
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("location", form.location);
      fd.append("eventStartAt", form.eventStartAt);
      fd.append("eventEndAt", form.eventEndAt);
      fd.append("registrationStartAt", form.registrationStartAt);
      fd.append("registrationEndAt", form.registrationEndAt);
      fd.append("registrationMode", form.registrationMode);
      fd.append("minTeamSize", form.minTeamSize);
      fd.append("maxTeamSize", form.maxTeamSize);
      fd.append("skills", JSON.stringify(form.skills.split("\n").filter(Boolean)));
      fd.append("perks", JSON.stringify(form.perks.split("\n").filter(Boolean)));
      fd.append("rules", JSON.stringify(form.rules.split("\n").filter(Boolean)));

      if (coverImage) {
        fd.append("coverImage", coverImage);
      }

      if (eventId) {
        await updateAdminEvent(eventId, fd);
        toast.success("Event updated successfully");
      } else {
        await createAdminEvent(fd);
        toast.success("Event created successfully");
      }

      navigate("/admin/events");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-black mb-12">
        {eventId ? "Edit" : "Create"}{" "}
        <span className="text-orange-500">Event</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-12">

        <Section title="Basic Information">
          <Field label="Event Title" name="title" value={form.title} onChange={handleChange} required />
          <Field label="Location / Mode" name="location" value={form.location} onChange={handleChange} />
          <Textarea label="Event Description" name="description" value={form.description} onChange={handleChange} />
        </Section>

        <Section title="Event Schedule">
          <Field label="Event Start Date & Time" type="datetime-local" name="eventStartAt" value={form.eventStartAt} onChange={handleChange} required />
          <Field label="Event End Date & Time" type="datetime-local" name="eventEndAt" value={form.eventEndAt} onChange={handleChange} />
        </Section>

        <Section title="Registration Window">
          <Field label="Registration Start Date & Time" type="datetime-local" name="registrationStartAt" value={form.registrationStartAt} onChange={handleChange} />
          <Field label="Registration End Date & Time" type="datetime-local" name="registrationEndAt" value={form.registrationEndAt} onChange={handleChange} />
        </Section>

        <Section title="Registration Settings">
          <Select
            label="Registration Mode"
            name="registrationMode"
            value={form.registrationMode}
            onChange={handleChange}
            options={[
              { value: "individual", label: "Individual Only" },
              { value: "team", label: "Team Only" },
              { value: "both", label: "Both (Individual + Team)" }
            ]}
          />

          {form.registrationMode !== "individual" && (
            <div className="grid grid-cols-2 gap-6">
              <Field label="Min Team Size" type="number" name="minTeamSize" value={form.minTeamSize} onChange={handleChange} />
              <Field label="Max Team Size" type="number" name="maxTeamSize" value={form.maxTeamSize} onChange={handleChange} />
            </div>
          )}
        </Section>

        <Section title="Extra Details">
          <Textarea label="Skills (one per line)" name="skills" value={form.skills} onChange={handleChange} />
          <Textarea label="Perks / Benefits (one per line)" name="perks" value={form.perks} onChange={handleChange} />
          <Textarea label="Rules (one per line)" name="rules" value={form.rules} onChange={handleChange} />
        </Section>

        <Section title="Cover Image">
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
        </Section>

        <button disabled={loading} className="px-10 py-4 bg-orange-500 text-black font-black rounded-xl">
          {loading ? "Saving..." : "Save Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

/* ================= SMALL COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-orange-500">{title}</h3>
    {children}
  </div>
);

const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <input {...props} className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <textarea {...props} rows={4} className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <select {...props} className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10">
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);