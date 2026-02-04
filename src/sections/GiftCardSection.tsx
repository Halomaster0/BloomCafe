import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Mail, Store } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface GiftCardSectionProps {
  className?: string;
}

const GiftCardSection = ({ className = '' }: GiftCardSectionProps) => {
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
          textRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          imageRef.current,
          { x: '55vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.05
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          textRef.current,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
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
              Gift Cards
            </h2>
            <p className="bloom-body text-base text-[#6B7A70] mb-8 leading-relaxed">
              Give the Bloom experience. Available in any amount—delivered
              digitally or in-store.
            </p>

            {/* Delivery Options */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#013A1E]/5">
                <Mail className="w-4 h-4 text-[#013A1E]" />
                <span className="bloom-body text-xs text-[#111C16]">Digital</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#013A1E]/5">
                <Store className="w-4 h-4 text-[#013A1E]" />
                <span className="bloom-body text-xs text-[#111C16]">In-store</span>
              </div>
            </div>

            <button
              onClick={() => setIsDialogOpen(true)}
              className="bloom-button-gold w-fit flex items-center gap-2 group"
            >
              Buy a gift card
              <Gift className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Right Image Card */}
          <div
            ref={imageRef}
            className="bloom-card w-full lg:w-[40vw] h-[40vh] lg:h-[56vh] flex-shrink-0 lg:ml-auto"
          >
            <img
              src="images/gift_card.jpg"
              alt="Gift card"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Gift Card Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#F7F6F2] border-none rounded-[28px] max-w-md">
          <DialogHeader>
            <DialogTitle className="bloom-heading text-2xl text-[#111C16]">
              Purchase Gift Card
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="bloom-body text-sm text-[#6B7A70]">
              Choose an amount and delivery method.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['$25', '$50', '$100'].map((amount) => (
                <button
                  key={amount}
                  className="px-4 py-3 rounded-xl bg-[#013A1E]/5 hover:bg-[#013A1E] hover:text-[#F7F6F2] transition-colors bloom-body text-sm text-[#111C16]"
                >
                  {amount}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#013A1E]/5 hover:bg-[#013A1E]/10 transition-colors">
                <Mail className="w-4 h-4 text-[#013A1E]" />
                <span className="bloom-body text-xs text-[#111C16]">Digital</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#013A1E]/5 hover:bg-[#013A1E]/10 transition-colors">
                <Store className="w-4 h-4 text-[#013A1E]" />
                <span className="bloom-body text-xs text-[#111C16]">Physical</span>
              </button>
            </div>
            <Button
              className="w-full bg-[#D4A72C] hover:bg-[#e5b83d] text-[#111C16] rounded-full py-6"
              onClick={() => setIsDialogOpen(false)}
            >
              Continue to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GiftCardSection;
