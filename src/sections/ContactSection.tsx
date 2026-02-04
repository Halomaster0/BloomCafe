import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Phone, Mail, Instagram, Facebook, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

interface Toast {
  id: string;
  title: string;
  description?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [toasts, setToasts] = useState<Toast[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        textRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          formRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          0.2
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const showToast = (title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Message sent!", "We'll get back to you within 24 hours.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`section-flowing bg-[#013A1E] py-20 lg:py-32 ${className}`}
    >
      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-[1001] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-[#F7F6F2] text-[#111C16] rounded-2xl px-6 py-4 shadow-lg min-w-[300px] animate-in slide-in-from-bottom-4 fade-in duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="bloom-body text-sm font-medium">{toast.title}</p>
                {toast.description && (
                  <p className="bloom-body text-xs text-[#6B7A70] mt-1">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-[#111C16]/60 hover:text-[#111C16] transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botanical Decoration */}
      <svg
        className="absolute right-0 top-0 w-[40vw] h-full text-[#025c30] opacity-30"
        viewBox="0 0 400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M350 50C300 100 250 150 280 250C310 350 380 400 350 500C320 600 200 580 150 550"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <ellipse cx="280" cy="200" rx="40" ry="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <ellipse cx="320" cy="350" rx="30" ry="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>

      <div className="relative z-10 w-full px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
          {/* Left Text Block */}
          <div
            ref={textRef}
            className="flex flex-col justify-center lg:pr-[6vw] w-full lg:w-[40vw]"
          >
            <h2 className="bloom-heading text-[clamp(36px,4vw,52px)] text-[#F7F6F2] mb-6">
              Let's talk.
            </h2>
            <p className="bloom-body text-base text-[#F7F6F2]/70 mb-10 leading-relaxed">
              Questions, feedback, or a big idea? Send us a note—we read every message.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-[#D4A72C]" />
                <span className="bloom-body text-sm text-[#F7F6F2]/80">
                  123 Lakeshore Road East, Mississauga, ON
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#D4A72C]" />
                <span className="bloom-body text-sm text-[#F7F6F2]/80">
                  (905) 555-0123
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#D4A72C]" />
                <span className="bloom-body text-sm text-[#F7F6F2]/80">
                  hello@thebloomcoffee.ca
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F7F6F2]/10 flex items-center justify-center hover:bg-[#D4A72C] transition-colors"
              >
                <Instagram className="w-5 h-5 text-[#F7F6F2]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F7F6F2]/10 flex items-center justify-center hover:bg-[#D4A72C] transition-colors"
              >
                <Facebook className="w-5 h-5 text-[#F7F6F2]" />
              </a>
            </div>
          </div>

          {/* Right Form Card */}
          <div
            ref={formRef}
            className="w-full lg:w-[38vw] lg:ml-auto"
          >
            <div className="rounded-[28px] bg-[#F7F6F2]/5 border border-[#F7F6F2]/10 p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="bloom-body text-xs text-[#F7F6F2]/60 mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F6F2]/10 border border-[#F7F6F2]/20 bloom-body text-sm text-[#F7F6F2] placeholder:text-[#F7F6F2]/40 focus:outline-none focus:border-[#D4A72C] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="bloom-body text-xs text-[#F7F6F2]/60 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F6F2]/10 border border-[#F7F6F2]/20 bloom-body text-sm text-[#F7F6F2] placeholder:text-[#F7F6F2]/40 focus:outline-none focus:border-[#D4A72C] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="bloom-body text-xs text-[#F7F6F2]/60 mb-2 block">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F6F2]/10 border border-[#F7F6F2]/20 bloom-body text-sm text-[#F7F6F2] placeholder:text-[#F7F6F2]/40 focus:outline-none focus:border-[#D4A72C] transition-colors resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#D4A72C] hover:bg-[#e5b83d] text-[#111C16] rounded-full py-6 flex items-center justify-center gap-2"
                >
                  Send message
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[#F7F6F2]/10">
          <p className="bloom-body text-xs text-[#F7F6F2]/40 text-center">
            © The Bloom Coffee. 123 Lakeshore Road East, Mississauga, ON.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
