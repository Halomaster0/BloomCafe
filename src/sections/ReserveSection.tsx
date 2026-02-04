import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Users, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface ReserveSectionProps {
  className?: string;
}

const ReserveSection = ({ className = '' }: ReserveSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          imageRef.current,
          { x: 50, opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          0.1
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className={`section-pinned bg-[#F7F6F2] ${className}`}
    >
      {/* Botanical Decoration */}
      <svg
        className="botanical-outline absolute right-0 top-1/2 -translate-y-1/2 w-[35vw] h-[60vh] text-[#013A1E]"
        viewBox="0 0 300 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250 50C200 100 150 150 180 250C210 350 280 400 250 500"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <ellipse cx="200" cy="200" rx="30" ry="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-[8vw] flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left Text Block */}
          <div
            ref={textRef}
            className="flex flex-col justify-center lg:pr-[6vw] w-full lg:w-[38vw]"
          >
            <h2 className="bloom-heading text-[clamp(36px,4vw,52px)] text-[#111C16] mb-6">
              Reserve a Table
            </h2>
            <p className="bloom-body text-base text-[#6B7A70] mb-8 leading-relaxed">
              Planning a meeting, date, or a quiet afternoon?
              Book ahead and we'll save your spot.
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bloom-button-primary w-fit flex items-center gap-2 group"
            >
              Book now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Image Card */}
          <div
            ref={imageRef}
            className="bloom-card w-full lg:w-[40vw] h-[40vh] lg:h-[56vh] flex-shrink-0 lg:ml-auto"
          >
            <img
              src="images/reserve_table.jpg"
              alt="Reserved table"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Reservation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#F7F6F2] border-none rounded-[28px] max-w-md">
          <DialogHeader>
            <DialogTitle className="bloom-heading text-2xl text-[#111C16]">
              Reserve Your Table
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#013A1E]/5">
              <Calendar className="w-5 h-5 text-[#013A1E]" />
              <span className="bloom-body text-sm text-[#111C16]">Select date</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#013A1E]/5">
              <Clock className="w-5 h-5 text-[#013A1E]" />
              <span className="bloom-body text-sm text-[#111C16]">Select time</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#013A1E]/5">
              <Users className="w-5 h-5 text-[#013A1E]" />
              <span className="bloom-body text-sm text-[#111C16]">Number of guests</span>
            </div>
            <Button
              className="w-full bg-[#013A1E] hover:bg-[#025c30] text-[#F7F6F2] rounded-full py-6"
              onClick={() => setIsDialogOpen(false)}
            >
              Confirm Reservation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ReserveSection;
