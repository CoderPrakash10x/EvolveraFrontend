export const EVENT_BADGE = {
  /* ================= EVENT STATUS ================= */

  upcoming: {
    text: "Upcoming",
    class: "bg-orange-500 text-black"
  },
  open: {
    text: "Registeration Open",
    class: "bg-green-500/10 text-green-400 border border-green-500/30"
  },

  live: {
    text: "Live",
    class:
      "bg-red-500 text-white flex items-center gap-2 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"
  },

  past: {
    text: "Past",
    class: "bg-zinc-700/50 text-gray-300"
  },

  /* ================= REGISTRATION STATUS ================= */

  comingSoon: {
    text: "Coming Soon",
    class: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
  },

  registrationClosed: {
    text: "Registration Closed",
    class: "bg-red-500/10 text-red-400 border border-red-500/30"
  },

  /* ================= REGISTRATION MODE ================= */
  individual: {
    text: "Individual",
    class: "bg-blue-500/10 text-blue-400 border border-blue-500/30"
  },

  team: {
    text: "Team Event",
    class: "bg-purple-500/10 text-purple-400 border border-purple-500/30"
  },

  both: {
    text: "Individual + Team",
    class: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
  }
};