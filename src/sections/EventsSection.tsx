import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, Wine, Cake } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface EventsSectionProps {
  className?: string;
}

const EventsSection = ({ className = '' }: EventsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          imageRef.current,
          { x: '-55vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(
          textRef.current,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          textRef.current,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-pinned bg-[#F7F6F2] ${className}`}
    >
      {/* Botanical Decoration */}
      <svg
        className="botanical-outline absolute left-0 top-1/2 -translate-y-1/2 w-[35vw] h-[60vh] text-[#013A1E]"
        viewBox="0 0 300 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 450C100 400 150 350 120 250C90 150 20 100 50 50"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <ellipse cx="120" cy="300" rx="35" ry="50" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-[8vw] flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left Image Card */}
          <div
            ref={imageRef}
            className="bloom-card w-full lg:w-[40vw] h-[40vh] lg:h-[56vh] flex-shrink-0"
          >
            <img
              src="images/events_gathering.jpg"
              alt="Private event"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text Block */}
          <div
            ref={textRef}
            className="flex flex-col justify-center lg:pl-[6vw] w-full lg:w-[38vw]"
          >
            <h2 className="bloom-heading text-[clamp(36px,4vw,52px)] text-[#111C16] mb-6">
              Events & Private Hire
            </h2>
            <p className="bloom-body text-base text-[#6B7A70] mb-8 leading-relaxed">
              Host your next celebration with us. We offer custom menus,
              dedicated service, and a warm, botanical setting.
            </p>

            {/* Event Types */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#013A1E]/5">
                <Users className="w-4 h-4 text-[#013A1E]" />
                <span className="bloom-body text-xs text-[#111C16]">Corporate</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#013A1E]/5">
                <Wine className="w-4 h-4 text-[#013A1E]" />
                <span className="bloom-body text-xs text-[#111C16]">Celebrations</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#013A1E]/5">
                <Cake className="w-4 h-4 text-[#013A1E]" />
                <span className="bloom-body text-xs text-[#111C16]">Birthdays</span>
              </div>
            </div>

            <button
              onClick={() => setIsDialogOpen(true)}
              className="bloom-button-primary w-fit flex items-center gap-2 group"
            >
              Request a quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Quote Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#F7F6F2] border-none rounded-[28px] max-w-md">
          <DialogHeader>
            <DialogTitle className="bloom-heading text-2xl text-[#111C16]">
              Request a Quote
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="bloom-body text-sm text-[#6B7A70]">
              Tell us about your event and we'll get back to you within 24 hours.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border-none bloom-body text-sm text-[#111C16] placeholder:text-[#6B7A70]"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border-none bloom-body text-sm text-[#111C16] placeholder:text-[#6B7A70]"
              />
              <textarea
                placeholder="Tell us about your event"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border-none bloom-body text-sm text-[#111C16] placeholder:text-[#6B7A70] resize-none"
              />
            </div>
            <Button
              className="w-full bg-[#013A1E] hover:bg-[#025c30] text-[#F7F6F2] rounded-full py-6"
              onClick={() => setIsDialogOpen(false)}
            >
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventsSection;
