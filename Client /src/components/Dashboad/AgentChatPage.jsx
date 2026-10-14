import React, { useState, useEffect, useRef } from "react";
import {
  FaComments,
  FaSearch,
  FaPaperPlane,
  FaUser,
  FaCircle,
  FaCheckDouble,
  FaPhoneAlt,
  FaEnvelope,
  FaSpinner,
  FaReply,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";
import API_URL from "../../Services/Api";

function AgentChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const agentName = currentUser?.name || currentUser?.fullName || "Sarah Williams";

  // Fetch list of conversations
  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_URL}/chat/conversations`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setConversations(data.data);
          setActiveSessionId((current) => {
            if (current && data.data.some((c) => c.sessionId === current)) {
              return current;
            }
            return data.data.length > 0 ? data.data[0].sessionId : null;
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for active conversation
  const fetchMessages = async (sessionId) => {
    if (!sessionId) return;
    try {
      const res = await fetch(`${API_URL}/chat/messages/${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setMessages(data.data);
        }
      }
    } catch (err) {
      console.error("Failed to fetch messages for session:", err);
    }
  };

  // Mark conversation as read by agent
  const markRead = async (sessionId) => {
    if (!sessionId) return;
    try {
      await fetch(`${API_URL}/chat/read/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reader: "agent" }),
      });
      setConversations((prev) =>
        prev.map((c) => (c.sessionId === sessionId ? { ...c, unreadByAgent: 0 } : c))
      );
    } catch (err) {
      console.error("Failed to mark conversation read:", err);
    }
  };

  // Fast live polling: 1000ms for conversations and messages
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeSessionId) {
      fetchMessages(activeSessionId);
      markRead(activeSessionId);
      const msgInterval = setInterval(() => fetchMessages(activeSessionId), 1000);
      return () => clearInterval(msgInterval);
    }
  }, [activeSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectSession = (sessionId) => {
    setActiveSessionId(sessionId);
    markRead(sessionId);
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || !activeSessionId || sending) return;

    const tempMsg = {
      _id: `temp_${Date.now()}`,
      sessionId: activeSessionId,
      sender: "agent",
      senderName: agentName,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, tempMsg]);
    setInputText("");
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: activeSessionId,
          sender: "agent",
          senderName: agentName,
          text,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setMessages((prev) =>
            prev.map((m) => (m._id === tempMsg._id ? data.data : m))
          );
        }
        fetchConversations();
      }
    } catch (err) {
      console.error("Failed to send agent reply:", err);
    } finally {
      setSending(false);
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (c.userName || "").toLowerCase().includes(q) ||
      (c.userEmail || "").toLowerCase().includes(q) ||
      (c.lastMessage || "").toLowerCase().includes(q)
    );
  });

  const activeConversation =
    conversations.find((c) => c.sessionId === activeSessionId) ||
    (conversations.length > 0 ? conversations[0] : null);

  const cannedReplies = [
    "Hello! How may I assist with your luxury property acquisition today?",
    "Could you share your preferred investment budget and timeline?",
    "I can schedule a private off-market viewing for you this week.",
    "Let me forward you our verified portfolio investment prospectus.",
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaComments className="text-[#d4af37]" /> Advisor Live Chat
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Real-time direct messaging with visitors and clients from the "Speak With An Advisor" portal.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <FaCircle size={7} className="animate-pulse" /> Live Server Sync (1s)
        </div>
      </div>

      {/* CHAT CONSOLE CONTAINER */}
      <div className="w-full h-[calc(100vh-170px)] min-h-[580px] rounded-2xl bg-[#0e0e0e] border border-white/10 overflow-hidden flex flex-row shadow-2xl">
        
        {/* ==========================================
            LEFT SIDEBAR: Active Sessions List
        ========================================== */}
        <div className="w-72 lg:w-80 shrink-0 border-r border-white/10 flex flex-col bg-[#111111]">
          
          {/* Search Bar */}
          <div className="p-3.5 border-b border-white/10">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white">
              <FaSearch className="text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-500 text-xs"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin text-[#d4af37]" /> Loading chats...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-xs">
                No active conversations yet. User messages from the "Speak With An Advisor" page will appear here automatically.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = conv.sessionId === (activeConversation?.sessionId || activeSessionId);
                const unread = conv.unreadByAgent > 0;
                return (
                  <div
                    key={conv.sessionId}
                    onClick={() => handleSelectSession(conv.sessionId)}
                    className={`p-3.5 transition cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? "bg-[#d4af37]/15 border-l-4 border-l-[#d4af37]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                        alt={conv.userName}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/40x40/1a1a1a/444?text=U";
                        }}
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#111111]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {conv.userName || "Private Investor"}
                        </h4>
                        <span className="text-[10px] text-gray-500 shrink-0">
                          {new Date(conv.lastMessageAt || Date.now()).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 truncate">
                        {conv.lastMessage || "Started consultation session"}
                      </p>

                      {unread && (
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d4af37] text-black">
                            {conv.unreadByAgent} new message{conv.unreadByAgent > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ==========================================
            RIGHT MAIN PANEL: Live Chat Conversation
        ========================================== */}
        <div className="flex-1 min-w-0 flex flex-col bg-[#0a0a0a]">
          {activeConversation ? (
            <>
              {/* Active Conversation Top Bar */}
              <div className="p-3.5 px-6 border-b border-white/10 flex items-center justify-between bg-[#111111] shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={activeConversation.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                      alt={activeConversation.userName}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/40x40/1a1a1a/444?text=U";
                      }}
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#111111]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight truncate">
                      {activeConversation.userName || "Private Investor"}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      Session: <span className="font-mono text-gray-500">{activeConversation.sessionId}</span>
                      {activeConversation.userEmail && ` • ${activeConversation.userEmail}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {activeConversation.userPhone && (
                    <a
                      href={`tel:${activeConversation.userPhone}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <FaPhoneAlt size={11} /> Call Client
                    </a>
                  )}
                  <span className="text-xs px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] font-semibold">
                    Advisor: {agentName}
                  </span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                    No messages in this session yet.
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isAgent = msg.sender === "agent" || msg.sender === "advisor";
                    return (
                      <div
                        key={msg._id || msg.id || index}
                        className={`flex w-full ${isAgent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[78%] rounded-2xl px-4 py-3 shadow-md ${
                            isAgent
                              ? "bg-gradient-to-r from-[#d4af37] to-[#b88c1c] text-black font-medium rounded-br-none"
                              : "bg-[#181a20] border border-white/10 text-white rounded-bl-none"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <span className={`text-[11px] font-bold ${isAgent ? "text-black/80" : "text-[#d4af37]"}`}>
                              {isAgent ? `You (${msg.senderName || agentName})` : msg.senderName || activeConversation.userName || "User"}
                            </span>
                            <span className={`text-[10px] ${isAgent ? "text-black/60" : "text-gray-500"}`}>
                              {msg.time}
                            </span>
                          </div>

                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Canned Quick Replies */}
              <div className="px-4 sm:px-6 py-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto bg-[#0d0d0d] shrink-0">
                <span className="text-[11px] text-gray-500 shrink-0 font-medium">Quick Replies:</span>
                {cannedReplies.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(r)}
                    className="text-xs px-3 py-1 rounded-full bg-[#181818] hover:bg-[#d4af37] hover:text-black text-gray-300 border border-white/10 whitespace-nowrap transition cursor-pointer"
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Input Area with Guaranteed Visible Send Button */}
              <div className="p-3 sm:p-4 px-4 sm:px-6 border-t border-white/10 bg-[#111111] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-3 w-full"
                >
                  <input
                    type="text"
                    placeholder={`Reply to ${activeConversation.userName || "client"} as ${agentName}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={sending}
                    className="flex-1 min-w-0 rounded-xl bg-black/60 border border-white/15 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || sending}
                    className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e6c35c] hover:from-[#c29e28] hover:to-[#d4af37] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-[#d4af37]/25 active:scale-95"
                    title="Send Reply"
                  >
                    {sending ? (
                      <FaSpinner className="animate-spin text-black" size={14} />
                    ) : (
                      <>
                        <FaPaperPlane size={13} className="text-black" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
              <FaComments size={48} className="text-[#d4af37]/40 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Active Chat Selected</h3>
              <p className="text-sm max-w-sm">
                Select a conversation from the left sidebar to start live chatting with visitors and investors.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default AgentChatPage;
