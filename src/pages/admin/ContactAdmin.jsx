import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../utils/api";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get("/contact");
      setMessages(data);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await API.delete(`/contact/${id}`);
      toast.success("Message deleted");
      setMessages(messages.filter((m) => m._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <p className="text-white p-10">Loading messages...</p>;
  }

  return (
    <section className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-black mb-8">
        Contact <span className="text-orange-500">Messages</span>
      </h1>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-zinc-900 border border-white/10 rounded-xl p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{msg.name}</h3>
                  <p className="text-sm text-white/60">{msg.email}</p>
                  <p className="mt-4">{msg.message}</p>
                  <p className="text-xs text-white/40 mt-3">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-500 font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
