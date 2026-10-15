"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Phone,
  Sparkles,
  Package,
  BadgePercent,
  RefreshCw,
  Headphones,
  CheckCircle2,
  Clock,
  UserCheck,
  Bot,
  ChevronRight,
  ExternalLink,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";
import {
  wholesalePharmaProducts,
  WholesaleProduct,
} from "@/components/widgets/PharmaWidgets";

interface ChatMessage {
  id: string;
  sender: "bot" | "agent" | "user" | "system";
  senderName?: string;
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
  products?: WholesaleProduct[];
  orderCard?: {
    orderId: string;
    status: string;
    eta: string;
    temp: string;
    items: string;
  };
}

const quickHelpTopics = [
  {
    id: "track-order",
    icon: Package,
    title: "Track Order",
    sub: "Live dispatch & cold-chain status",
    color: "text-[#1D4ED8] bg-[#EFF6FF] border-[#BFDBFE]",
  },
  {
    id: "ptr-rates",
    icon: BadgePercent,
    title: "PTR Price & Stock",
    sub: "Check live rates & 10+1 schemes",
    color: "text-[#16A34A] bg-[#DCFCE7] border-[#BBF7D0]",
  },
  {
    id: "bulk-quote",
    icon: Sparkles,
    title: "Bulk / Case Deal",
    sub: "Extra 5% margin on case lots",
    color: "text-[#EA580C] bg-[#FFF7ED] border-[#FED7AA]",
  },
  {
    id: "return-claim",
    icon: RefreshCw,
    title: "Returns & Claims",
    sub: "Batch, expiry or damage support",
    color: "text-[#7E22CE] bg-[#F3E8FF] border-[#E9D5FF]",
  },
];

function getTimeStr() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function TalkToAgentChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [agentMode, setAgentMode] = useState<"bot" | "live">("bot");
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [muted, setMuted] = useState(false);
  const [showFloatingPrompt, setShowFloatingPrompt] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: "welcome-1",
      sender: "bot",
      senderName: "InstaPharma Support Assistant",
      text: "Namaste! 👋 Welcome to Maa Bhagwati Pharmaceuticals Support Desk (Pan Bazaar Hub). How can I help your pharmacy or hospital today?",
      timestamp: "Just now",
      options: [
        { label: "📦 Track Order #MB-88412", action: "track-order" },
        { label: "💊 Check Top PTR Deals", action: "ptr-rates" },
        { label: "🧾 Request Bulk Credit Line", action: "bulk-quote" },
        { label: "👩‍⚕️ Connect to Live Agent", action: "connect-agent" },
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{
        topic?: string;
        initialMessage?: string;
      }>;
      setIsOpen(true);
      setUnreadCount(0);
      setShowFloatingPrompt(false);

      if (customEvent.detail?.initialMessage) {
        processUserMessage(customEvent.detail.initialMessage);
      } else if (customEvent.detail?.topic) {
        handleQuickAction(customEvent.detail.topic);
      }
    };

    window.addEventListener("open-support-chat", handleCustomOpen);
    return () => window.removeEventListener("open-support-chat", handleCustomOpen);
  });

  const appendUserAndRespond = (
    userText: string,
    replyBuilder: () => Omit<ChatMessage, "id" | "timestamp">
  ) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: getTimeStr(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replyData = replyBuilder();
      const botMsg: ChatMessage = {
        ...replyData,
        id: `reply-${Date.now()}`,
        timestamp: getTimeStr(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 850);
  };

  const handleQuickAction = (action: string) => {
    if (action === "track-order") {
      appendUserAndRespond("Track my wholesale order status", () => ({
        sender: agentMode === "live" ? "agent" : "bot",
        senderName:
          agentMode === "live"
            ? "Priya Sharma • Senior Support Agent"
            : "InstaPharma Support Assistant",
        text: "Here is the live dispatch & cold-chain telemetry for your latest consignment:",
        orderCard: {
          orderId: "MB-88412",
          status: "Out for Delivery (Guwahati Express Line)",
          eta: "Today by 4:30 PM (4-Hour SLA)",
          temp: "+4.2°C Validated Cold Box",
          items: "12 Boxes Mormox-CV 625, 4 Packs Basalog Insulin",
        },
        options: [
          { label: "📥 Download GST Invoice", action: "download-gst" },
          { label: "👩‍⚕️ Talk to Delivery Desk", action: "connect-agent" },
        ],
      }));
    } else if (action === "ptr-rates") {
      appendUserAndRespond("Show best-selling PTR rates & 10+1 schemes", () => ({
        sender: agentMode === "live" ? "agent" : "bot",
        senderName:
          agentMode === "live"
            ? "Priya Sharma • Senior Support Agent"
            : "InstaPharma Support Assistant",
        text: "Here are today's fastest-moving wholesale lots with direct depot PTR margins & Gold Coins:",
        products: wholesalePharmaProducts.slice(0, 3),
        options: [
          { label: "💉 Show Surgical Sutures", action: "show-sutures" },
          { label: "❄️ Show Cold-Chain Insulins", action: "show-coldchain" },
          { label: "👩‍⚕️ Negotiate Case-Lot Rate", action: "connect-agent" },
        ],
      }));
    } else if (action === "show-sutures") {
      appendUserAndRespond("Show Surgical Sutures & Consumables", () => ({
        sender: agentMode === "live" ? "agent" : "bot",
        senderName:
          agentMode === "live"
            ? "Priya Sharma • Senior Support Agent"
            : "InstaPharma Support Assistant",
        text: "We have fresh batches of Ethicon Vicryl Plus & Clinical Consumables ready for dispatch:",
        products: wholesalePharmaProducts.filter(
          (p) => p.category === "Surgicals & Consumables"
        ),
      }));
    } else if (action === "show-coldchain") {
      appendUserAndRespond("Show Cold-Chain (+2°C to +8°C) Stock", () => ({
        sender: agentMode === "live" ? "agent" : "bot",
        senderName:
          agentMode === "live"
            ? "Priya Sharma • Senior Support Agent"
            : "InstaPharma Support Assistant",
        text: "All insulins and biologics ship in 72-hour validated gel-pack cold boxes with digital temperature loggers:",
        products: wholesalePharmaProducts.filter((p) => p.coldChain),
      }));
    } else if (action === "bulk-quote") {
      appendUserAndRespond("I want a Bulk / Case-Lot Dealer Quote", () => ({
        sender: agentMode === "live" ? "agent" : "bot",
        senderName:
          agentMode === "live"
            ? "Priya Sharma • Senior Support Agent"
            : "InstaPharma Support Assistant",
        text: "For orders above ₹25,000, you unlock:\n• Extra 5% Case-Lot Margin\n• 10+1 / 20+3 Free Strip Schemes\n• 30-Day Interest-Free Credit Line (with Form 20/21 Drug License)\n• Free Same-Day Guwahati / Overnight NE Delivery",
        options: [
          { label: "👩‍⚕️ Connect to Bulk Desk Agent", action: "connect-agent" },
          { label: "📞 Request Instant Callback", action: "request-callback" },
        ],
      }));
    } else if (action === "return-claim") {
      appendUserAndRespond("Raise a Return / Replacement or Expiry Claim", () => ({
        sender: agentMode === "live" ? "agent" : "bot",
        senderName:
          agentMode === "live"
            ? "Priya Sharma • Senior Support Agent"
            : "InstaPharma Support Assistant",
        text: "We offer hassle-free replacement for transit damage, short-expiry (<6 months), or cold-chain breach. I've initialized Priority Claim Ticket #TKT-4092 for your account. Would you like a live agent to process an instant credit note?",
        options: [
          { label: "✅ Issue Instant Credit Note", action: "credit-note" },
          { label: "👩‍⚕️ Speak with Claims Agent", action: "connect-agent" },
        ],
      }));
    } else if (action === "download-gst") {
      toast.success("Downloading HSN-Mapped GST Invoice #INV-88412.pdf");
    } else if (action === "credit-note") {
      toast.success("Credit Note #CN-4092 queued for your partner ledger!");
      appendUserAndRespond("Issue Instant Credit Note", () => ({
        sender: "agent",
        senderName: "Priya Sharma • Senior Support Agent",
        text: "Done! Credit Note #CN-4092 has been logged. Our pickup executive will collect the return box on your next delivery run.",
      }));
    } else if (action === "request-callback") {
      toast.success("Callback Scheduled!", {
        description: "Our Pan Bazaar Senior Sales Executive will call you within 5 minutes.",
      });
      appendUserAndRespond("Request Instant Callback", () => ({
        sender: "agent",
        senderName: "Priya Sharma • Senior Support Agent",
        text: "Your priority callback request is confirmed! 📞 You can also reach our direct wholesale line immediately at +91 98765 43210.",
      }));
    } else if (action === "connect-agent") {
      setAgentMode("live");
      const sysMsg: ChatMessage = {
        id: `sys-${Date.now()}`,
        sender: "system",
        text: "🔄 Connected to Live Agent: Priya Sharma (Senior Pharmacist Desk • Guwahati Hub)",
        timestamp: getTimeStr(),
      };
      setMessages((prev) => [...prev, sysMsg]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `agent-${Date.now()}`,
            sender: "agent",
            senderName: "Priya Sharma • Senior Support Agent",
            text: "Hello! 👋 This is Priya from the Pan Bazaar Wholesale Desk. I have your session open. Please share the medicine names, quantities, or order ID you need help with!",
            timestamp: getTimeStr(),
            options: [
              { label: "💊 Share Today's PTR Sheet", action: "ptr-rates" },
              { label: "📦 Check Order #MB-88412", action: "track-order" },
            ],
          },
        ]);
      }, 900);
    }
  };

  const processUserMessage = (rawText: string) => {
    const clean = rawText.trim();
    if (!clean) return;
    const lower = clean.toLowerCase();

    const matchedProducts = wholesalePharmaProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower) ||
        lower.includes(p.brand.toLowerCase()) ||
        (lower.includes("mormox") && p.name.toLowerCase().includes("mormox")) ||
        (lower.includes("suture") && p.category.includes("Surgical")) ||
        (lower.includes("vicryl") && p.name.toLowerCase().includes("vicryl")) ||
        (lower.includes("insulin") && p.coldChain)
    );

    appendUserAndRespond(clean, () => {
      if (matchedProducts.length > 0) {
        return {
          sender: agentMode === "live" ? "agent" : "bot",
          senderName:
            agentMode === "live"
              ? "Priya Sharma • Senior Support Agent"
              : "InstaPharma Support Assistant",
          text: `I found ${matchedProducts.length} matching wholesale lot(s) in ready stock at our Pan Bazaar vault:`,
          products: matchedProducts.slice(0, 3),
          options: [
            { label: "🧾 Request Case-Lot Discount", action: "bulk-quote" },
            { label: "👩‍⚕️ Talk to Live Agent", action: "connect-agent" },
          ],
        };
      }

      if (
        lower.includes("track") ||
        lower.includes("order") ||
        lower.includes("dispatch") ||
        lower.includes("delivery") ||
        lower.includes("mb-")
      ) {
        return {
          sender: agentMode === "live" ? "agent" : "bot",
          senderName:
            agentMode === "live"
              ? "Priya Sharma • Senior Support Agent"
              : "InstaPharma Support Assistant",
          text: "Here is the live tracking status for your wholesale consignment:",
          orderCard: {
            orderId: "MB-88412",
            status: "In Transit • Guwahati Pan Bazaar Hub",
            eta: "Today before 4:30 PM",
            temp: "+4.2°C IoT Verified",
            items: "Wholesale Pharma Consignment (GST Paid)",
          },
          options: [
            { label: "📥 Download GST Invoice", action: "download-gst" },
            { label: "👩‍⚕️ Speak to Dispatch Agent", action: "connect-agent" },
          ],
        };
      }

      if (
        lower.includes("human") ||
        lower.includes("agent") ||
        lower.includes("person") ||
        lower.includes("call") ||
        lower.includes("talk")
      ) {
        setAgentMode("live");
        return {
          sender: "agent",
          senderName: "Priya Sharma • Senior Support Agent",
          text: "I'm here! 👋 This is Priya from the Maa Bhagwati Live Pharmacist Desk. Tell me how I can assist you—or call me directly on +91 98765 43210.",
          options: [
            { label: "📞 Request Callback in 5m", action: "request-callback" },
            { label: "💊 View Top PTR Lots", action: "ptr-rates" },
          ],
        };
      }

      return {
        sender: agentMode === "live" ? "agent" : "bot",
        senderName:
          agentMode === "live"
            ? "Priya Sharma • Senior Support Agent"
            : "InstaPharma Support Assistant",
        text:
          agentMode === "live"
            ? `Got it! I have checked our Pan Bazaar inventory for "${clean}". We can arrange immediate dispatch at direct depot PTR rates with HSN GST billing. Would you like me to add this to your quotation or call you with the exact case-lot rate?`
            : `Thanks for reaching out regarding "${clean}"! Our Pan Bazaar depot stocks 5,240+ formulations across 150+ brands. Select an option below or connect with our Live Pharmacist Agent for instant custom billing:`,
        options: [
          { label: "👩‍⚕️ Connect to Live Agent", action: "connect-agent" },
          { label: "💊 Browse Best Seller PTRs", action: "ptr-rates" },
          { label: "📞 Request Instant Callback", action: "request-callback" },
        ],
      };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue("");
    processUserMessage(text);
  };

  return (
    <>
      {/* FLOATING DOCK: TALK TO AGENT LAUNCHER + WHATSAPP QUICK BUTTON */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {!isOpen && showFloatingPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className="bg-white border border-blue-200 rounded-2xl p-3 shadow-xl max-w-[250px] relative"
            >
              <button
                type="button"
                onClick={() => setShowFloatingPrompt(false)}
                className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-slate-600"
                aria-label="Dismiss chat prompt"
              >
                <X className="w-3 h-3" />
              </button>
              <div
                onClick={() => {
                  setIsOpen(true);
                  setUnreadCount(0);
                  setShowFloatingPrompt(false);
                }}
                className="cursor-pointer pr-3"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1D4ED8]">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                  <span>Live Pharmacist Online</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
                  Need PTR rates, 10+1 schemes, or order tracking? Chat with our agent!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Row: WhatsApp Mini Circle + Main "Talk to Agent" Pill */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20request%20a%20wholesale%20PTR%20price%20list%20from%20Maa%20Bhagwati%20Pharmaceuticals."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white border-2 border-white shadow-lg flex items-center justify-center hover:scale-105 transition"
            aria-label="Chat on WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>

          <motion.button
            type="button"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setIsOpen(!isOpen);
              setUnreadCount(0);
              setShowFloatingPrompt(false);
            }}
            className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#1B3B6F] via-[#1D4ED8] to-[#0284C7] text-white font-bold text-xs sm:text-sm shadow-[0_12px_30px_rgba(29,78,216,0.42)] border-2 border-white cursor-pointer"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22C55E] border border-white" />
            </span>

            {isOpen ? (
              <>
                <X className="w-4 h-4" />
                <span>Close Support</span>
              </>
            ) : (
              <>
                <Headphones className="w-4 h-4 text-[#FDE047]" />
                <span>Talk to Agent</span>
              </>
            )}

            {!isOpen && unreadCount > 0 && (
              <span className="-top-1.5 -right-1.5 absolute w-5 h-5 rounded-full bg-[#FF6B35] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* SUPPORT ASSISTANT / CHATBOT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-36 md:bottom-22 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[410px] max-h-[78vh] bg-white rounded-3xl border border-slate-200 shadow-[0_25px_70px_-12px_rgba(15,23,42,0.35)] flex flex-col overflow-hidden"
          >
            {/* 1. HEADER: SUPPORT DESK + AGENT MODE SWITCHER */}
            <div className="bg-gradient-to-r from-[#1B3B6F] via-[#1D4ED8] to-[#0284C7] text-white p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                    {agentMode === "live" ? (
                      <UserCheck className="w-5 h-5 text-[#FDE047]" />
                    ) : (
                      <Bot className="w-5 h-5 text-[#FDE047]" />
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#1B3B6F]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate flex items-center gap-1.5">
                      <span>
                        {agentMode === "live"
                          ? "Priya Sharma (Live Agent)"
                          : "InstaPharma Wholesale Support"}
                      </span>
                    </div>
                    <div className="text-[11px] text-blue-100 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#FDE047]" />
                      <span>9 AM – 9 PM • Replies in &lt;15 sec</span>
                    </div>
                  </div>
                </div>

                {/* Top Right Header Controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setMuted(!muted)}
                    title={muted ? "Unmute notifications" : "Mute notifications"}
                    className="p-1.5 rounded-lg hover:bg-white/15 text-blue-100 hover:text-white transition cursor-pointer"
                  >
                    {muted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMessages(initialMessages);
                      setAgentMode("bot");
                      toast.info("Support conversation reset");
                    }}
                    title="Reset conversation"
                    className="p-1.5 rounded-lg hover:bg-white/15 text-blue-100 hover:text-white transition cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Minimize support chat"
                    className="p-1.5 rounded-lg hover:bg-white/15 text-blue-100 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mode Switcher Bar: AI Assistant vs Live Human Agent + Direct Call */}
              <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2 text-xs">
                <div className="inline-flex rounded-xl bg-black/20 p-0.5 border border-white/15">
                  <button
                    type="button"
                    onClick={() => setAgentMode("bot")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      agentMode === "bot"
                        ? "bg-white text-[#1B3B6F]"
                        : "text-blue-100 hover:text-white"
                    }`}
                  >
                    Smart Assistant
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction("connect-agent")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      agentMode === "live"
                        ? "bg-[#FF6B35] text-white"
                        : "text-blue-100 hover:text-white"
                    }`}
                  >
                    Live Agent
                  </button>
                </div>

                <a
                  href="tel:+919876543210"
                  className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-[11px] font-semibold inline-flex items-center gap-1 transition"
                >
                  <Phone className="w-3 h-3 text-[#FDE047]" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>

            {/* 2. BROWSE HELP TOPICS BAR */}
            <div className="px-3.5 py-2.5 bg-[#F8FAFC] border-b border-slate-200">
              <div className="grid grid-cols-4 gap-1.5">
                {quickHelpTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleQuickAction(topic.id)}
                      className="group p-2 rounded-xl bg-white hover:bg-[#EFF6FF] border border-slate-200 hover:border-[#93C5FD] flex flex-col items-center text-center transition cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center mb-1 ${topic.color}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-800 group-hover:text-[#1D4ED8] leading-tight line-clamp-1">
                        {topic.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. CHAT MESSAGES STREAM */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-[#F4F7FB] min-h-[290px] max-h-[380px]">
              {messages.map((msg) => {
                if (msg.sender === "system") {
                  return (
                    <div
                      key={msg.id}
                      className="text-center py-1 px-3 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-[#1B3B6F] mx-auto w-fit"
                    >
                      {msg.text}
                    </div>
                  );
                }

                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    {!isUser && msg.senderName && (
                      <span className="text-[10px] font-bold text-slate-500 mb-1 px-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#1D4ED8]" />
                        {msg.senderName}
                      </span>
                    )}

                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-2xs ${
                        isUser
                          ? "bg-[#1D4ED8] text-white rounded-br-xs"
                          : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
                      }`}
                    >
                      {msg.text}

                      {/* Embedded Live Order Tracking Card */}
                      {msg.orderCard && (
                        <div className="mt-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-blue-200 text-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono-tech font-bold text-xs text-[#1D4ED8]">
                              Order #{msg.orderCard.orderId}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                              Active
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-900">
                            {msg.orderCard.status}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            <strong>ETA:</strong> {msg.orderCard.eta}
                          </div>
                          <div className="text-[11px] text-sky-700 font-semibold">
                            ❄️ {msg.orderCard.temp}
                          </div>
                          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                            {msg.orderCard.items}
                          </div>
                        </div>
                      )}

                      {/* Embedded Interactive Product Cards */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="mt-2.5 space-y-2">
                          {msg.products.map((prod) => (
                            <div
                              key={prod.id}
                              className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <img
                                  src={prod.imageUrl}
                                  alt={prod.name}
                                  className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-200 p-0.5 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="font-bold text-[11px] text-slate-900 truncate">
                                    {prod.name}
                                  </div>
                                  <div className="text-[10px] text-[#16A34A] font-bold">
                                    PTR ₹{prod.ptrPrice}{" "}
                                    <span className="text-slate-400 line-through font-normal">
                                      ₹{prod.mrpPrice}
                                    </span>{" "}
                                    ({prod.discountPercent})
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  toast.success(`Added ${prod.name} to Quote!`)
                                }
                                className="px-2.5 py-1 rounded-lg bg-[#1D4ED8] hover:bg-[#1B3B6F] text-white text-[10px] font-bold shrink-0 cursor-pointer"
                              >
                                + Add
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Action Option Pills */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleQuickAction(opt.action)}
                            className="px-2.5 py-1 rounded-full bg-white hover:bg-[#EFF6FF] border border-[#93C5FD] text-[#1D4ED8] text-[11px] font-semibold inline-flex items-center gap-1 shadow-2xs transition cursor-pointer"
                          >
                            <span>{opt.label}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </motion.div>
                );
              })}

              {/* Typing Indicator Bubble */}
              {isTyping && (
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 w-fit shadow-2xs">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {agentMode === "live"
                      ? "Priya is typing..."
                      : "Checking Pan Bazaar inventory..."}
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 4. INPUT FORM + WHATSAPP HANDOFF FOOTER */}
            <div className="p-3 bg-white border-t border-slate-200 space-y-2">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    agentMode === "live"
                      ? "Message Priya Sharma (Live Agent)..."
                      : "Ask about PTR rates, order ID, or type 'agent'..."
                  }
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 focus:border-[#1D4ED8] bg-[#F8FAFC] focus:bg-white text-xs text-slate-900 outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1B3B6F] text-white transition cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span>Maa Bhagwati 24×7 B2B Support</span>
                <a
                  href="https://wa.me/919876543210?text=Hello%2C%20I%20need%20wholesale%20support%20from%20Maa%20Bhagwati%20Pharmaceuticals."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#16A34A] hover:underline inline-flex items-center gap-1"
                >
                  <span>Continue on WhatsApp</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
