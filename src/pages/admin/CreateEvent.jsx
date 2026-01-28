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
    eventDate: "",
    registrationStartDate: "",
    registrationEndDate: ""
  });


  useEffect(() => {
    if (!eventId) return;

    getAdminEvents().then((events) => {
      const e = events.find((x) => x._id === eventId);
      if (!e) return;

      setForm({
        title: e.title || "",
        description: e.description || "",
        location: e.location || "",
        eventDate: e.eventDate?.slice(0, 10) || "",
        registrationStartDate:
          e.registrationStartDate?.slice(0, 10) || "",
        registrationEndDate:
          e.registrationEndDate?.slice(0, 10) || ""
      });
    });
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(form.eventDate);

    // EVENT DATE IN PAST
    if (eventDate < today) {
      toast.error("Event date cannot be in the past");
      setLoading(false);
      return;
    }

    //Registrationstart date for event wowoowo

    if (
      form.registrationStartDate &&
      new Date(form.registrationStartDate) > eventDate
    ) {
      toast.error("Registration start date cannot be after event date");
      setLoading(false);
      return;
    }

  //registration end date for event
    if (
      form.registrationEndDate &&
      new Date(form.registrationEndDate) > eventDate
    ) {
      toast.error("Registration end date cannot be after event date");
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v) fd.append(k, v);
      });

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

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-black mb-12">
        {eventId ? "Edit" : "Create"}{" "}
        <span className="text-orange-500">Event</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-12">

        <Section title="Basic Information">
          <Field
            label="Event Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Eg. AI Bootcamp 2026"
            required
          />

          <Field
            label="Location / Mode"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Eg. Seminar Hall / Online"
          />

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Event Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Briefly explain what this event is about..."
              className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10 focus:outline-none focus:border-orange-500"
            />
          </div>
        </Section>

        <Section title="Event Schedule">
          <Field
            label="Event Date"
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />

          {form.eventDate && (
            <p className="text-sm text-gray-400">
              Status Preview:{" "}
              <span className="font-bold text-orange-400">
                {new Date(form.eventDate).toDateString() ===
                new Date().toDateString()
                  ? "LIVE"
                  : new Date(form.eventDate) > new Date()
                  ? "UPCOMING"
                  : "PAST"}
              </span>
            </p>
          )}
        </Section>

        <Section title="Registration Window">
          <Field
            label="Registration Start Date"
            type="date"
            name="registrationStartDate"
            value={form.registrationStartDate}
            onChange={handleChange}
          />

          <Field
            label="Registration End Date"
            type="date"
            name="registrationEndDate"
            value={form.registrationEndDate}
            onChange={handleChange}
          />
        </Section>

        <Section title="Cover Image">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="text-sm text-gray-400"
          />
          <p className="text-xs text-gray-500 mt-2">
            Recommended: Landscape poster / banner
          </p>
        </Section>

        <div className="pt-6">
          <button
            disabled={loading}
            className="px-10 py-4 bg-orange-500 text-black font-black rounded-xl
                       disabled:opacity-50 hover:scale-105 transition"
          >
            {loading ? "Saving..." : "Save Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;

const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-orange-500">
      {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10
                 focus:outline-none focus:border-orange-500"
    />
  </div>
);
