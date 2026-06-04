import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFormSchema, saveFormSchema } from "../../services/form.service";
import toast from "react-hot-toast";
import { Plus, Trash2, ChevronDown, ChevronUp, GitBranch } from "lucide-react";

const FIELD_TYPES = [
  { value: "text",     label: "Text" },
  { value: "email",    label: "Email" },
  { value: "phone",    label: "Phone" },
  { value: "number",   label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "url",      label: "URL" },
  { value: "date",     label: "Date" },
  { value: "select",   label: "Dropdown (Select)" },
  { value: "radio",    label: "Radio (Single Choice)" },
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
  showIf: { fieldName: null, value: null }
});

const toSlug = (str) =>
  str.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

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
            showIf: f.showIf || { fieldName: null, value: null }
          }))
        );
      })
      .catch(() => setFields([]))
      .finally(() => setLoading(false));
  }, [eventId]);

  const addField = () => setFields((prev) => [...prev, newField(prev.length)]);

  const removeField = (tempId) =>
    setFields((prev) => prev.filter((f) => f._tempId !== tempId));

  const updateField = (tempId, key, value) =>
    setFields((prev) =>
      prev.map((f) => {
        if (f._tempId !== tempId) return f;
        const updated = { ...f, [key]: value };
        if (key === "label") updated.name = toSlug(value);
        return updated;
      })
    );

  const updateShowIf = (tempId, key, value) =>
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId
          ? { ...f, showIf: { ...f.showIf, [key]: value || null } }
          : f
      )
    );

  const moveField = (index, dir) => {
    const next = [...fields];
    const swap = index + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[index], next[swap]] = [next[swap], next[index]];
    setFields(next.map((f, i) => ({ ...f, order: i })));
  };

  const addOption = (tempId) =>
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId ? { ...f, options: [...f.options, ""] } : f
      )
    );

  const updateOption = (tempId, idx, val) =>
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId
          ? { ...f, options: f.options.map((o, i) => (i === idx ? val : o)) }
          : f
      )
    );

  const removeOption = (tempId, idx) =>
    setFields((prev) =>
      prev.map((f) =>
        f._tempId === tempId
          ? { ...f, options: f.options.filter((_, i) => i !== idx) }
          : f
      )
    );

  const handleSave = async () => {
    for (const f of fields) {
      if (!f.label.trim()) { toast.error("All fields must have a label"); return; }
      if (!f.name.trim()) { toast.error(`Field "${f.label}" has no key name`); return; }
    }
    const names = fields.map((f) => f.name);
    if (new Set(names).size !== names.length) {
      toast.error("Two fields have the same key name");
      return;
    }
    setSaving(true);
    try {
      await saveFormSchema(eventId, fields);
      toast.success("Form saved!");
    } catch {
      toast.error("Failed to save form");
    } finally {
      setSaving(false);
    }
  };

  const needsOptions = (type) => ["select", "radio", "checkbox"].includes(type);

  // Fields jo trigger ban sakte hain (radio/select wale)
  const triggerFields = fields.filter((f) =>
    ["radio", "select"].includes(f.type) && f.options.length > 0
  );

  if (loading) return <p className="text-gray-400 p-10">Loading...</p>;

  return (
    <div className="max-w-3xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black">
            Form <span className="text-orange-500">Builder</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Build your registration form with conditional logic
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-orange-500 text-black font-black rounded-xl hover:scale-105 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Form"}
        </button>
      </div>

      {/* FIELDS */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field._tempId}
            className={`bg-zinc-900 border rounded-2xl p-6 space-y-4 ${
              field.showIf?.fieldName
                ? "border-orange-500/30"
                : "border-white/10"
            }`}
          >
            {/* FIELD HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">
                  Field {index + 1}
                </span>
                {field.showIf?.fieldName && (
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <GitBranch size={10} /> conditional
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveField(index, -1)} className="p-1 text-gray-500 hover:text-white">
                  <ChevronUp size={16} />
                </button>
                <button onClick={() => moveField(index, 1)} className="p-1 text-gray-500 hover:text-white">
                  <ChevronDown size={16} />
                </button>
                <button onClick={() => removeField(field._tempId)} className="p-1 text-red-400 hover:text-red-300">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* LABEL + KEY */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Label *</label>
                <input
                  value={field.label}
                  onChange={(e) => updateField(field._tempId, "label", e.target.value)}
                  placeholder="e.g. Full Name"
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Key (auto)</label>
                <input
                  value={field.name}
                  onChange={(e) => updateField(field._tempId, "name", toSlug(e.target.value))}
                  placeholder="e.g. full_name"
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-sm font-mono text-orange-400"
                />
              </div>
            </div>

            {/* TYPE + PLACEHOLDER */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Type *</label>
                <select
                  value={field.type}
                  onChange={(e) => updateField(field._tempId, "type", e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-sm"
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Placeholder</label>
                <input
                  value={field.placeholder}
                  onChange={(e) => updateField(field._tempId, "placeholder", e.target.value)}
                  placeholder="e.g. Enter your name"
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-sm"
                />
              </div>
            </div>

            {/* OPTIONS */}
            {needsOptions(field.type) && (
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Options</label>
                <div className="space-y-2">
                  {field.options.map((opt, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={opt}
                        onChange={(e) => updateOption(field._tempId, i, e.target.value)}
                        placeholder={`Option ${i + 1}`}
                        className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-sm"
                      />
                      <button
                        onClick={() => removeOption(field._tempId, i)}
                        className="text-red-400 px-3"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(field._tempId)}
                    className="text-xs text-orange-400 hover:text-orange-300 font-bold"
                  >
                    + Add Option
                  </button>
                </div>
              </div>
            )}

            {/* CONDITIONAL LOGIC */}
            {triggerFields.length > 0 && (
              <div className="border-t border-white/5 pt-4">
                <label className="text-xs text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                  <GitBranch size={12} /> Show this field only if...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* WHICH FIELD */}
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Field</label>
                    <select
                      value={field.showIf?.fieldName || ""}
                      onChange={(e) => updateShowIf(field._tempId, "fieldName", e.target.value)}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-sm"
                    >
                      <option value="">Always show</option>
                      {triggerFields
                        .filter((tf) => tf._tempId !== field._tempId)
                        .map((tf) => (
                          <option key={tf._tempId} value={tf.name}>
                            {tf.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* WHICH VALUE */}
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Value</label>
                    <select
                      value={field.showIf?.value || ""}
                      onChange={(e) => updateShowIf(field._tempId, "value", e.target.value)}
                      disabled={!field.showIf?.fieldName}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-sm disabled:opacity-40"
                    >
                      <option value="">Select value</option>
                      {triggerFields
                        .find((tf) => tf.name === field.showIf?.fieldName)
                        ?.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* REQUIRED TOGGLE */}
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <div
                onClick={() => updateField(field._tempId, "required", !field.required)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  field.required ? "bg-orange-500" : "bg-zinc-700"
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  field.required ? "translate-x-5" : ""
                }`} />
              </div>
              <span className="text-sm text-gray-400">Required</span>
            </label>
          </div>
        ))}
      </div>

      {/* ADD FIELD */}
      <button
        onClick={addField}
        className="mt-6 w-full py-4 border-2 border-dashed border-white/10
                   text-gray-400 hover:text-white hover:border-orange-500/50
                   rounded-2xl flex items-center justify-center gap-2 transition font-bold"
      >
        <Plus size={18} /> Add Field
      </button>

      {fields.length === 0 && (
        <p className="text-center text-gray-600 text-sm mt-4">
          No fields yet — click "Add Field" to start.
        </p>
      )}

      {/* HELP */}
      {triggerFields.length > 0 && (
        <div className="mt-6 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
          <p className="text-xs text-orange-400 font-bold mb-1">💡 Conditional Logic</p>
          <p className="text-xs text-gray-500">
            Fields marked with <span className="text-orange-400">conditional</span> will only appear when the specified condition is met.
            Set conditions in each field's "Show this field only if..." section.
          </p>
        </div>
      )}
    </div>
  );
}