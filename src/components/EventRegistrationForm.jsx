import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { registerForEvent } from "../services/registration.service";

export default function EventRegistrationForm({ event, onClose }) {
  const [loading, setLoading] = useState(false);

  // 🔥 default based on event setting
  const [registrationType, setRegistrationType] = useState("individual");

  const [leader, setLeader] = useState({
    name: "",
    email: "",
    phone: "",
    college: ""
  });

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);

  /* ================= AUTO MODE LOCK ================= */
  useEffect(() => {
    if (event.registrationMode === "team") {
      setRegistrationType("team");
    }
    if (event.registrationMode === "individual") {
      setRegistrationType("individual");
    }
  }, [event.registrationMode]);

  /* ================= HANDLERS ================= */
  const handleLeaderChange = (e) => {
    setLeader({ ...leader, [e.target.name]: e.target.value });
  };

  const addMember = () => {
    if (
      event.maxTeamSize &&
      members.length + 1 >= event.maxTeamSize
    ) {
      toast.error(`Max team size is ${event.maxTeamSize}`);
      return;
    }
    setMembers([...members, { name: "", email: "", phone: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // BASIC VALIDATION
    if (!leader.name || !leader.email) {
      toast.error("Leader name & email are required");
      return;
    }

    if (registrationType === "team") {
      if (!teamName.trim()) {
        toast.error("Team name is required");
        return;
      }

      const totalMembers = members.length + 1;

      if (
        event.minTeamSize &&
        totalMembers < event.minTeamSize
      ) {
        toast.error(`Minimum team size is ${event.minTeamSize}`);
        return;
      }

      if (
        event.maxTeamSize &&
        totalMembers > event.maxTeamSize
      ) {
        toast.error(`Maximum team size is ${event.maxTeamSize}`);
        return;
      }

      for (const m of members) {
        if (!m.name || !m.email) {
          toast.error("All team members must have name & email");
          return;
        }
      }
    }

    setLoading(true);

    try {
      await registerForEvent({
        event: event._id,
        registrationType,
        teamName: registrationType === "team" ? teamName : undefined,
        teamLeader: {
          name: leader.name,
          email: leader.email,
          phone: leader.phone,
          college: leader.college || "N/A"
        },
        members: registrationType === "team" ? members : []
      });

      toast.success("Registration successful 🎉");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* REGISTRATION TYPE SWITCH */}
      {event.registrationMode === "both" && (
        <div className="flex gap-4 text-sm font-bold">
          <button
            type="button"
            onClick={() => setRegistrationType("individual")}
            className={`px-4 py-2 rounded-xl ${
              registrationType === "individual"
                ? "bg-orange-500 text-black"
                : "bg-zinc-800 text-gray-400"
            }`}
          >
            Individual
          </button>

          <button
            type="button"
            onClick={() => setRegistrationType("team")}
            className={`px-4 py-2 rounded-xl ${
              registrationType === "team"
                ? "bg-orange-500 text-black"
                : "bg-zinc-800 text-gray-400"
            }`}
          >
            Team
          </button>
        </div>
      )}

      {/* TEAM NAME */}
      {registrationType === "team" && (
        <input
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          className="input"
        />
      )}

      {/* LEADER */}
      <input name="name" placeholder="Leader Name" required onChange={handleLeaderChange} className="input" />
      <input name="email" type="email" placeholder="Leader Email" required onChange={handleLeaderChange} className="input" />
      <input name="phone" placeholder="Phone" onChange={handleLeaderChange} className="input" />
      <input name="college" placeholder="College" onChange={handleLeaderChange} className="input" />

      {/* TEAM MEMBERS */}
      {registrationType === "team" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400 font-bold">
            Team Members ({members.length + 1} total)
          </p>

          {members.map((m, i) => (
            <div key={i} className="grid gap-2 bg-zinc-900 p-3 rounded-xl">
              <input placeholder="Name" onChange={(e) => handleMemberChange(i, "name", e.target.value)} className="input" />
              <input placeholder="Email" onChange={(e) => handleMemberChange(i, "email", e.target.value)} className="input" />
              <input placeholder="Phone" onChange={(e) => handleMemberChange(i, "phone", e.target.value)} className="input" />
              <button type="button" onClick={() => removeMember(i)} className="text-red-400 text-xs text-right">
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={addMember} className="text-orange-500 text-sm font-bold">
            + Add Member
          </button>
        </div>
      )}

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="w-full bg-orange-500 text-black py-3 rounded-xl font-black disabled:opacity-50"
      >
        {loading ? "Registering..." : "Confirm Registration"}
      </button>
    </form>
  );
}

/* ================= SMALL HELPER ================= */
const inputClass =
  "w-full p-3 rounded-xl bg-zinc-900 border border-white/10";
