import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Paperclip, Smile, Send, Loader2 } from "lucide-react";
import PofileImg from "../assets/Sara.jpg";
import API_URL from "../Services/Api";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Retrieve or create persistent session ID for this user/visitor
  const getSessionId = () => {
    let sid = localStorage.getItem("luxe_advisor_chat_session");
    if (!sid) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (storedUser && (storedUser._id || storedUser.id)) {
          sid = `user_${storedUser._id || storedUser.id}`;
        } else {
          sid = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        }
      } catch {
        sid = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      }
      localStorage.setItem("luxe_advisor_chat_session", sid);
    }
    return sid;
  };

  const sessionId = getSessionId();

  // Get current logged-in user profile if available
  const getUserProfile = () => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      return {
        name: u?.name || "Private Investor",
        email: u?.email || "",
        phone: u?.phone || "",
      };
    } catch {
      return { name: "Private Investor", email: "", phone: "" };
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch conversation messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/chat/messages/${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setMessages(data.data);
        }
      }
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and real-time polling every 1.0s
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || sending) return;

    const userProfile = getUserProfile();

    const tempMsg = {
      _id: `temp_${Date.now()}`,
      sessionId,
      sender: "user",
      senderName: userProfile.name,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, tempMsg]);
    setInputText("");
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          sender: "user",
          senderName: userProfile.name,
          text,
          userName: userProfile.name,
          userEmail: userProfile.email,
          userPhone: userProfile.phone,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setMessages((prev) =>
            prev.map((m) => (m._id === tempMsg._id ? data.data : m))
          );
        }
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    "Residential Investment",
    "Commercial Investment",
    "ROI Projects & Expectations",
    "Request Private Viewing",
  ];

  return (
    <div className="flex h-[620px] w-full max-w-[850px] flex-col rounded-xl sm:rounded-[22px] bg-[#050505] text-white mx-auto shadow-2xl border border-white/10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#332713] px-4 sm:px-6 md:px-8 py-3.5 sm:py-5 shrink-0 bg-[#0a0a0a]">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <img
              src={PofileImg}
              alt="Sarah Williams"
              className="h-10 w-10 sm:h-[48px] sm:w-[48px] rounded-full border border-[#c98508] object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10b981] border-2 border-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-[19px] font-semibold leading-tight">Sarah Williams</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#c98508]/20 text-[#d4af37] border border-[#c98508]/40">
                Advisor Desk
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-medium text-[#10b981] flex items-center gap-1.5 mt-0.5">
              <span>●</span> Connected Live to Agent Portal
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-400">Response Speed</p>
          <p className="text-xs font-semibold text-[#d4af37]">Under 2 Minutes</p>
        </div>
      </div>

      {/* CHAT MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 md:py-6 space-y-4">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm gap-2">
            <Loader2 className="animate-spin text-[#d4af37]" size={20} />
            <span>Connecting to advisor desk...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Say hello to begin your private consultation session.
          </div>
        ) : (
          messages.map((msg, index) => {
            const isAdvisor = msg.sender === "advisor" || msg.sender === "agent";
            return (
              <div
                key={msg._id || msg.id || index}
                className={`flex w-full ${isAdvisor ? "justify-start" : "justify-end"}`}
              >
                <div className="flex max-w-[90%] sm:max-w-[85%] md:max-w-[75%] gap-2 sm:gap-3 items-end">
                  
                  {/* Avatar for Advisor Messages */}
                  {isAdvisor && (
                    <img
                      src={PofileImg}
                      alt={msg.senderName || "Sarah Williams"}
                      className="hidden sm:block h-[34px] w-[34px] shrink-0 rounded-full border border-[#c98508] object-cover mb-1"
                    />
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative rounded-[18px] px-4 py-3 sm:px-5 sm:py-3.5 shadow-md ${
                      isAdvisor
                        ? "rounded-bl-none bg-[#1e2026] border border-white/10 text-white"
                        : "rounded-br-none bg-gradient-to-r from-[#d4af37] to-[#b88c1c] text-black font-medium"
                    }`}
                  >
                    {isAdvisor && (
                      <p className="text-[11px] font-semibold text-[#d4af37] mb-1">
                        {msg.senderName || "Sarah Williams (Advisor)"}
                      </p>
                    )}
                    <p className="text-sm sm:text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                      {msg.text}
                    </p>
                    <p
                      className={`mt-1 text-[10px] font-medium ${
                        isAdvisor ? "text-gray-400" : "text-black/70 text-right"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* QUICK REPLIES */}
      <div className="flex flex-wrap gap-2 px-4 sm:px-6 md:px-8 pb-3 shrink-0">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => handleSend(reply)}
            className="rounded-full border border-[#a86d00]/60 bg-[#121212] px-3.5 py-1.5 text-xs text-gray-300 transition-all hover:bg-[#a86d00] hover:text-white hover:border-[#a86d00] cursor-pointer"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="mx-4 sm:mx-6 md:px-0 mb-4 sm:mb-6 mt-1 rounded-xl sm:rounded-[16px] bg-[#14161c] border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="Type your message to Sarah Williams..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={sending}
            className="h-10 sm:h-[44px] flex-1 rounded-[10px] border border-transparent bg-[#090a0d] px-3 sm:px-4 text-sm sm:text-[15px] text-white placeholder-gray-500 outline-none focus:border-[#d4af37] transition"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || sending}
            className="flex h-10 w-10 sm:h-[44px] sm:w-[50px] shrink-0 items-center justify-center rounded-[10px] bg-[#d4af37] hover:bg-[#c29e28] text-black font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-[#d4af37]/20"
            title="Send Message"
          >
            {sending ? (
              <Loader2 size={18} className="animate-spin text-black" />
            ) : (
              <Send size={18} className="ml-0.5" />
            )}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ChatInterface;