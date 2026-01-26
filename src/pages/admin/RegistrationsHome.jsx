import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getEventRegistrationCounts } from "../../services/event.admin.service";

const RegistrationsHome = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEventRegistrationCounts()
      .then(setEvents)
      .catch(() => toast.error("Failed to load registration stats"));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-black mb-10">
        Event <span className="text-orange-500">Registrations</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((e) => (
          <div
            key={e.eventId}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition"
          >
            <h3 className="text-xl font-bold mb-3">{e.title}</h3>

            <p className="text-sm text-gray-400 mb-6">
              Total Registrations:{" "}
              <span className="text-orange-500 font-black">
                {e.registrations}
              </span>
            </p>

            <button
              onClick={() =>
                navigate(`/admin/registrations/${e.eventId}`)
              }
              className="px-6 py-3 bg-orange-500 text-black font-black rounded-xl hover:scale-105 transition"
            >
              View Registrations →
            </button>
          </div>
        ))}

        {events.length === 0 && (
          <p className="text-gray-500">No registrations yet</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationsHome;
