import { useEffect, useState } from "react";
import { getFormSchema, submitForm } from "../services/form.service";
import toast from "react-hot-toast";

export default function DynamicRegistrationForm({ eventId, onClose }) {
  const [schema, setSchema] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getFormSchema(eventId)
      .then((data) => {
        setSchema(data);
        const init = {};
        data.fields.forEach((f) => {
          if (f.type === "checkbox") init[f.name] = [];
        });
        setResponses(init);
      })
      .catch(() => setSchema(null))
      .finally(() => setLoading(false));
  }, [eventId]);

  const handleChange = (name, value) =>
    setResponses((prev) => ({ ...prev, [name]: value }));

  const handleCheckbox = (name, option, checked) =>
    setResponses((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] || []), option]
        : (prev[name] || []).filter((v) => v !== option)
    }));

  // Ye check karta hai ki field dikhana chahiye ya nahi
  const isVisible = (field) => {
    if (!field.showIf?.fieldName || !field.showIf?.value) return true;
    return responses[field.showIf.fieldName] === field.showIf.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sirf visible fields validate karo
    if (schema) {
      for (const field of schema.fields) {
        if (!isVisible(field)) continue;
        if (field.required && !responses[field.name]) {
          toast.error(`${field.label} is required`);
          return;
        }
      }
    }

    // Hidden fields ki values clean karo before submit
    const cleanedResponses = {};
    schema.fields.forEach((f) => {
      if (isVisible(f)) {
        cleanedResponses[f.name] = responses[f.name] ?? "";
      }
    });

    setSubmitting(true);
    try {
      await submitForm(eventId, cleanedResponses);
      setDone(true);
      toast.success("Registration successful! 🎉");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-gray-400 text-center py-8">Loading form...</p>;

  if (!schema) return (
    <p className="text-gray-500 text-center py-8">Registration form not configured yet.</p>
  );

  if (done) return (
    <div className="text-center py-10">
      <div className="text-5xl mb-4">🎉</div>
      <h3 className="text-2xl font-black text-orange-500">You're Registered!</h3>
      <p className="text-gray-400 mt-2 text-sm">Check your email for confirmation.</p>
      {onClose && (
        <button
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-white/10 rounded-xl font-bold text-sm hover:bg-white/20 transition"
        >
          Close
        </button>
      )}
    </div>
  );

  const visibleFields = schema.fields
    .sort((a, b) => a.order - b.order)
    .filter(isVisible);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {visibleFields.map((field) => (
        <div key={field.name} className="animate-fadeIn">
          <label className="block text-sm text-gray-300 mb-2 font-semibold">
            {field.label}
            {field.required && <span className="text-orange-500 ml-1">*</span>}
          </label>

          {/* TEXT / EMAIL / PHONE / NUMBER / URL / DATE */}
          {["text", "email", "phone", "number", "url", "date"].includes(field.type) && (
            <input
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={responses[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10
                         focus:border-orange-500/50 focus:outline-none focus:ring-2
                         focus:ring-orange-500/20 transition text-sm"
            />
          )}

          {/* TEXTAREA */}
          {field.type === "textarea" && (
            <textarea
              required={field.required}
              placeholder={field.placeholder}
              value={responses[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={4}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10
                         focus:border-orange-500/50 focus:outline-none focus:ring-2
                         focus:ring-orange-500/20 transition text-sm resize-none"
            />
          )}

          {/* SELECT */}
          {field.type === "select" && (
            <select
              required={field.required}
              value={responses[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10
                         focus:border-orange-500/50 focus:outline-none transition text-sm"
            >
              <option value="">Select an option</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {/* RADIO */}
          {field.type === "radio" && (
            <div className="space-y-2">
              {field.options.map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => handleChange(field.name, opt)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition cursor-pointer ${
                      responses[field.name] === opt
                        ? "border-orange-500 bg-orange-500"
                        : "border-white/20 group-hover:border-orange-500/50"
                    }`}
                  >
                    {responses[field.name] === opt && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          )}

          {/* CHECKBOX */}
          {field.type === "checkbox" && (
            <div className="space-y-2">
              {field.options.map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => {
                      const current = responses[field.name] || [];
                      const checked = current.includes(opt);
                      handleCheckbox(field.name, opt, !checked);
                    }}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition cursor-pointer ${
                      (responses[field.name] || []).includes(opt)
                        ? "border-orange-500 bg-orange-500"
                        : "border-white/20 group-hover:border-orange-500/50"
                    }`}
                  >
                    {(responses[field.name] || []).includes(opt) && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-orange-500 text-black font-black uppercase
                   rounded-2xl hover:bg-white transition disabled:opacity-50 mt-2"
      >
        {submitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}