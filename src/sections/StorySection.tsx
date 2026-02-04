import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  className?: string;
}

const StorySection = ({ className = '' }: StorySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

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
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          [leftCardRef.current, centerCardRef.current, rightCardRef.current],
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
          0.2
        )
        .fromTo(
          bodyRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.4
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-flowing bg-[#F7F6F2] py-20 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="bloom-heading text-[clamp(36px,4vw,52px)] text-[#111C16] text-center mb-16"
        >
          Our Story
        </h2>

        {/* Image Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-16">
          {/* Left Card */}
          <div
            ref={leftCardRef}
            className="bloom-card w-full lg:w-[26vw] h-[35vh] lg:h-[44vh]"
          >
            <img
              src="/images/story_roast.jpg"
              alt="Coffee roasting"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Card (Largest) */}
          <div
            ref={centerCardRef}
            className="bloom-card w-full lg:w-[30vw] h-[40vh] lg:h-[52vh]"
          >
            <img
              src="/images/story_pourover.jpg"
              alt="Pourover coffee"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Card */}
          <div
            ref={rightCardRef}
            className="bloom-card w-full lg:w-[26vw] h-[35vh] lg:h-[44vh]"
          >
            <img
              src="/images/story_team.jpg"
              alt="Barista service"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Body Text */}
        <p
          ref={bodyRef}
          className="bloom-body text-base lg:text-lg text-[#6B7A70] text-center max-w-2xl mx-auto leading-relaxed"
        >
          The Bloom Coffee started with a simple idea: great coffee should feel like a deep breath.
          We source seasonally, roast thoughtfully, and serve with care—right here in Mississauga.
        </p>
      </div>
    </section>
  );
};

export default StorySection;
