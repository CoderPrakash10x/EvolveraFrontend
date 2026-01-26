import { useEffect, useState } from "react";
import API from "../../utils/api";
import { Trash2 } from "lucide-react";

export default function ContactAdmin() {
  const [messages, setMessages] = useState([]);

  const load = async () => {
    const res = await API.get("/contact");
    setMessages(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await API.delete(`/contact/${id}`);
    load();
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-10">Contact Messages</h2>

      <div className="space-y-6">
        {messages.map((m) => (
          <div
            key={m._id}
            className="bg-zinc-900 border border-white/10 rounded-xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-black">{m.name}</h4>
                <p className="text-sm text-orange-500">{m.email}</p>
                <p className="text-gray-400 mt-4">{m.message}</p>
              </div>

              <button
                onClick={() => remove(m._id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
