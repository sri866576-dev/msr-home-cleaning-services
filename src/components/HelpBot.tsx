import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Bot, CalendarCheck, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";

const PHONE = "8919780725";
const WHATSAPP_PHONE = "918919780725";

type HelpBotProps = {
  onBook: (service?: string) => void;
};

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
  keywords: string[];
  service?: string;
};

const fallbackAnswer = `I may need our team to confirm that for you. Please call ${PHONE} or send a WhatsApp message for quick help.`;

const serviceAreas = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Hitech City",
  "Manikonda",
  "Miyapur",
  "Kondapur",
  "Uppal",
  "Kompally",
  "Himayat Nagar",
  "Bachupally",
  "Bibi Nagar",
  "Kukatpally",
  "Madhapur",
  "Dilsukh Nagar",
  "Ameerpet",
  "Chanda Nagar",
  "Kachiguda",
  "Srinivasa Nagar",
  "Hyderguda",
  "Tilak Nagar",
  "Gandhi Nagar",
  "Amberpet",
  "Barkatpura",
  "Nagole X Road",
  "Badangpet",
  "Boduppal",
  "Hayathnagar",
  "LB Nagar",
  "Narsingi",
];

const serviceKeywords = [
  "clean", "wash", "paint", "pest", "solar", "sofa", "carpet", "mattress",
  "tank", "fridge", "refrigerator", "window", "glass", "pricing", "price",
  "cost", "charge", "fee", "rate", "book", "slot", "schedule", "appointment",
  "hyderabad", "area", "location", "serve", "address", "contact", "phone",
  "call", "whatsapp", "number", "email", "office", "home", "house", "villa",
  "duplex", "bhk", "room", "kitchen", "bathroom", "floor", "polish", "scrub",
  "grease", "chimney", "stain", "dust", "dirt", "sludge", "algae", "vetted",
  "eco", "safe", "chemical", "pet", "kid", "machine", "vacuum", "steam"
];

const faqs: FaqItem[] = [
  {
    question: "What is the starting price for full home deep cleaning?",
    answer:
      "Full Home Deep Cleaning starts from ₹2,999 for 1 BHK. 2 BHK is ₹5,999, 3 BHK is ₹8,999, 4 BHK is ₹11,999, and Villa starts from ₹14,999. Final price depends on property condition.",
    keywords: ["home", "deep", "cleaning", "bhk", "price", "cost", "full"],
    service: "Full Home Deep Cleaning",
  },
  {
    question: "How much does kitchen deep cleaning cost?",
    answer:
      "Kitchen Deep Cleaning starts from ₹1,999 for 1 BHK, ₹2,299 for 2 BHK, ₹2,699 for 3 BHK, ₹2,999 for 4 BHK, and ₹3,499 for Villa.",
    keywords: ["kitchen", "grease", "chimney", "price", "cost"],
    service: "Kitchen Deep Cleaning",
  },
  {
    question: "Do you clean sofas and carpets?",
    answer:
      "Yes. Sofa Steam Cleaning starts from ₹999 and Carpet Cleaning starts from ₹499. We help with dust, stains, odours, and everyday fabric buildup.",
    keywords: ["sofa", "carpet", "fabric", "steam", "couch"],
    service: "Sofa Steam Cleaning",
  },
  {
    question: "Do you provide office cleaning?",
    answer:
      "Yes. Office Deep Cleaning starts from ₹3,499 for a small office, ₹4,999 for medium, ₹6,999 for large, ₹8,999 for extra large, and ₹10,999 for corporate spaces.",
    keywords: ["office", "corporate", "commercial", "workspace"],
    service: "Office Deep Cleaning",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We serve Hyderabad areas including Banjara Hills, Jubilee Hills, Gachibowli, Kukatpally, Madhapur, Miyapur, Kondapur, Uppal, Badangpet, Boduppal, Hayathnagar, LB Nagar, Narsingi and nearby areas. Call us to confirm coverage for your specific zone.",
    keywords: ["area", "location", "serve", "hyderabad", "near", "zone"],
  },
  {
    question: "Can I book same-day cleaning?",
    answer:
      "Same-day slots are often available depending on location and team schedule. Share your service, locality, and phone number so our team can confirm quickly.",
    keywords: ["same", "today", "urgent", "slot", "available", "booking"],
  },
  {
    question: "Do prices change after inspection?",
    answer:
      "The listed prices are starting prices. Final pricing depends on property size, condition, stains, access, and exact requirements. Our team confirms the final quote before starting work.",
    keywords: ["final", "condition", "inspection", "extra", "hidden", "charges"],
  },
  {
    question: "How do I contact MSR?",
    answer: `You can call ${PHONE} or WhatsApp us for fast support. We are available daily from 7:00 AM to 9:00 PM.`,
    keywords: ["contact", "phone", "call", "whatsapp", "number", "support"],
  },
  {
    question: "Do you clean solar panels?",
    answer:
      "Yes! We offer specialized Solar Panel Cleaning starting from ₹999 to maximize power output and efficiency of your solar system.",
    keywords: ["solar", "panel", "panels", "cell", "efficiency", "roof"],
    service: "Solar Panel Cleaning",
  },
  {
    question: "Do you provide painting services?",
    answer:
      "Yes, we provide professional painting services (labour only) starting at ₹14,900 for interior and exterior painting.",
    keywords: ["paint", "painting", "painter", "wall", "interior", "exterior"],
    service: "Painting Services (Only Labour)",
  },
  {
    question: "Do you offer pest control?",
    answer:
      "Yes, we provide General Pest Control services starting at ₹1,999 to keep your premises free from cockroaches, ants, termites, and other pests.",
    keywords: ["pest", "bug", "bugs", "cockroach", "ants", "termite", "termites"],
    service: "General Pest Control",
  },
  {
    question: "Do you clean water tanks?",
    answer:
      "Yes! We provide safe, hygienic Water Tank Cleaning and sanitisation starting from ₹999 to ensure clean water storage.",
    keywords: ["tank", "water", "sump", "overhead", "sanitise", "sanitization"],
    service: "Water Tank Cleaning",
  },
  {
    question: "Are your cleaning chemicals safe for kids and pets?",
    answer:
      "Yes, 100%! We use eco-conscious, non-toxic, and biodegradable cleaning products that are completely safe for kids, pets, and the environment.",
    keywords: ["safe", "chemical", "chemicals", "kid", "kids", "pet", "pets", "eco", "friendly", "toxic"],
  },
  {
    question: "What kind of cleaning equipment do you use?",
    answer:
      "We use professional industrial-grade scrubbing machines, high-pressure washers, heavy-duty vacuum cleaners, steam sanitizers, and premium microfiber tools.",
    keywords: ["machine", "equipment", "tool", "vacuum", "steam", "scrubber", "wash"],
  },
  {
    question: "What is the difference between empty and occupied house cleaning?",
    answer:
      "Empty house cleaning is done before moving in or after moving out (starts from ₹2,900 for 1 BHK). Occupied house cleaning involves cleaning around furniture and is done with extra care (starts from ₹5,000 for 1 BHK).",
    keywords: ["empty", "occupied", "furniture", "moving", "move", "shifting", "shift"],
  },
  {
    question: "Do you provide floor polishing or scrubbing?",
    answer:
      "Yes! Floor Cleaning/Scrubbing starts from ₹1,299, and professional Floor Polishing to restore shine starts from ₹1,999.",
    keywords: ["floor", "polish", "polishing", "marble", "tile", "tiles", "scrub", "scrubbing"],
    service: "Floor Polishing",
  },
];

const quickQuestions = [
  "Full home cleaning price",
  "Kitchen cleaning cost",
  "Do you clean offices?",
  "Same-day slot available?",
];

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function findAnswer(question: string): FaqItem | null {
  const normalized = question.toLowerCase().trim();

  // Smart Greeting Detection
  if (
    ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "yo", "how are you", "how's it going"].some(
      (g) => normalized === g || normalized.startsWith(g + " ") || normalized.startsWith("hello ") || normalized.startsWith("hi ")
    )
  ) {
    return {
      question: "Hello",
      answer: "Hello! I am MSR Assist, your cleaning concierge. How can I help you today? I can answer questions about prices, services, or guide you through scheduling.",
      keywords: [],
    };
  }

  // Smart Gratitude Recognition
  if (
    ["thanks", "thank you", "thx", "appreciate it", "great", "thankyou"].some((t) =>
      normalized.includes(t)
    )
  ) {
    return {
      question: "Thanks",
      answer: "You're very welcome! Let me know if you have any other questions, or feel free to call or WhatsApp us for instant support.",
      keywords: [],
    };
  }

  // Identity Inquiry
  if (
    ["who are you", "what is your name", "what are you", "bot", "how are you", "how r u", "who r u"].some((q) =>
      normalized.includes(q)
    )
  ) {
    return {
      question: "Who are you?",
      answer: "I am MSR Assist, your virtual cleaning concierge. I'm here to provide pricing estimates, area details, and help you book a service.",
      keywords: [],
    };
  }

  // --- Dynamic Location Check ---
  // Try to find if any of our known service areas is mentioned in the query
  const matchedArea = serviceAreas.find(area => {
    const lowerArea = area.toLowerCase();
    const queryNoSpaces = normalized.replace(/\s+/g, "");
    const areaNoSpaces = lowerArea.replace(/\s+/g, "");
    return normalized.includes(lowerArea) || queryNoSpaces.includes(areaNoSpaces);
  });

  if (matchedArea) {
    return {
      question: `Is service available in ${matchedArea}?`,
      answer: `Yes! MSR Deep Cleaning services are available in ${matchedArea}. We have active cleaning crews in this area. Call us at ${PHONE} or click the WhatsApp button to book your slot!`,
      keywords: [],
    };
  }

  // Check specifically for Pragathi Nagar or other variants
  if (normalized.includes("pragathi")) {
    return {
      question: "Is service available in Pragathi Nagar?",
      answer: `No, Pragathi Nagar is not in our standard service area list at the moment. However, we occasionally serve nearby locations for full home or specialized cleaning. Please call us at ${PHONE} or WhatsApp us to confirm if our team can accommodate your booking in Pragathi Nagar.`,
      keywords: [],
    };
  }

  // Check if it's a general location/availability inquiry for another unknown area
  const locationKeywords = [
    "available in", "service in", "serve in", "clean in", "provide in", "deliver to",
    "available at", "do you cover", "coverage", "do you serve", "service available in",
    "clean at", "services in", "areas", "area", "location", "locations", "serve"
  ];
  
  const isLocationInquiry = locationKeywords.some(kw => normalized.includes(kw)) || 
                             normalized.startsWith("in ") ||
                             (normalized.includes("available") && normalized.includes("in"));

  if (isLocationInquiry) {
    const locationMatch = normalized.match(/(?:available\s+in|service\s+in|serve\s+in|clean\s+in|cover|services\s+in|in|at|near|around)\s+([a-zA-Z0-9\s]+)/i);
    let queriedLocation = "";
    if (locationMatch && locationMatch[1]) {
      queriedLocation = locationMatch[1].trim();
    }

    if (queriedLocation && queriedLocation.length > 2 && 
        !["service", "cleaning", "hyderabad", "here", "there", "this", "that", "area", "areas", "location", "locations", "my", "your", "our", "today", "now", "tomorrow", "week"].includes(queriedLocation.toLowerCase())) {
      const formattedLocation = queriedLocation.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return {
        question: `Is service available in ${formattedLocation}?`,
        answer: `No, ${formattedLocation} is not in our standard service area list at the moment. However, we occasionally serve nearby locations for full home or specialized cleaning. Please call us at ${PHONE} or WhatsApp us to confirm if our team can accommodate your booking in ${formattedLocation}.`,
        keywords: [],
      };
    }
  }

  // --- Standard FAQ Keyword Matching ---
  const words = normalized.split(/[^a-z0-9]+/).filter(Boolean);
  let bestMatch: { item: FaqItem; score: number } | null = null;

  faqs.forEach((item) => {
    const haystack = `${item.question} ${item.answer} ${item.keywords.join(" ")}`.toLowerCase();
    const keywordScore = item.keywords.reduce(
      (score, keyword) => score + (normalized.includes(keyword) ? 3 : 0),
      0,
    );
    const wordScore = words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0);
    const score = keywordScore + wordScore;

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { item, score };
    }
  });

  if (bestMatch && bestMatch.score >= 2) {
    return bestMatch.item;
  }

  // --- Off-topic / Irrelevant Question Filtering ---
  // If the query does not contain any cleaning/service related keywords, tell them to ask about our service.
  const hasServiceKeywords = serviceKeywords.some(keyword => normalized.includes(keyword));
  if (!hasServiceKeywords && words.length > 0) {
    return {
      question: "Off-topic",
      answer: "I'm sorry, I am MSR Assist, your cleaning concierge. Please ask questions about our cleaning services, pricing, bookings, or locations. How can I help you with your cleaning needs today?",
      keywords: [],
    };
  }

  return null;
}

export function HelpBot({ onBook }: HelpBotProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastMatchedService, setLastMatchedService] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi, I am MSR Assist. Ask me about prices, services, same-day slots, or Hyderabad service areas.",
    },
  ]);
  const messageId = useRef(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lastBotAnswer = useMemo(
    () => [...messages].reverse().find((message) => message.role === "bot")?.text ?? "",
    [messages],
  );

  const addMessage = (role: ChatMessage["role"], text: string) => {
    setMessages((current) => [...current, { id: messageId.current++, role, text }]);
  };

  const askQuestion = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    addMessage("user", cleanQuestion);
    setInput("");

    const match = findAnswer(cleanQuestion);
    if (match?.service) {
      setLastMatchedService(match.service);
    }

    setIsTyping(true);

    // Simulate natural typing delay (600ms - 900ms)
    const delay = Math.max(600, Math.min(900, cleanQuestion.length * 7));
    setTimeout(() => {
      addMessage("bot", match?.answer ?? fallbackAnswer);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askQuestion(input);
  };

  // Auto-scroll to bottom of chat when new messages arrive or when typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, open]);

  // Clean up dynamic button label for context-aware bookings
  const bookButtonLabel = lastMatchedService
    ? `Book ${lastMatchedService
        .replace(" Deep Cleaning", "")
        .replace(" Steam Cleaning", "")
        .replace(" Cleaning", "")
        .replace(" Services", "")}`
    : "Book";

  return (
    <div className="helpbot-root">
      {open ? (
        <section className="helpbot-panel animate-scale-pop" aria-label="MSR chat support">
          <div className="helpbot-header">
            <div className="flex items-center gap-3">
              <span className="helpbot-avatar animate-luxury-float">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#008A90]">
                  MSR Assist
                </p>
                <h3 className="font-display text-lg font-black text-[#0D2A3A]">
                  Cleaning Concierge
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="helpbot-close hover:bg-[#F4F7F6]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="helpbot-messages" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`helpbot-bubble animate-scale-pop ${
                  message.role === "user" ? "helpbot-bubble-user" : "helpbot-bubble-bot"
                }`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="helpbot-bubble-typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="helpbot-suggestions" aria-label="Suggested questions">
            {quickQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="hover:bg-[#EAF3F3] hover:text-[#005F63] transition-colors"
                onClick={() => askQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="helpbot-form">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about prices or booking..."
              aria-label="Ask MSR Assist"
            />
            <button
              type="submit"
              aria-label="Send question"
              className="hover:bg-[#005F63] hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="helpbot-actions">
            <button
              type="button"
              className="hover:bg-[#D5E6E6] hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={() => onBook(lastMatchedService ?? undefined)}
            >
              <CalendarCheck className="h-4 w-4" />
              {bookButtonLabel}
            </button>
            <a
              href={`tel:+91${PHONE}`}
              className="hover:bg-[#D5E6E6] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <button
              type="button"
              className="hover:bg-[#D5E6E6] hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={() =>
                openWhatsApp(
                  `Hi MSR Deep Cleaning, I need help. Bot answer: ${lastBotAnswer.slice(0, 120)}`,
                )
              }
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close MSR Assist" : "Open MSR Assist"}
        className="helpbot-launcher"
      >
        <span>
          <Sparkles className="h-4 w-4" />
          <Bot className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}

