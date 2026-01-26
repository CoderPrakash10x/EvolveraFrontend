import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminMember } from "../../services/team.admin.service";
import { UploadCloud } from "lucide-react";

const CreateTeamMember = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    category: "Core Member",
    linkedin: "",
    instagram: "",
    github: ""
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("role", form.role);
      fd.append("category", form.category);
      fd.append("photo", photo);

      fd.append(
        "socialLinks",
        JSON.stringify({
          linkedin: form.linkedin,
          instagram: form.instagram,
          github: form.github
        })
      );

      await createAdminMember(fd);
      navigate("/admin/team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-black mb-12">
        Add <span className="text-orange-500">Team Member</span>
      </h1>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* LEFT SIDE */}
        <div className="space-y-6">

          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Role" name="role" value={form.role} onChange={handleChange} />

          <div>
            <label className="label">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input"
            >
              <option>Board Member</option>
              <option>Head</option>
              <option>Coordinator</option>
              <option>Core Member</option>
            </select>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              Social Links
            </h3>

            <Input label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={handleChange} />
            <Input label="Instagram URL" name="instagram" value={form.instagram} onChange={handleChange} />
            <Input label="GitHub URL" name="github" value={form.github} onChange={handleChange} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">

          <div className="border border-white/10 rounded-2xl p-6 bg-zinc-900">
            <label className="label mb-4 block">Profile Photo</label>

            <label className="cursor-pointer flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-xl hover:border-orange-500 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <UploadCloud className="text-orange-500 mb-2" size={32} />
                  <p className="text-sm text-gray-400">Click to upload photo</p>
                </>
              )}
              <input type="file" hidden onChange={handlePhoto} />
            </label>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-orange-500 text-black font-black rounded-xl disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamMember;

/* ---------- UI Helpers ---------- */
const Input = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input {...props} className="input" />
  </div>
);
