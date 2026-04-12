"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  TrendingUp
} from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Tools", href: "#tools" },
  { name: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Handshake,
    title: "Client Onboarding",
    description: "7-step structured process ensuring seamless welcome, tracker entry, and consistent follow-up for every new client.",
  },
  {
    icon: Mail,
    title: "Inbox & Email Management",
    description: "Priority triage, response templates, and complaint handling to keep communications organized and professional.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Coordination",
    description: "Calendar management, session reminders, and trainer coordination to ensure no appointment is missed.",
  },
  {
    icon: BarChart3,
    title: "Client Tracking Systems",
    description: "Google Sheets dashboards with daily updates, status tracking, and real-time client information at your fingertips.",
  },
  {
    icon: FileText,
    title: "Operational Reporting",
    description: "Weekly comprehensive reports with metrics, challenges, and actionable recommendations for continuous improvement.",
  },
  {
    icon: MessageCircle,
    title: "Community Management",
    description: "WhatsApp and Telegram admin, group rules, moderation, and fostering engagement across platforms.",
  },
];

const tools = [
  { name: "Google Sheets", category: "Client Tracking", icon: BarChart3 },
  { name: "Google Calendar", category: "Scheduling", icon: Calendar },
  { name: "Gmail / Outlook", category: "Email Management", icon: Mail },
  { name: "WhatsApp", category: "Client Communication", icon: MessageCircle },
  { name: "Telegram", category: "Community", icon: MessageCircle },
  { name: "Microsoft Excel", category: "Reporting", icon: FileText },
  { name: "Zoom / Meet", category: "Virtual Sessions", icon: Zap },
  { name: "SOP Docs", category: "Process Writing", icon: FileText },
];

const workItems = [
  {
    title: "Weekly Operations Report",
    description: "Comprehensive metrics tracking 28 clients, 10 new onboardings, 18 follow-ups, and 12 sessions scheduled within a single week at XM Trading Academy.",
    image: "/images/Screenshot 2026-04-03 164728.png",
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
    image: "/images/Screenshot 2026-04-03 165131.png",
    tags: ["Inbox Triage", "Templates", "Priority Sorting"],
  },
  {
    title: "Client Onboarding SOP",
    description: "7-step documented process from initial contact to fully onboarded client, including welcome messages and tracker setup.",
    image: "/images/Screenshot 2026-04-03 164558.png",
    tags: ["7-Step Process", "Welcome Flow", "Documentation"],
  },
  {
    title: "Client Tracking Dashboard",
    description: "Real-time Google Sheets dashboard with daily updates, status tracking, and client information management.",
    image: "/images/Screenshot 2026-03-29 191541.png",
    tags: ["Google Sheets", "Live Dashboard", "Status Tracking"],
  },
];

const contactMethods = [
  { icon: Mail, label: "Email", value: "maryam.operations@gmail.com", href: "mailto:maryam.operations@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "+234 801 234 5678", href: "https://wa.me/2348012345678" },
  { icon: Zap, label: "Telegram", value: "@maryam_va", href: "https://t.me/maryam_va" },
  { icon: MapPin, label: "Location", value: "Kano, Nigeria", href: "#" },
];

const stats = [
  { value: 28, label: "Total Clients", icon: Users },
  { value: 10, label: "New Onboarded", icon: TrendingUp },
  { value: 18, label: "Follow-ups", icon: Clock },
  { value: 12, label: "Sessions", icon: Calendar },
];

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.2em] text-purple-500/70 mb-3 block">
      {children}
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
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
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#1a1a2e 1px, transparent 1px), linear-gradient(90deg, #1a1a2e 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-xl shadow-sm py-4" : "py-6"}`}>
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <a href="#" className="text-xl font-medium text-stone-800">
            Maryam <span className="text-purple-500 italic">Ibrahim</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-purple-500 ${activeSection === link.href.slice(1) ? "text-purple-500" : "text-stone-500"}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <Button className="hidden md:flex bg-stone-900 hover:bg-stone-800 text-white rounded-full px-6 text-sm">
            Hire Me
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-purple-600 font-medium">Virtual Assistant & Operations Coordinator</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-light leading-[1.1] text-stone-800" style={{ fontFamily: "var(--font-heading)" }}>
              Your operations, <span className="italic text-purple-400">handled.</span>
            </h1>
            
            <p className="text-lg text-stone-500 max-w-md leading-relaxed">
              I help businesses and entrepreneurs run smoothly by managing the details so you can focus on growth. From client onboarding to daily operations, I&apos;ve got you covered.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-6 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
                View My Work
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="ghost" className="text-stone-600 hover:text-purple-500 rounded-full px-8 py-6 text-sm font-medium">
                Let&apos;s Talk
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Main Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-violet-300 to-indigo-300 rounded-[2.5rem] blur-2xl opacity-40" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/IMG_6686.PNG"
                  alt="Maryam Abdullahi Ibrahim"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-5 shadow-xl border border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-light text-stone-800"><AnimatedCounter target={28} /></p>
                  <p className="text-xs text-stone-500">Clients Managed</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <p className="text-2xl font-light text-stone-800"><AnimatedCounter target={18} /></p>
                  <p className="text-xs text-stone-500">Follow-ups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div>
                <SectionLabel>About</SectionLabel>
                <h2 className="text-5xl lg:text-6xl font-light leading-tight text-stone-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Structured. Consistent. <span className="italic text-purple-400">Client-first.</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-stone-50 rounded-2xl p-6 text-center hover:bg-purple-50 transition-colors duration-300 cursor-default">
                    <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-3" />
                    <span className="text-4xl font-light text-stone-800 block">
                      <AnimatedCounter target={stat.value} />
                    </span>
                    <p className="text-sm text-stone-500 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6 pt-8">
              <p className="text-lg leading-relaxed text-stone-700">
                I&apos;m <strong className="text-stone-900">Maryam Abdullahi Ibrahim</strong>, a Virtual Assistant, Administrative Professional, and Operations Coordinator with a passion for making things run smoothly.
              </p>
              <p className="text-lg leading-relaxed text-stone-500">
                Currently working with <strong className="text-stone-700">XM Trading Academy in Kano</strong>, I&apos;ve built and documented real operational systems that keep things running — from client onboarding to weekly reporting. I bring structure to chaos and turn scattered workflows into smooth, repeatable processes.
              </p>
              <p className="text-lg leading-relaxed text-stone-500">
                My philosophy is simple: <em className="text-purple-500 font-medium">great operations are invisible.</em> When I do my job well, clients feel cared for, appointments are kept, and things simply work — without anyone noticing the machinery behind the scenes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Services</SectionLabel>
            <h2 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
              What I <span className="italic text-purple-400">do</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 hover:-translate-y-2 cursor-default group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-purple-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-stone-800" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-28 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Proof of Work</SectionLabel>
            <h2 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
              Recent <span className="italic text-purple-400">Projects</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {workItems.map((item, i) => (
              <div
                key={i}
                className={`group bg-stone-50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500 hover:-translate-y-2 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-medium mb-3 text-stone-800" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                  <p className="text-stone-500 mb-6 leading-relaxed">{item.description}</p>
                  
                  {item.stats && (
                    <div className="grid grid-cols-4 gap-4">
                      {item.stats.map((stat, j) => {
                        const StatIcon = stat.icon;
                        return (
                          <div key={j} className="bg-white rounded-xl p-4 text-center">
                            <StatIcon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                            <span className="text-xl font-light text-stone-800 block"><AnimatedCounter target={stat.value} /></span>
                            <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary" className="bg-purple-50 text-purple-600 rounded-full px-3">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-28 px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Tools</SectionLabel>
            <h2 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
              What I <span className="italic text-purple-400">use</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl text-center hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1 cursor-default group">
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-stone-700 mb-2">{tool.name}</h3>
                  <Badge variant="outline" className="border-stone-200 text-stone-500 text-xs rounded-full">{tool.category}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <SectionLabel>Contact</SectionLabel>
                <h2 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
                  Ready to work <span className="italic text-purple-400">together?</span>
                </h2>
              </div>
              <p className="text-lg text-stone-500 leading-relaxed">
                Whether you need help with daily operations, client management, or building systems from scratch — let&apos;s talk about how I can help your business run smoother.
              </p>
              
              <div className="space-y-4">
                {contactMethods.map((method, i) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={i}
                      href={method.href}
                      className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <Icon className="w-5 h-5 text-stone-600 group-hover:text-purple-500 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-500">{method.label}</p>
                        <p className="font-medium text-stone-800 group-hover:text-purple-600 transition-colors">{method.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-stone-50 rounded-3xl p-8 lg:p-10">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Name</label>
                  <Input placeholder="Your name" className="bg-white border-stone-200 rounded-xl py-6" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Email or WhatsApp</label>
                  <Input placeholder="How should I reach you?" className="bg-white border-stone-200 rounded-xl py-6" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Service</label>
                  <Select>
                    <SelectTrigger className="bg-white border-stone-200 rounded-xl py-6">
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
                  <label className="text-sm font-medium text-stone-700">Message</label>
                  <Textarea placeholder="Tell me about your project..." className="bg-white border-stone-200 rounded-xl min-h-[140px]" />
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
      <footer className="py-10 px-8 border-t border-stone-100">
        <div className="max-w-6xl mx-auto text-center text-stone-400">
          <p className="text-sm">© 2026 Maryam Abdullahi Ibrahim · Virtual Assistant & Operations Coordinator · Kano, Nigeria</p>
        </div>
      </footer>
    </div>
  );
}