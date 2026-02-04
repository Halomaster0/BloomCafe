import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DailyBrewSectionProps {
  className?: string;
}

const DailyBrewSection = ({ className = '' }: DailyBrewSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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
        )
        .fromTo(
          [labelRef.current, headlineRef.current],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.08
        );

      // SETTLE (30% - 70%) - elements hold position

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
      id="daily-brew"
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
        <path
          d="M80 420C120 380 160 340 140 260C120 180 60 140 80 80"
          stroke="currentColor"
          strokeWidth="0.5"
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
              src="/images/daily_brew_latte.jpg"
              alt="Golden Latte"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text Block */}
          <div
            ref={textRef}
            className="flex flex-col justify-center lg:pl-[6vw] w-full lg:w-[38vw]"
          >
            <span
              ref={labelRef}
              className="bloom-label text-[#D4A72C] mb-4"
            >
              Today's Pick
            </span>
            <h2
              ref={headlineRef}
              className="bloom-heading text-[clamp(36px,4vw,52px)] text-[#111C16] mb-6"
            >
              Golden Latte
            </h2>
            <p className="bloom-body text-base text-[#6B7A70] mb-8 leading-relaxed">
              Espresso steamed with turmeric, cinnamon, and a touch of honey. 
              Warm, earthy, and just sweet enough.
            </p>
            <button className="bloom-button-primary w-fit flex items-center gap-2 group">
              Order now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyBrewSection;
