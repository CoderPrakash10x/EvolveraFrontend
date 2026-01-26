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

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: 0,
    eventDate: "",
    registrationDeadline: "",
    isRegistrationOpen: true
  });

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ EDIT MODE – SAFE FORM SET
  useEffect(() => {
    if (eventId) {
      getAdminEvents().then((events) => {
        const e = events.find((x) => x._id === eventId);
        if (!e) return;

        setForm({
          title: e.title || "",
          description: e.description || "",
          location: e.location || "",
          price: e.price || 0,
          eventDate: e.eventDate ? e.eventDate.slice(0, 10) : "",
          registrationDeadline: e.registrationDeadline
            ? e.registrationDeadline.slice(0, 10)
            : "",
          isRegistrationOpen: e.isRegistrationOpen
        });
      });
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      // ✅ SAFE APPENDS
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("location", form.location);
      fd.append("price", Number(form.price) || 0);

      if (form.eventDate) {
        fd.append("eventDate", form.eventDate);
      }

      if (form.registrationDeadline) {
        fd.append("registrationDeadline", form.registrationDeadline);
      }

      fd.append("isRegistrationOpen", form.isRegistrationOpen);

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
  console.error("Save event error:", err);
  toast.error(
    err?.response?.data?.message || "Event save failed"
  );
} finally {
  setLoading(false);
}

  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-black mb-10">
        {eventId ? "Edit" : "Create"}{" "}
        <span className="text-orange-500">Event</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <Input label="Title" name="title" value={form.title} onChange={handleChange} />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} />
        <Input label="Price" type="number" name="price" value={form.price} onChange={handleChange} />

        <Input
          label="Event Date"
          type="date"
          name="eventDate"
          value={form.eventDate}
          onChange={handleChange}
        />

        <Input
          label="Registration Deadline"
          type="date"
          name="registrationDeadline"
          value={form.registrationDeadline}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="text-sm text-gray-400"
        />

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="isRegistrationOpen"
            checked={form.isRegistrationOpen}
            onChange={handleChange}
          />
          Registration Open
        </label>

        <button
          disabled={loading}
          className="px-8 py-4 bg-orange-500 text-black font-black rounded-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

const Input = ({ label, ...props }) => (
  <input
    {...props}
    placeholder={label}
    className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
  />
);
