"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { 
  Handshake, 
  Mail, 
  Calendar, 
  BarChart3, 
  FileText, 
  MessageCircle, 
  ArrowDown, 
  ArrowRight,
  CheckCircle2,
  MapPin,
  Send,
  Sparkles,
  Zap,
  Users,
  Clock,
  TrendingUp,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUp,
  MessageSquare,
  Layout
} from "lucide-react";

import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Why MaryamX", href: "#why-hire" },
  { name: "Tools", href: "#tools" },
  { name: "Contact", href: "#contact" },
];

const services = [
  {
    icon: MessageSquare,
    title: "Client Support & Communication",
    description: "Managing 40-60 daily interactions across WhatsApp, email, and platforms with 99% accuracy.",
  },
  {
    icon: Sparkles,
    title: "Administrative & Virtual Assistance",
    description: "Calendar management, data entry, and operational support for remote teams.",
  },
  {
    icon: Handshake,
    title: "Operations Coordination",
    description: "Scheduling 5+ daily sessions, maintaining 700+ records, and streamlining workflows.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Calendar Management",
    description: "Coordinating complex schedules for instructors, clients, and training sessions.",
  },
  {
    icon: BarChart3,
    title: "Data Tracking & Reporting",
    description: "Weekly performance reports, client engagement tracking, and process improvement.",
  },
];

const tools = [
  { name: "Google Workspace", category: "Gmail, Calendar, Drive, Docs, Sheets", icon: BarChart3 },
  { name: "Microsoft Office Suite", category: "Excel, Word, PowerPoint", icon: FileText },
  { name: "CRM Systems", category: "Client Relationship Management", icon: Handshake },
  { name: "Communication Tools", category: "Zoom, WhatsApp Business", icon: MessageCircle },
  { name: "Remote Collaboration", category: "Team Coordination", icon: Zap },
  { name: "Notion", category: "Knowledge Base", icon: FileText },
  { name: "Slack", category: "Team Chat", icon: MessageSquare },
  { name: "Trello", category: "Project Management", icon: Layout },
];

const workItems = [
  {
    title: "Weekly Operations Report",
    description: "Comprehensive metrics tracking 28 clients, 10 new onboardings, 18 follow-ups, and 12 sessions scheduled within a single week at XM Trading Academy.",
    demonstrates: ["Organization and data management", "Operational efficiency", "Attention to detail"],
    image: "/images/weekly operations.png",
    link: "https://docs.google.com/document/d/1KRXJpzMsQEuwbTmL2xpSQVM1ppGHLQf7KoKhMeK1K-A/edit?usp=sharing",
    stats: [
      { value: 28, label: "Clients Managed", icon: Users },
      { value: 10, label: "New Onboarded", icon: TrendingUp },
      { value: 18, label: "Follow-ups", icon: Clock },
      { value: 12, label: "Sessions", icon: Calendar },
    ],
  },
  {
    title: "Email Management System",
    description: "Structured inbox triage and response system with categorized templates for inquiries, follow-ups, reminders, and complaint resolution.",
    demonstrates: ["Clear and professional communication", "Inbox organization", "Client relationship tracking"],
    image: "/images/Email management.png",
    link: "https://docs.google.com/document/d/1098W0dSJjeKwfCSX-qP6Ae_EV_r6b5qQmX0GB14ctts/edit?tab=t.0#heading=h.6ktasxa0y7gt",
    tags: ["Inbox Triage", "Templates", "Priority Sorting"],
  },
  {
    title: "Client Onboarding SOP",
    description: "7-step documented process from initial contact to fully onboarded client, including welcome messages and tracker setup.",
    demonstrates: ["System building", "Process documentation", "Seamless client experience"],
    image: "/images/Client Relationship.png",
    link: "https://docs.google.com/document/d/1wldsxpe_ZmDYEN8e1rkb2Egq6lwAPvebkrpWmLlQ4J4/edit?tab=t.0",
    tags: ["7-Step Process", "Welcome Flow", "Documentation"],
  },
  {
    title: "Client Tracking Dashboard",
    description: "Real-time Google Sheets dashboard with daily updates, status tracking, and client information management.",
    demonstrates: ["Data management", "Real-time reporting", "Attention to detail"],
    image: "/images/Screenshot 2026-03-29 191541.png",
    tags: ["Google Sheets", "Live Dashboard", "Status Tracking"],
  },
];

const contactMethods = [
  { icon: Mail, label: "Email", value: "meeharabdullahi2026@gmai.com", href: "mailto:meeharabdullahi2026@gmai.com" },
  { icon: Handshake, label: "LinkedIn", value: "maryam-abdullahi-ibrahim", href: "https://linkedin.com/in/maryam-abdullahi-ibrahim" },
  { icon: Zap, label: "Telegram", value: "@maryam_supportpro", href: "https://t.me/maryam_supportpro" },
  { icon: MapPin, label: "Location", value: "Kano, Nigeria", href: "#" },
];

const stats = [
  { value: 28, label: "Total Clients", icon: Users },
  { value: 10, label: "New Onboarded", icon: TrendingUp },
  { value: 18, label: "Follow-ups", icon: Clock },
  { value: 12, label: "Sessions", icon: Calendar },
];

function InfiniteMarquee({ items, theme }: { items: typeof tools, theme: 'light' | 'dark' }) {
  const [isPaused, setIsPaused] = useState(false);
  
  // Double the items for seamless looping
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden w-full py-10">
      {/* Fade Edges */}
      <div className={`absolute inset-y-0 left-0 w-32 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-[#0f0f12] to-transparent' : 'bg-gradient-to-r from-[#fafaf9] to-transparent'}`} />
      <div className={`absolute inset-y-0 right-0 w-32 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-l from-[#0f0f12] to-transparent' : 'bg-gradient-to-l from-[#fafaf9] to-transparent'}`} />
      
      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running"
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        {duplicatedItems.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div 
              key={i} 
              className={`flex-shrink-0 w-64 p-8 rounded-3xl text-center border transition-all duration-300 ${theme === 'dark' ? 'bg-[#18181b] border-white/5 hover:border-purple-500/50 hover:bg-[#27272a]' : 'bg-white border-stone-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm ${theme === 'dark' ? 'bg-[#0f0f12]' : 'bg-stone-50'}`}>
                <Icon className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} />
              </div>
              <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`}>{tool.name}</h3>
              <p className={`text-xs transition-colors duration-300 uppercase tracking-wider font-medium ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>{tool.category}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{count}</span>;
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const [theme] = useState<"light" | "dark">("light");
  return (
    <span className={`text-xs font-medium uppercase tracking-[0.2em] text-purple-500/70 mb-3 block`}>
      {children}
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const [showMoreWork, setShowMoreWork] = useState(false);

  const heroImages = [
    "/images/IMG_6686.PNG",
    "/images/IMG_6683.PNG",
    "/images/IMG_6687.PNG"
  ];

  const additionalWorkItems = [
    {
      title: "Operational SOP Document",
      description: "Full professional SOP manual for Client Relations & Operations, detailing the exact systems built for XM Trading Academy.",
      image: "/images/Client Relationship.png",
      link: "https://docs.google.com/document/d/1wldsxpe_ZmDYEN8e1rkb2Egq6lwAPvebkrpWmLlQ4J4/edit?tab=t.0",
      tags: ["Internal Ops", "SOP Manual", "System Design"],
    },
    {
      title: "Email Triage Framework",
      description: "Visual breakdown of the structured approach to managing high-volume client communication and priority sorting.",
      image: "/images/Email management.png",
      link: "https://docs.google.com/document/d/1098W0dSJjeKwfCSX-qP6Ae_EV_r6b5qQmX0GB14ctts/edit?tab=t.0#heading=h.6ktasxa0y7gt",
      tags: ["Communication", "Workflows", "Strategy"],
    },
    {
      title: "Weekly Performance Metrics",
      description: "A detailed look at the weekly operations report format used to track 700+ client records and 40-60 daily interactions.",
      image: "/images/weekly operations.png",
      link: "https://docs.google.com/document/d/1KRXJpzMsQEuwbTmL2xpSQVM1ppGHLQf7KoKhMeK1K-A/edit?usp=sharing",
      tags: ["Data Analytics", "Reporting", "Efficiency"],
    }
  ];

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setMounted(true);
    
    // Hero image slider timer
    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Mobile parallax effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
      
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
      
      const sections = ["hero", "about", "services", "work", "tools", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f0f12] text-white' : 'bg-[#fafaf9] text-[#1a1a2e]'}`}>
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]" 
        style={{ 
          backgroundImage: theme === 'dark' 
            ? `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`
            : `linear-gradient(#1a1a2e 1px, transparent 1px), linear-gradient(90deg, #1a1a2e 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />
      {/* Sophisticated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse-soft transition-colors duration-500 ${theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-200/20'}`} />
        <div className={`absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl animate-pulse-soft transition-colors duration-500 ${theme === 'dark' ? 'bg-violet-600/20' : 'bg-violet-200/20'}`} style={{ animationDelay: '2s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl transition-colors duration-500 ${theme === 'dark' ? 'bg-indigo-600/10' : 'bg-indigo-100/10'}`} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? theme === 'dark' ? "bg-[#0f0f12]/70 backdrop-blur-xl shadow-sm py-4" : "bg-white/70 backdrop-blur-xl shadow-sm py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <a href="#" className={`text-xl font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`}>
            Maryam<span className="text-purple-500 italic">X</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-purple-500 relative group ${activeSection === link.href.slice(1) ? "text-purple-500" : theme === 'dark' ? "text-stone-400" : "text-stone-500"}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button className="hidden md:flex bg-stone-900 hover:bg-stone-800 text-white rounded-full px-6 text-sm">
              Hire Me
            </Button>
            {/* Theme toggle */}
            <button 
              className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Mobile menu button */}
            <button 
              className={`md:hidden p-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-600'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${theme === 'dark' ? 'bg-[#0f0f12]/95' : 'bg-white/95'} backdrop-blur-xl ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 p-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-3xl font-light transition-all duration-300 hover:text-purple-500 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-8 py-4 text-lg mt-8"
            onClick={() => setMobileMenuOpen(false)}
          >
            Hire Me
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-300 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-100'}`}>
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>Client Support & Operations Assistant</span>
            </div>
            
            <h1 className={`text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`} style={{ fontFamily: "var(--font-heading)" }}>
              Your operations, <span className="italic text-purple-400">handled.</span>
            </h1>
            
            <p className={`text-lg max-w-md leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
              I help businesses and entrepreneurs run smoothly by managing the details so you can focus on growth. From client onboarding to daily operations, I&apos;ve got you covered.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-6 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
                View My Work
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="ghost" className={`hover:text-purple-500 rounded-full px-8 py-6 text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
                Let&apos;s Talk
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Main Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200 rounded-[3rem] blur-3xl opacity-50" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-stone-900/5 aspect-[4/5] bg-stone-100 dark:bg-stone-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroImages[currentHeroImage]}
                      alt="Maryam Ibrahim"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className={`absolute -bottom-8 -left-8 rounded-2xl p-5 shadow-xl border transition-all duration-500 ${theme === 'dark' ? 'bg-[#27272a]/90 border-white/10' : 'bg-white/90 border-stone-100/50'} backdrop-blur-md`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                  <Users className={`w-5 h-5 transition-colors duration-300 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} />
                </div>
                <div>
                  <p className={`text-2xl font-light transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`}><AnimatedCounter target={28} /></p>
                  <p className={`text-xs transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Clients Managed</p>
                </div>
              </div>
            </div>
            
            <div className={`absolute -top-6 -right-6 rounded-2xl p-5 shadow-xl border transition-all duration-500 ${theme === 'dark' ? 'bg-[#27272a]/90 border-white/10' : 'bg-white/90 border-stone-100/50'} backdrop-blur-md z-20`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-violet-900/30' : 'bg-violet-50'}`}>
                  <Clock className={`w-5 h-5 transition-colors duration-300 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-500'}`} />
                </div>
                <div>
                  <p className="text-2xl font-light text-stone-800 dark:text-white"><AnimatedCounter target={18} /></p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Follow-ups</p>
                </div>
              </div>
            </div>

            {/* Single Large Animated B&W Professional Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: -8,
                y: [0, -15, 0] 
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.2 },
                scale: { duration: 0.8, delay: 1.2 },
                rotate: { duration: 0.8, delay: 1.2 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              className={`absolute -bottom-12 -right-4 md:-right-12 p-3 rounded-[2rem] border shadow-2xl transition-all duration-500 ${theme === 'dark' ? 'bg-[#18181b] border-white/10' : 'bg-white border-stone-200'} backdrop-blur-md z-30`}
            >
              <div className="relative w-32 h-44 md:w-40 md:h-56 rounded-[1.5rem] overflow-hidden grayscale contrast-125 brightness-90">
                <Image
                  src="/images/IMG_6693.PNG"
                  alt="Professional Context"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-[10px] uppercase tracking-tighter">Ops Expert</Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-28 px-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div>
                <SectionLabel>About</SectionLabel>
                <h2 className="text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight transition-colors duration-300" style={{ fontFamily: "var(--font-heading)" }}>
                  Structured. Consistent. <span className="italic text-purple-400">Client-first.</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className={`rounded-2xl p-6 text-center transition-colors duration-300 cursor-default ${theme === 'dark' ? 'bg-[#27272a] hover:bg-purple-900/20' : 'bg-stone-50 hover:bg-purple-50'}`}>
                    <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-3" />
                    <span className={`text-4xl font-light block transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`}>
                      <AnimatedCounter target={stat.value} />
                    </span>
                    <p className={`text-sm mt-2 transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6 pt-8">
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>
                I&apos;m <strong className={theme === 'dark' ? 'text-white' : 'text-stone-900'}>Maryam Abdullahi Ibrahim</strong>, a Client Support & Operations Specialist with 4+ years managing 700+ client relationships and coordinating 5+ daily training sessions.
              </p>
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                I specialize in building systems that keep businesses organized — from client tracking dashboards to email management workflows. Based in Kano, Nigeria, I work remotely with teams worldwide.
              </p>
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                My philosophy is simple: <em className="text-purple-500 font-medium">great operations are invisible.</em> When I do my job well, clients feel cared for, appointments are kept, and things simply work — without anyone noticing the machinery behind the scenes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-28 px-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f0f12]' : 'bg-stone-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Services</SectionLabel>
            <h2 className={`text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : ''}`} style={{ fontFamily: "var(--font-heading)" }}>
              What I <span className="italic text-purple-400">do</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <TiltCard
                  key={i}
                  className={`rounded-xl p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-default group ${theme === 'dark' ? 'bg-[#27272a]/80 hover:bg-[#27272a]' : 'bg-stone-50/80 hover:bg-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}>
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400 group-hover:text-purple-400' : 'text-stone-600 group-hover:text-purple-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`} style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                      <p className={`leading-relaxed transition-colors duration-300 text-sm line-clamp-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>{service.description}</p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className={`py-28 px-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Proof of Work</SectionLabel>
            <h2 className={`text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : ''}`} style={{ fontFamily: "var(--font-heading)" }}>
              Recent <span className="italic text-purple-400">Projects</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {workItems.map((item, i) => (
              <TiltCard
                key={i}
                className={`group rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 ring-1 ${theme === 'dark' ? 'bg-[#27272a]/80 hover:bg-[#27272a] border-white/10' : 'bg-stone-50/80 hover:bg-white border-stone-900/5'} ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div 
                  className="relative h-64 overflow-hidden cursor-zoom-in"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white shadow-xl">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <h3 className={`text-2xl font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`} style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                  </div>
                  <p className={`mb-4 leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>{item.description}</p>
                  
                  {item.demonstrates && (
                    <div className="mb-6 space-y-1">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>What this demonstrates:</p>
                      <ul className={`text-sm space-y-1 transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                        {item.demonstrates.map((point, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-purple-400" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {item.stats && (
                    <div className="grid grid-cols-4 gap-4">
                      {item.stats.map((stat, j) => {
                        const StatIcon = stat.icon;
                        return (
                          <div key={j} className={`rounded-xl p-4 text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                              <StatIcon className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className={`text-xl font-light block transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`}><AnimatedCounter target={stat.value} /></span>
                            <p className={`text-xs mt-1 transition-colors duration-300 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-500'}`}>{stat.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary" className={`rounded-full px-3 transition-colors duration-300 ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-600'}`}>{tag}</Badge>
                      ))}
                    </div>
                  )}

                  {item.link && (
                    <Button 
                      asChild
                      className="w-full rounded-full py-7 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
                    >
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        Access Full Case Study
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>

          {/* View More Section */}
          <div className="mt-16 text-center">
            <AnimatePresence>
              {showMoreWork && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {additionalWorkItems.map((item, i) => (
                      <TiltCard
                        key={i}
                        className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-xl ${theme === 'dark' ? 'bg-[#27272a]/50 border-white/5' : 'bg-stone-50/50 border-stone-200'}`}
                      >
                        <div 
                          className="relative h-48 overflow-hidden cursor-zoom-in"
                          onClick={() => setSelectedImage(item.image)}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Sparkles className="text-white w-6 h-6" />
                          </div>
                        </div>
                        <div className="p-6 text-left">
                          <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`}>{item.title}</h4>
                          <p className={`text-sm mb-6 line-clamp-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>{item.description}</p>
                          <Button 
                            asChild
                            variant="outline"
                            className={`w-full rounded-full border-purple-500/30 hover:border-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}
                          >
                            <a href={item.link} target="_blank" rel="noopener noreferrer">View Document</a>
                          </Button>
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              onClick={() => setShowMoreWork(!showMoreWork)}
              variant="outline"
              className={`rounded-full px-10 py-6 border-2 transition-all duration-300 ${theme === 'dark' ? 'border-stone-800 text-stone-300 hover:bg-stone-800' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
            >
              {showMoreWork ? "Show Less" : "View Case Study Documents"}
              <motion.div
                animate={{ rotate: showMoreWork ? 180 : 0 }}
                className="ml-2"
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className={`py-28 px-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f0f12]' : 'bg-stone-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Tools</SectionLabel>
            <h2 className={`text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight transition-colors duration-300 mb-6 ${theme === 'dark' ? 'text-white' : ''}`} style={{ fontFamily: "var(--font-heading)" }}>
              What I <span className="italic text-purple-400">use</span>
            </h2>
            <p className={`text-lg transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
              Tools I use to manage client communication, operations, and workflow efficiently.
            </p>
          </div>
          
          <InfiniteMarquee items={tools} theme={theme} />
        </div>
      </section>

      {/* Why Work With Me Section */}
      <section id="why-hire" className={`py-28 px-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f0f12]' : 'bg-stone-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Value</SectionLabel>
            <h2 className={`text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : ''}`} style={{ fontFamily: "var(--font-heading)" }}>
              Why Work <span className="italic text-purple-400">With Me</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Organization", desc: "Strong organizational and multitasking skills to keep your business on track." },
              { title: "Communication", desc: "Clear and professional communication across all client touchpoints." },
              { title: "Scalability", desc: "Ability to manage high-volume client interactions without losing quality." },
              { title: "Reliability", desc: "Detail-oriented and reliable in fast-paced, demanding environments." }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl transition-all duration-300 ${theme === 'dark' ? 'bg-[#18181b] hover:bg-[#27272a]' : 'bg-white hover:shadow-xl hover:shadow-purple-500/5'}`}>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-medium mb-3 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-stone-800'}`} style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className={`leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-28 px-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <SectionLabel>Contact</SectionLabel>
                <h2 className={`text-5xl lg:text-7xl font-light leading-[0.95] tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : ''}`} style={{ fontFamily: "var(--font-heading)" }}>
                  Ready to work <span className="italic text-purple-400">together?</span>
                </h2>
              </div>
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
                Whether you need help with daily operations, client management, or building systems from scratch — let&apos;s talk about how I can help your business run smoother.
              </p>
              
              <div className="space-y-4">
                {contactMethods.map((method, i) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={i}
                      href={method.href}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 group ${theme === 'dark' ? 'bg-[#27272a]/80 hover:bg-[#27272a]' : 'bg-stone-50/80 hover:bg-white'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-white'}`}>
                        <Icon className={`w-5 h-5 transition-colors duration-300 ${theme === 'dark' ? 'text-stone-400 group-hover:text-purple-400' : 'text-stone-600 group-hover:text-purple-500'}`} />
                      </div>
                      <div>
                        <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-500'}`}>{method.label}</p>
                        <p className={`font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-stone-800 group-hover:text-purple-600'}`}>{method.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className={`rounded-3xl p-8 lg:p-10 ring-1 shadow-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-[#27272a] ring-white/10' : 'bg-white ring-stone-900/5'}`}>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>Name</label>
                  <Input placeholder="Your name" className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-[#18181b] border-stone-700 text-white placeholder:text-stone-500' : 'bg-stone-50 border-stone-200'}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>Email or WhatsApp</label>
                  <Input placeholder="How should I reach you?" className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-[#18181b] border-stone-700 text-white placeholder:text-stone-500' : 'bg-stone-50 border-stone-200'}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>Service</label>
                  <Select>
                    <SelectTrigger className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-[#18181b] border-stone-700 text-white' : 'bg-stone-50 border-stone-200'}`}>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Client Onboarding</SelectItem>
                      <SelectItem value="email">Email Management</SelectItem>
                      <SelectItem value="scheduling">Scheduling & Coordination</SelectItem>
                      <SelectItem value="tracking">Client Tracking Systems</SelectItem>
                      <SelectItem value="reporting">Operational Reporting</SelectItem>
                      <SelectItem value="community">Community Management</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>Message</label>
                  <Textarea placeholder="Tell me about your project..." className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-[#18181b] border-stone-700 text-white placeholder:text-stone-500' : 'bg-stone-50 border-stone-200'} min-h-[140px]`} />
                </div>
                <Button
                  type="submit"
                  className={`w-full rounded-full py-6 text-base font-medium transition-all duration-300 ${formStatus === "sent" ? "bg-green-500 hover:bg-green-600" : "bg-stone-900 hover:bg-stone-800"} text-white`}
                  disabled={formStatus !== "idle"}
                >
                  {formStatus === "idle" && (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                  {formStatus === "sending" && "Sending..."}
                  {formStatus === "sent" && (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Message Sent
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-10 px-8 border-t transition-colors duration-300 ${theme === 'dark' ? 'border-white/10' : 'border-stone-100'}`}>
        <div className={`max-w-6xl mx-auto text-center transition-colors duration-300 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>
          <p className="text-sm">© 2026 Maryam Ibrahim · Client Support & Operations Specialist · Kano, Nigeria</p>
        </div>
      </footer>

      {/* Floating Widgets */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/2348039888339"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${theme === 'dark' ? 'bg-[#25D366] hover:bg-[#20BD5A]' : 'bg-[#25D366] hover:bg-[#20BD5A]'}`}
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </a>
        
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${theme === 'dark' ? 'bg-[#27272a] hover:bg-purple-600 text-white border border-white/10' : 'bg-white hover:bg-purple-500 text-stone-800 border border-stone-200'} ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f0f12]/95 backdrop-blur-md"
          >
            {/* Close button - separate from the zoomable area */}
            <button 
              onClick={() => {
                setSelectedImage(null);
              }}
              className="absolute top-6 right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/10"
            >
              <X className="w-8 h-8" />
            </button>

            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-4 md:hidden">
                  <p className="text-stone-400 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3" /> Double tap to zoom & drag
                  </p>
                </div>

                <motion.div
                  drag
                  dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                  dragElastic={0.1}
                  whileTap={{ scale: 1.5 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={selectedImage}
                    alt="Project Preview"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain max-h-[80vh] rounded-lg shadow-2xl pointer-events-none"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}