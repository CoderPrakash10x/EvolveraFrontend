import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createAdminEvent,
  updateAdminEvent,
  getAdminEvents
} from "../../services/event.admin.service";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  ImagePlus,
  Link2,
  MapPin,
  Settings2,
  Sparkles,
  Users,
  X,
  Save,
  ListChecks,
  Gift
} from "lucide-react";

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
    rules: "",
    googleFormUrl: ""
  });

  /* ================= LOAD EVENT ================= */

  useEffect(() => {
    if (!eventId) return;

    const loadEvent = async () => {
      try {
        const events = await getAdminEvents();

        const foundEvent = events.find((event) => {
          const id =
            event?._id ||
            event?._doc?._id;

          return String(id) === String(eventId);
        });

        if (!foundEvent) {
          toast.error("Event not found");
          return;
        }

        const data = foundEvent._doc || foundEvent;

        setForm({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",

          eventStartAt: data.eventStartAt
            ? data.eventStartAt.slice(0, 16)
            : "",

          eventEndAt: data.eventEndAt
            ? data.eventEndAt.slice(0, 16)
            : "",

          registrationStartAt: data.registrationStartAt
            ? data.registrationStartAt.slice(0, 16)
            : "",

          registrationEndAt: data.registrationEndAt
            ? data.registrationEndAt.slice(0, 16)
            : "",

          registrationMode:
            data.registrationMode || "individual",

          minTeamSize: data.minTeamSize || 1,
          maxTeamSize: data.maxTeamSize || 5,

          skills: Array.isArray(data.skills)
            ? data.skills.join("\n")
            : "",

          perks: Array.isArray(data.perks)
            ? data.perks.join("\n")
            : "",

          rules: Array.isArray(data.rules)
            ? data.rules.join("\n")
            : "",

          googleFormUrl: data.googleFormUrl || ""
        });
      } catch (error) {
        console.error("LOAD EVENT ERROR:", error);
        toast.error("Failed to load event");
      }
    };

    loadEvent();
  }, [eventId]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverImage(file);
  };

  const removeImage = () => {
    setCoverImage(null);
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
      toast.error(
        "Min team size cannot be greater than max team size"
      );
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

      fd.append(
        "registrationStartAt",
        form.registrationStartAt
      );

      fd.append(
        "registrationEndAt",
        form.registrationEndAt
      );

      fd.append(
        "registrationMode",
        form.registrationMode
      );

      fd.append("minTeamSize", form.minTeamSize);
      fd.append("maxTeamSize", form.maxTeamSize);

      fd.append(
        "skills",
        JSON.stringify(
          form.skills
            .split("\n")
            .filter(Boolean)
        )
      );

      fd.append(
        "perks",
        JSON.stringify(
          form.perks
            .split("\n")
            .filter(Boolean)
        )
      );

      fd.append(
        "rules",
        JSON.stringify(
          form.rules
            .split("\n")
            .filter(Boolean)
        )
      );

      fd.append(
        "googleFormUrl",
        form.googleFormUrl
      );

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
      toast.error(
        err?.response?.data?.message ||
          "Save failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/events")}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-500 transition mb-5"
          >
            <ArrowLeft size={16} />
            Back to Events
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500" />

            <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Event Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            {eventId ? "Edit" : "Create"}{" "}
            <span className="text-orange-500">
              Event
            </span>
          </h1>

          <p className="text-zinc-500 text-sm mt-3 max-w-xl">
            {eventId
              ? "Update your event details, registration settings and information."
              : "Create a new event and configure its registration experience."}
          </p>
        </div>

        {/* HEADER ACTION */}

        <div className="hidden md:flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03]">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600">
              Status
            </p>

            <p className="text-xs font-semibold text-zinc-300 mt-1">
              {eventId ? "Editing event" : "New event"}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ================= BASIC INFORMATION ================= */}

        <FormSection
          icon={<FileText size={18} />}
          title="Basic Information"
          description="Give your event a clear identity."
        >

          <div className="grid grid-cols-1 gap-6">

            <Field
              label="Event Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Prompt Forge 2026"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Field
                label="Location / Mode"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Seminar Hall / Online"
                icon={<MapPin size={16} />}
              />

              <Field
                label="Event Type"
                name="eventType"
                value="College Event"
                disabled
                icon={<Sparkles size={16} />}
              />

            </div>

            <Textarea
              label="Event Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell participants what this event is about..."
            />

          </div>
        </FormSection>


        {/* ================= SCHEDULE ================= */}

        <FormSection
          icon={<CalendarDays size={18} />}
          title="Event Schedule"
          description="Set when your event starts and ends."
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <DateField
              label="Event Start Date & Time"
              name="eventStartAt"
              value={form.eventStartAt}
              onChange={handleChange}
              required
            />

            <DateField
              label="Event End Date & Time"
              name="eventEndAt"
              value={form.eventEndAt}
              onChange={handleChange}
            />

          </div>

        </FormSection>


        {/* ================= REGISTRATION WINDOW ================= */}

        <FormSection
          icon={<Clock3 size={18} />}
          title="Registration Window"
          description="Control when participants can register."
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <DateField
              label="Registration Opens"
              name="registrationStartAt"
              value={form.registrationStartAt}
              onChange={handleChange}
            />

            <DateField
              label="Registration Closes"
              name="registrationEndAt"
              value={form.registrationEndAt}
              onChange={handleChange}
            />

          </div>

          <div className="flex gap-3 p-4 rounded-xl bg-orange-500/[0.05] border border-orange-500/10">

            <Clock3
              size={17}
              className="text-orange-500 shrink-0 mt-0.5"
            />

            <p className="text-xs leading-relaxed text-zinc-500">
              Registration should close before the event starts.
              Participants won't be able to register after the
              registration deadline.
            </p>

          </div>

        </FormSection>


        {/* ================= REGISTRATION ================= */}

        <FormSection
          icon={<Users size={18} />}
          title="Registration Settings"
          description="Choose how participants can register."
        >

          <Select
            label="Registration Mode"
            name="registrationMode"
            value={form.registrationMode}
            onChange={handleChange}
            options={[
              {
                value: "individual",
                label: "Individual Only"
              },
              {
                value: "team",
                label: "Team Only"
              },
              {
                value: "both",
                label: "Both — Individual + Team"
              }
            ]}
          />

          {form.registrationMode !== "individual" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Field
                label="Minimum Team Size"
                type="number"
                name="minTeamSize"
                min="1"
                value={form.minTeamSize}
                onChange={handleChange}
              />

              <Field
                label="Maximum Team Size"
                type="number"
                name="maxTeamSize"
                min="1"
                value={form.maxTeamSize}
                onChange={handleChange}
              />

            </div>
          )}

        </FormSection>


        {/* ================= FORM ================= */}

        <FormSection
          icon={<Link2 size={18} />}
          title="Registration Form"
          description="Use an external Google Form or your built-in dynamic form."
        >

          <Field
            label="Google Form URL"
            type="url"
            name="googleFormUrl"
            value={form.googleFormUrl}
            onChange={handleChange}
            placeholder="https://docs.google.com/forms/..."
            icon={<Link2 size={16} />}
          />

          <div className="flex gap-3 p-4 rounded-xl bg-zinc-950 border border-white/[0.06]">

            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
              <Sparkles
                size={15}
                className="text-orange-500"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-zinc-300">
                Dynamic Form Builder
              </p>

              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Leave this field empty to use the built-in
                registration form builder.
              </p>
            </div>

          </div>

        </FormSection>


        {/* ================= EXTRA DETAILS ================= */}

        <FormSection
          icon={<ListChecks size={18} />}
          title="Extra Details"
          description="Add information participants should know."
        >

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Textarea
              label="Skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder={"React\nNode.js\nMongoDB"}
              rows={6}
            />

            <Textarea
              label="Perks / Benefits"
              name="perks"
              value={form.perks}
              onChange={handleChange}
              placeholder={"Certificates\nGoodies\nPrizes"}
              rows={6}
            />

            <Textarea
              label="Rules"
              name="rules"
              value={form.rules}
              onChange={handleChange}
              placeholder={"Be on time\nCarry your ID\nFollow event rules"}
              rows={6}
            />

          </div>

        </FormSection>


        {/* ================= COVER IMAGE ================= */}

        <FormSection
          icon={<ImagePlus size={18} />}
          title="Cover Image"
          description="Upload a visual that represents your event."
        >

          <label
            htmlFor="coverImage"
            className={`
              relative flex flex-col items-center justify-center
              min-h-[220px]
              rounded-2xl
              border border-dashed
              border-white/10
              bg-zinc-950/60
              hover:border-orange-500/40
              hover:bg-orange-500/[0.02]
              transition-all
              cursor-pointer
              overflow-hidden
            `}
          >

            {coverImage ? (
              <>
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="Event cover preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />

                <div className="relative z-10 text-center">

                  <div className="w-12 h-12 mx-auto rounded-xl bg-black/70 backdrop-blur flex items-center justify-center mb-3">
                    <ImagePlus
                      size={21}
                      className="text-orange-500"
                    />
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {coverImage.name}
                  </p>

                  <p className="text-xs text-zinc-400 mt-1">
                    Click to choose another image
                  </p>

                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeImage();
                  }}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-lg bg-black/70 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-red-400 transition"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center mb-4">
                  <ImagePlus
                    size={24}
                    className="text-orange-500"
                  />
                </div>

                <p className="text-sm font-semibold text-zinc-300">
                  Upload event cover
                </p>

                <p className="text-xs text-zinc-600 mt-2">
                  PNG, JPG or WEBP
                </p>

                <span className="mt-4 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-zinc-400">
                  Choose image
                </span>
              </>
            )}

            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

          </label>

        </FormSection>


        {/* ================= ACTIONS ================= */}

        <div className="sticky bottom-4 z-20">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-white/10 shadow-2xl">

            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-zinc-300">
                {eventId
                  ? "Ready to update this event?"
                  : "Ready to publish your event?"}
              </p>

              <p className="text-[11px] text-zinc-600 mt-1">
                Make sure all important details are correct.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">

              <button
                type="button"
                onClick={() => navigate("/admin/events")}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-white/10 text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.04] transition"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                className="
                  flex-1 sm:flex-none
                  inline-flex items-center justify-center gap-2
                  px-7 py-3
                  rounded-xl
                  bg-orange-500
                  text-black
                  text-sm
                  font-black
                  hover:bg-orange-400
                  hover:-translate-y-0.5
                  active:translate-y-0
                  transition-all
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <Save size={16} />

                {loading
                  ? "Saving..."
                  : eventId
                    ? "Update Event"
                    : "Create Event"}
              </button>

            </div>

          </div>

        </div>

      </form>
    </div>
  );
};

export default CreateEvent;


/* =========================================================
   FORM SECTION
========================================================= */

const FormSection = ({
  icon,
  title,
  description,
  children
}) => {
  return (
    <section
      className="
        relative
        rounded-2xl
        border border-white/[0.08]
        bg-zinc-900/50
        p-5 sm:p-7
        overflow-hidden
      "
    >

      {/* subtle glow */}

      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/[0.03] blur-3xl pointer-events-none" />

      <div className="relative">

        <div className="flex items-start gap-4 mb-7">

          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
            {icon}
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              {title}
            </h2>

            <p className="text-xs text-zinc-600 mt-1">
              {description}
            </p>
          </div>

        </div>

        <div className="space-y-6">
          {children}
        </div>

      </div>

    </section>
  );
};


/* =========================================================
   FIELD
========================================================= */

const Field = ({
  label,
  icon,
  ...props
}) => {
  return (
    <div>

      <label className="block text-xs font-semibold text-zinc-400 mb-2.5">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`
            w-full
            px-4
            ${icon ? "pl-11" : ""}
            py-3.5
            rounded-xl
            bg-black/40
            border border-white/[0.08]
            text-sm
            text-white
            placeholder:text-zinc-700
            outline-none
            transition-all
            focus:border-orange-500/50
            focus:ring-2
            focus:ring-orange-500/10
            hover:border-white/[0.14]
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
        />

      </div>

    </div>
  );
};


/* =========================================================
   TEXTAREA
========================================================= */

const Textarea = ({
  label,
  rows = 4,
  ...props
}) => {
  return (
    <div>

      <label className="block text-xs font-semibold text-zinc-400 mb-2.5">
        {label}
      </label>

      <textarea
        {...props}
        rows={rows}
        className="
          w-full
          px-4 py-3.5
          rounded-xl
          bg-black/40
          border border-white/[0.08]
          text-sm
          text-white
          placeholder:text-zinc-700
          outline-none
          resize-y
          transition-all
          focus:border-orange-500/50
          focus:ring-2
          focus:ring-orange-500/10
          hover:border-white/[0.14]
        "
      />

    </div>
  );
};


/* =========================================================
   DATE FIELD
========================================================= */

const DateField = ({
  label,
  ...props
}) => {
  return (
    <div>

      <label className="block text-xs font-semibold text-zinc-400 mb-2.5">
        {label}
      </label>

      <div className="relative">

        <CalendarDays
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
        />

        <input
          {...props}
          type="datetime-local"
          className="
            w-full
            pl-11 pr-4 py-3.5
            rounded-xl
            bg-black/40
            border border-white/[0.08]
            text-sm
            text-zinc-300
            outline-none
            transition-all
            focus:border-orange-500/50
            focus:ring-2
            focus:ring-orange-500/10
            hover:border-white/[0.14]
            [color-scheme:dark]
          "
        />

      </div>

    </div>
  );
};


/* =========================================================
   SELECT
========================================================= */

const Select = ({
  label,
  options,
  ...props
}) => {
  return (
    <div>

      <label className="block text-xs font-semibold text-zinc-400 mb-2.5">
        {label}
      </label>

      <select
        {...props}
        className="
          w-full
          px-4 py-3.5
          rounded-xl
          bg-black/40
          border border-white/[0.08]
          text-sm
          text-zinc-300
          outline-none
          transition-all
          focus:border-orange-500/50
          focus:ring-2
          focus:ring-orange-500/10
          hover:border-white/[0.14]
          cursor-pointer
          [color-scheme:dark]
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-zinc-900 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};