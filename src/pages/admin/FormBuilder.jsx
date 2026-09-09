import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFormSchema, saveFormSchema } from "../../services/form.service";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GitBranch,
  ArrowLeft,
  Save,
  GripVertical,
  Settings2,
  X,
  Check,
  Layers3,
} from "lucide-react";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "url", label: "URL" },
  { value: "date", label: "Date" },
  { value: "select", label: "Dropdown (Select)" },
  { value: "radio", label: "Radio (Single Choice)" },
  { value: "checkbox", label: "Checkbox (Multiple Choice)" },
];

const newField = (order) => ({
  _tempId: Math.random().toString(36).slice(2),
  label: "",
  name: "",
  type: "text",
  placeholder: "",
  options: [],
  required: false,
  order,
  showIf: {
    fieldName: null,
    value: null,
  },
});

const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

export default function FormBuilder() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getFormSchema(eventId)
      .then((data) => {
        setFields(
          data.fields.map((f) => ({
            ...f,
            _tempId: Math.random().toString(36).slice(2),
            showIf: f.showIf || {
              fieldName: null,
              value: null,
            },
          }))
        );
      })
      .catch(() => setFields([]))
      .finally(() => setLoading(false));
  }, [eventId]);

  const addField = () => {
    setFields((prev) => [...prev, newField(prev.length)]);
  };

  const removeField = (tempId) => {
    setFields((prev) =>
      prev
        .filter((f) => f._tempId !== tempId)
        .map((f, i) => ({
          ...f,
          order: i,
        }))
    );
  };

  const updateField = (tempId, key, value) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f._tempId !== tempId) return f;

        const updated = {
          ...f,
          [key]: value,
        };

        if (key === "label") {
          updated.name = toSlug(value);
        }

        return updated;
      })
    );
  };

  const updateShowIf = (tempId, key, value) => {
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId
          ? {
              ...f,
              showIf: {
                ...f.showIf,
                [key]: value || null,
                ...(key === "fieldName" && !value
                  ? { value: null }
                  : {}),
              },
            }
          : f
      )
    );
  };

  const moveField = (index, dir) => {
    const next = [...fields];
    const swap = index + dir;

    if (swap < 0 || swap >= next.length) return;

    [next[index], next[swap]] = [next[swap], next[index]];

    setFields(
      next.map((f, i) => ({
        ...f,
        order: i,
      }))
    );
  };

  const addOption = (tempId) => {
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId
          ? {
              ...f,
              options: [...f.options, ""],
            }
          : f
      )
    );
  };

  const updateOption = (tempId, idx, val) => {
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId
          ? {
              ...f,
              options: f.options.map((o, i) =>
                i === idx ? val : o
              ),
            }
          : f
      )
    );
  };

  const removeOption = (tempId, idx) => {
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId
          ? {
              ...f,
              options: f.options.filter((_, i) => i !== idx),
            }
          : f
      )
    );
  };

  const handleSave = async () => {
    for (const f of fields) {
      if (!f.label.trim()) {
        toast.error("All fields must have a label");
        return;
      }

      if (!f.name.trim()) {
        toast.error(`Field "${f.label}" has no key name`);
        return;
      }

      if (
        ["select", "radio", "checkbox"].includes(f.type) &&
        f.options.some((option) => !option.trim())
      ) {
        toast.error(`Please complete all options for "${f.label}"`);
        return;
      }
    }

    const names = fields.map((f) => f.name);

    if (new Set(names).size !== names.length) {
      toast.error("Two fields have the same key name");
      return;
    }

    setSaving(true);

    try {
      await saveFormSchema(eventId, fields);
      toast.success("Form saved successfully!");
    } catch {
      toast.error("Failed to save form");
    } finally {
      setSaving(false);
    }
  };

  const needsOptions = (type) =>
    ["select", "radio", "checkbox"].includes(type);

  const triggerFields = fields.filter(
    (f) =>
      ["radio", "select"].includes(f.type) &&
      f.options.length > 0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="animate-pulse space-y-5">
            <div className="h-10 w-72 bg-zinc-800 rounded-xl" />
            <div className="h-5 w-96 max-w-full bg-zinc-800 rounded-lg" />

            <div className="h-64 bg-zinc-900 border border-white/5 rounded-3xl" />
            <div className="h-64 bg-zinc-900 border border-white/5 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] right-[-150px] w-[450px] h-[450px] bg-orange-500/5 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-200px] left-[-150px] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        {/* ================= HEADER ================= */}
        <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div className="bg-[#09090b]/90 backdrop-blur-xl border-b border-white/5">
            <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              {/* Left */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="
                    group
                    h-11 w-11
                    flex items-center justify-center
                    rounded-xl
                    bg-zinc-900
                    border border-white/10
                    text-zinc-400
                    hover:text-white
                    hover:border-white/20
                    hover:bg-zinc-800
                    transition-all
                  "
                  title="Exit Builder"
                >
                  <ArrowLeft
                    size={19}
                    className="group-hover:-translate-x-0.5 transition-transform"
                  />
                </button>

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                      Form{" "}
                      <span className="text-orange-500">
                        Builder
                      </span>
                    </h1>

                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
                      <Settings2 size={11} />
                      Editor
                    </span>
                  </div>

                  <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                    Build your registration form with conditional logic
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="
                    px-4 py-2.5
                    rounded-xl
                    border border-white/10
                    bg-zinc-900
                    text-zinc-400
                    hover:text-white
                    hover:bg-zinc-800
                    transition-all
                    text-sm font-bold
                    flex items-center gap-2
                  "
                >
                  <X size={16} />
                  <span>Exit</span>
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    px-5 py-2.5
                    rounded-xl
                    bg-orange-500
                    text-black
                    hover:bg-orange-400
                    active:scale-[0.98]
                    transition-all
                    text-sm font-black
                    flex items-center gap-2
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Form
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS BAR ================= */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-zinc-900/70 border border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <Layers3 size={18} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold">
                  Fields
                </p>
                <p className="text-lg font-black text-white">
                  {fields.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-900/70 border border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                <Check size={18} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold">
                  Required
                </p>
                <p className="text-lg font-black text-white">
                  {fields.filter((f) => f.required).length}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block rounded-2xl bg-zinc-900/70 border border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <GitBranch size={18} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold">
                  Conditional
                </p>
                <p className="text-lg font-black text-white">
                  {
                    fields.filter(
                      (f) => f.showIf?.fieldName
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= INTRO ================= */}
        <div className="mt-8 mb-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Form Fields
              </h2>
              <p className="text-xs text-zinc-600 mt-1">
                Configure each field and arrange them in your preferred order.
              </p>
            </div>

            {fields.length > 0 && (
              <span className="text-xs text-zinc-600 font-mono">
                {fields.length}{" "}
                {fields.length === 1 ? "field" : "fields"}
              </span>
            )}
          </div>
        </div>

        {/* ================= FIELDS ================= */}
        <div className="space-y-5">
          {fields.map((field, index) => {
            const isConditional = !!field.showIf?.fieldName;

            const selectedTrigger = triggerFields.find(
              (tf) =>
                tf.name === field.showIf?.fieldName
            );

            return (
              <div
                key={field._tempId}
                className={`
                  group
                  rounded-3xl
                  bg-zinc-900/80
                  border
                  overflow-hidden
                  transition-all
                  duration-200
                  ${
                    isConditional
                      ? "border-orange-500/25 shadow-[0_0_40px_rgba(249,115,22,0.03)]"
                      : "border-white/7 hover:border-white/10"
                  }
                `}
              >
                {/* FIELD TOP BAR */}
                <div className="px-5 sm:px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/10">
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-700 cursor-grab">
                      <GripVertical size={17} />
                    </div>

                    <div className="h-8 min-w-8 px-2 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center">
                      <span className="text-xs font-black text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-zinc-400">
                        {field.label || "Untitled Field"}
                      </p>

                      <p className="text-[10px] text-zinc-600 font-mono mt-0.5">
                        {field.name || "field_key"}
                      </p>
                    </div>

                    {isConditional && (
                      <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold">
                        <GitBranch size={11} />
                        Conditional
                      </span>
                    )}
                  </div>

                  {/* FIELD ACTIONS */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        moveField(index, -1)
                      }
                      disabled={index === 0}
                      className="
                        h-8 w-8
                        rounded-lg
                        flex items-center justify-center
                        text-zinc-600
                        hover:text-white
                        hover:bg-zinc-800
                        disabled:opacity-20
                        disabled:hover:bg-transparent
                        transition
                      "
                      title="Move up"
                    >
                      <ChevronUp size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        moveField(index, 1)
                      }
                      disabled={index === fields.length - 1}
                      className="
                        h-8 w-8
                        rounded-lg
                        flex items-center justify-center
                        text-zinc-600
                        hover:text-white
                        hover:bg-zinc-800
                        disabled:opacity-20
                        disabled:hover:bg-transparent
                        transition
                      "
                      title="Move down"
                    >
                      <ChevronDown size={16} />
                    </button>

                    <div className="w-px h-5 bg-white/5 mx-1" />

                    <button
                      type="button"
                      onClick={() =>
                        removeField(field._tempId)
                      }
                      className="
                        h-8 w-8
                        rounded-lg
                        flex items-center justify-center
                        text-zinc-600
                        hover:text-red-400
                        hover:bg-red-500/10
                        transition
                      "
                      title="Delete field"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* FIELD BODY */}
                <div className="p-5 sm:p-6 space-y-6">
                  {/* LABEL + KEY */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Field Label
                        <span className="text-orange-500 ml-1">
                          *
                        </span>
                      </label>

                      <input
                        value={field.label}
                        onChange={(e) =>
                          updateField(
                            field._tempId,
                            "label",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Full Name"
                        className="
                          w-full
                          h-12
                          px-4
                          rounded-xl
                          bg-black/50
                          border border-white/8
                          text-sm text-white
                          placeholder:text-zinc-700
                          outline-none
                          focus:border-orange-500/50
                          focus:ring-2
                          focus:ring-orange-500/10
                          transition
                        "
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Key Name
                      </label>

                      <div className="relative">
                        <input
                          value={field.name}
                          onChange={(e) =>
                            updateField(
                              field._tempId,
                              "name",
                              toSlug(
                                e.target.value
                              )
                            )
                          }
                          placeholder="full_name"
                          className="
                            w-full
                            h-12
                            px-4
                            rounded-xl
                            bg-black/50
                            border border-white/8
                            text-sm
                            font-mono
                            text-orange-400
                            placeholder:text-zinc-700
                            outline-none
                            focus:border-orange-500/50
                            focus:ring-2
                            focus:ring-orange-500/10
                            transition
                          "
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-zinc-700 uppercase tracking-wider">
                          auto
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TYPE + PLACEHOLDER */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Field Type
                      </label>

                      <select
                        value={field.type}
                        onChange={(e) =>
                          updateField(
                            field._tempId,
                            "type",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          h-12
                          px-4
                          rounded-xl
                          bg-black/50
                          border border-white/8
                          text-sm text-white
                          outline-none
                          focus:border-orange-500/50
                          transition
                        "
                      >
                        {FIELD_TYPES.map((t) => (
                          <option
                            key={t.value}
                            value={t.value}
                            className="bg-zinc-900"
                          >
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Placeholder
                      </label>

                      <input
                        value={field.placeholder}
                        onChange={(e) =>
                          updateField(
                            field._tempId,
                            "placeholder",
                            e.target.value
                          )
                        }
                        placeholder="Enter your name"
                        className="
                          w-full
                          h-12
                          px-4
                          rounded-xl
                          bg-black/50
                          border border-white/8
                          text-sm text-white
                          placeholder:text-zinc-700
                          outline-none
                          focus:border-orange-500/50
                          focus:ring-2
                          focus:ring-orange-500/10
                          transition
                        "
                      />
                    </div>
                  </div>

                  {/* OPTIONS */}
                  {needsOptions(field.type) && (
                    <div className="rounded-2xl bg-black/20 border border-white/5 p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-bold text-white">
                            Options
                          </p>
                          <p className="text-[11px] text-zinc-600 mt-0.5">
                            Add choices users can select.
                          </p>
                        </div>

                        <span className="text-[10px] text-zinc-600 font-mono">
                          {field.options.length}{" "}
                          {field.options.length === 1
                            ? "option"
                            : "options"}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {field.options.map(
                          (opt, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2"
                            >
                              <div className="w-7 text-center text-[10px] font-mono text-zinc-700">
                                {String(i + 1).padStart(
                                  2,
                                  "0"
                                )}
                              </div>

                              <input
                                value={opt}
                                onChange={(e) =>
                                  updateOption(
                                    field._tempId,
                                    i,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${
                                  i + 1
                                }`}
                                className="
                                  flex-1
                                  h-11
                                  px-3.5
                                  rounded-xl
                                  bg-black/50
                                  border border-white/7
                                  text-sm text-white
                                  placeholder:text-zinc-700
                                  outline-none
                                  focus:border-orange-500/40
                                  transition
                                "
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeOption(
                                    field._tempId,
                                    i
                                  )
                                }
                                className="
                                  h-10
                                  w-10
                                  rounded-xl
                                  flex items-center justify-center
                                  text-zinc-600
                                  hover:text-red-400
                                  hover:bg-red-500/10
                                  transition
                                "
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            addOption(
                              field._tempId
                            )
                          }
                          className="
                            mt-2
                            h-10
                            px-4
                            rounded-xl
                            border border-dashed border-orange-500/20
                            text-orange-400
                            hover:text-orange-300
                            hover:bg-orange-500/5
                            hover:border-orange-500/40
                            transition
                            text-xs
                            font-bold
                            flex items-center gap-2
                          "
                        >
                          <Plus size={14} />
                          Add Option
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CONDITIONAL LOGIC */}
                  {triggerFields.length > 0 && (
                    <div
                      className={`
                        rounded-2xl
                        border
                        p-4 sm:p-5
                        ${
                          isConditional
                            ? "bg-orange-500/[0.04] border-orange-500/20"
                            : "bg-black/20 border-white/5"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3 mb-5">
                        <div
                          className={`
                            h-9 w-9
                            shrink-0
                            rounded-xl
                            flex items-center justify-center
                            ${
                              isConditional
                                ? "bg-orange-500/10 text-orange-400"
                                : "bg-zinc-800 text-zinc-500"
                            }
                          `}
                        >
                          <GitBranch size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-white">
                            Conditional Logic
                          </p>

                          <p className="text-[11px] text-zinc-600 mt-0.5">
                            Show this field only when a condition is met.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* TRIGGER FIELD */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-2">
                            When this field
                          </label>

                          <select
                            value={
                              field.showIf?.fieldName ||
                              ""
                            }
                            onChange={(e) =>
                              updateShowIf(
                                field._tempId,
                                "fieldName",
                                e.target.value
                              )
                            }
                            className="
                              w-full
                              h-11
                              px-3.5
                              rounded-xl
                              bg-black/50
                              border border-white/7
                              text-sm text-white
                              outline-none
                              focus:border-orange-500/40
                              transition
                            "
                          >
                            <option
                              value=""
                              className="bg-zinc-900"
                            >
                              Always show
                            </option>

                            {triggerFields
                              .filter(
                                (tf) =>
                                  tf._tempId !==
                                  field._tempId
                              )
                              .map((tf) => (
                                <option
                                  key={tf._tempId}
                                  value={tf.name}
                                  className="bg-zinc-900"
                                >
                                  {tf.label ||
                                    tf.name}
                                </option>
                              ))}
                          </select>
                        </div>

                        {/* TRIGGER VALUE */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-2">
                            Has value
                          </label>

                          <select
                            value={
                              field.showIf?.value ||
                              ""
                            }
                            onChange={(e) =>
                              updateShowIf(
                                field._tempId,
                                "value",
                                e.target.value
                              )
                            }
                            disabled={
                              !field.showIf?.fieldName
                            }
                            className="
                              w-full
                              h-11
                              px-3.5
                              rounded-xl
                              bg-black/50
                              border border-white/7
                              text-sm text-white
                              outline-none
                              focus:border-orange-500/40
                              transition
                              disabled:opacity-30
                              disabled:cursor-not-allowed
                            "
                          >
                            <option
                              value=""
                              className="bg-zinc-900"
                            >
                              Select value
                            </option>

                            {selectedTrigger?.options?.map(
                              (opt) => (
                                <option
                                  key={opt}
                                  value={opt}
                                  className="bg-zinc-900"
                                >
                                  {opt}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      {isConditional && (
                        <div className="mt-4 px-3 py-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10">
                          <p className="text-[11px] text-orange-400">
                            This field appears when{" "}
                            <span className="font-bold">
                              {selectedTrigger?.label ||
                                field.showIf.fieldName}
                            </span>{" "}
                            equals{" "}
                            <span className="font-bold">
                              {field.showIf.value ||
                                "selected value"}
                            </span>
                            .
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* REQUIRED */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          field._tempId,
                          "required",
                          !field.required
                        )
                      }
                      className="
                        w-full sm:w-auto
                        flex items-center justify-between sm:justify-start
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        bg-black/20
                        border border-white/5
                        hover:border-white/10
                        transition
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            relative
                            w-10
                            h-5
                            rounded-full
                            transition-colors
                            ${
                              field.required
                                ? "bg-orange-500"
                                : "bg-zinc-700"
                            }
                          `}
                        >
                          <span
                            className={`
                              absolute
                              top-0.5
                              left-0.5
                              w-4
                              h-4
                              rounded-full
                              bg-white
                              transition-transform
                              shadow-sm
                              ${
                                field.required
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }
                            `}
                          />
                        </div>

                        <div className="text-left">
                          <p className="text-xs font-bold text-zinc-300">
                            Required field
                          </p>
                          <p className="text-[10px] text-zinc-600">
                            Users must fill this field
                          </p>
                        </div>
                      </div>

                      {field.required && (
                        <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                          Enabled
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {fields.length === 0 && (
          <div className="mt-5 rounded-3xl border border-dashed border-white/10 bg-zinc-900/40 py-16 px-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center text-orange-400">
              <Layers3 size={27} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-white">
              Your form is empty
            </h3>

            <p className="mt-2 text-sm text-zinc-600 max-w-sm mx-auto">
              Start building your registration form by adding your first field.
            </p>

            <button
              type="button"
              onClick={addField}
              className="
                mt-6
                px-5
                py-3
                rounded-xl
                bg-orange-500
                text-black
                hover:bg-orange-400
                transition
                text-sm
                font-black
                inline-flex
                items-center
                gap-2
              "
            >
              <Plus size={16} />
              Add First Field
            </button>
          </div>
        )}

        {/* ================= ADD FIELD ================= */}
        {fields.length > 0 && (
          <button
            type="button"
            onClick={addField}
            className="
              mt-6
              w-full
              h-16
              rounded-2xl
              border
              border-dashed
              border-white/10
              bg-zinc-900/30
              text-zinc-500
              hover:text-orange-400
              hover:border-orange-500/30
              hover:bg-orange-500/[0.02]
              transition-all
              flex items-center justify-center gap-2
              text-sm
              font-bold
            "
          >
            <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center">
              <Plus size={16} />
            </div>
            Add New Field
          </button>
        )}

        {/* ================= HELP ================= */}
        {triggerFields.length > 0 && (
          <div className="mt-6 rounded-2xl border border-orange-500/10 bg-orange-500/[0.025] p-5">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <GitBranch size={15} />
              </div>

              <div>
                <p className="text-xs font-bold text-orange-400">
                  Conditional Logic
                </p>

                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Use conditional logic to display fields based on
                  a user's previous selection. For example, show
                  "Team Name" only when the user selects "Team"
                  registration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= BOTTOM ACTIONS ================= */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-zinc-500">
              Ready to save your form?
            </p>

            <p className="text-[11px] text-zinc-700 mt-1">
              Make sure all required fields are configured correctly.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                flex-1 sm:flex-none
                px-5
                py-3
                rounded-xl
                border border-white/10
                bg-zinc-900
                text-zinc-400
                hover:text-white
                hover:bg-zinc-800
                transition
                text-sm
                font-bold
                flex items-center justify-center gap-2
              "
            >
              <ArrowLeft size={16} />
              Exit
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="
                flex-1 sm:flex-none
                px-6
                py-3
                rounded-xl
                bg-orange-500
                text-black
                hover:bg-orange-400
                transition
                text-sm
                font-black
                flex items-center justify-center gap-2
                disabled:opacity-50
              "
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Form
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}