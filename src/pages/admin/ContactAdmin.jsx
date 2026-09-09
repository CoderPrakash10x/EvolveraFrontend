import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../utils/api";
import {
  Mail,
  Trash2,
  User,
  CalendarDays,
  MessageSquare,
  Inbox,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMessages = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);

      const { data } = await API.get("/contact");
      setMessages(data);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;

    try {
      setDeletingId(id);

      await API.delete(`/contact/${id}`);

      toast.success("Message deleted");

      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen text-white">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-3">
            <div className="h-10 w-64 bg-zinc-900 rounded-xl animate-pulse" />
            <div className="h-4 w-80 bg-zinc-900 rounded animate-pulse" />
          </div>

          <div className="h-11 w-28 bg-zinc-900 rounded-xl animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-zinc-900 border border-white/5 animate-pulse"
            />
          ))}
        </div>

        {/* Message Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-zinc-900 border border-white/5 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen text-white pb-12">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <MessageSquare
                size={21}
                className="text-orange-400"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Contact{" "}
                <span className="text-orange-500">Messages</span>
              </h1>

              <p className="text-sm text-zinc-500 mt-1">
                Manage messages received from your website visitors
              </p>
            </div>
          </div>
        </div>

        {/* Refresh */}
        <button
          onClick={() => fetchMessages(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                     bg-zinc-900 border border-white/10 text-sm font-bold text-zinc-300
                     hover:text-white hover:border-orange-500/30 hover:bg-zinc-800
                     transition-all disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Total */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-orange-500/10 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Total Messages
              </p>

              <p className="text-3xl font-black mt-2">
                {messages.length}
              </p>
            </div>

            <div className="h-11 w-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Inbox size={20} className="text-orange-400" />
            </div>
          </div>
        </div>

        {/* Latest */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Latest Message
              </p>

              <p className="text-lg font-black mt-2">
                {messages.length > 0
                  ? formatDate(messages[0].createdAt).split(",")[0]
                  : "—"}
              </p>
            </div>

            <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <CalendarDays size={19} className="text-blue-400" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Inbox Status
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />

                <span className="text-sm font-bold text-emerald-400">
                  Active
                </span>
              </div>
            </div>

            <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Mail size={19} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}
      {messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 py-24 px-6 text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-5">
            <Inbox size={30} className="text-zinc-600" />
          </div>

          <h3 className="text-xl font-black text-zinc-300">
            No messages yet
          </h3>

          <p className="text-sm text-zinc-600 mt-2 max-w-sm mx-auto">
            Messages submitted through your contact form will appear here.
          </p>
        </div>
      ) : (
        /* =====================================================
            MESSAGE LIST
        ===================================================== */
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <article
              key={msg._id}
              className="group relative overflow-hidden rounded-2xl border border-white/10
                         bg-zinc-900/70 hover:bg-zinc-900
                         hover:border-orange-500/20
                         transition-all duration-300"
            >
              {/* Orange Accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5
                           bg-orange-500 opacity-0
                           group-hover:opacity-100 transition-opacity"
              />

              <div className="p-5 md:p-6">
                {/* Top */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                  {/* User */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <User
                        size={20}
                        className="text-orange-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base md:text-lg font-black text-white">
                          {msg.name}
                        </h3>

                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-500">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <a
                        href={`mailto:${msg.email}`}
                        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-orange-400 transition-colors mt-1"
                      >
                        <Mail size={13} />
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  {/* Date + Delete */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-600 bg-black/20 px-3 py-2 rounded-lg">
                      <CalendarDays size={13} />
                      {formatDate(msg.createdAt)}
                    </div>

                    <button
                      onClick={() => deleteMessage(msg._id)}
                      disabled={deletingId === msg._id}
                      title="Delete message"
                      className="h-9 w-9 rounded-lg flex items-center justify-center
                                 bg-red-500/5 border border-red-500/10
                                 text-red-400
                                 hover:bg-red-500/10
                                 hover:border-red-500/20
                                 transition-all
                                 disabled:opacity-40"
                    >
                      {deletingId === msg._id ? (
                        <span className="h-4 w-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Mobile Date */}
                <div className="flex sm:hidden items-center gap-1.5 text-[11px] text-zinc-600 mt-4">
                  <CalendarDays size={12} />
                  {formatDate(msg.createdAt)}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 my-5" />

                {/* Message */}
                <div className="relative pl-4 border-l-2 border-orange-500/20">
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-600 mb-2">
                    Message
                  </p>

                  <p className="text-sm md:text-[15px] leading-7 text-zinc-300 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-600">
                    <MessageSquare size={13} />
                    Contact enquiry
                  </span>

                  <a
                    href={`mailto:${msg.email}?subject=Re: Your enquiry`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg
                               bg-orange-500/10 border border-orange-500/10
                               text-orange-400 text-xs font-bold
                               hover:bg-orange-500/20
                               hover:border-orange-500/20
                               transition-all"
                  >
                    Reply
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}