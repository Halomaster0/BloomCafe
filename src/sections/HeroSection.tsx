import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.85, y: -12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9 }
      )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0 },
          0.15
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        )
        .fromTo(
          [subheadlineRef.current, ctaRef.current],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.6
        );

      // Scroll-driven exit animation (parrallax effect instead of pinning)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Simple parallax and fade
      scrollTl
        .to(
          logoRef.current,
          { y: -100, opacity: 0, ease: 'none' },
          0
        )
        .to(
          [headlineRef.current, subheadlineRef.current, ctaRef.current],
          { y: -50, opacity: 0, ease: 'none' },
          0
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`section-pinned relative overflow-hidden bg-[#013A1E] ${className}`}
    >
      {/* Premium Video/Cinemagraph Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dimmer overlay */}
        <img
          src="/images/IMG_9064.jpeg"
          className="w-full h-full object-cover opacity-60 scale-105"
          alt="Lounge Background"
        />
        {/* Placeholder for future video:
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/hero_cinemagraph.mp4" type="video/mp4" />
        </video>
        */}
      </div>

      {/* Botanical Background Decoration */}
      <svg
        className="botanical-outline absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[80vh] text-[#F7F6F2] z-10"
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
      </svg>

      <div className="relative z-20 flex flex-col items-center justify-center w-full px-6">
        {/* Logo Mark */}
        <div
          ref={logoRef}
          className="mb-8 w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[#F7F6F2]/30 flex items-center justify-center backdrop-blur-sm shadow-2xl"
        >
          <svg
            viewBox="0 0 40 40"
            className="w-12 h-12 lg:w-16 lg:h-16 text-[#F7F6F2]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M20 5C20 5 10 15 10 25C10 32 14 35 20 35C26 35 30 32 30 25C30 15 20 5 20 5Z" />
            <path d="M20 15C20 15 15 20 15 25C15 28 17 30 20 30C23 30 25 28 25 25C25 20 20 15 20 15Z" />
          </svg>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="bloom-heading text-[clamp(48px,8.5vw,96px)] text-[#FDFDFC] text-center mb-6 drop-shadow-lg leading-none"
        >
          The Bloom Coffee
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="bloom-body text-base lg:text-xl text-[#F7F6F2]/90 text-center max-w-lg mb-10 leading-relaxed font-light"
        >
          Experience premium Arabic hospitality in a botanical sanctuary.
          Sip, scroll, and find your calm in the heart of Mississauga.
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#menu"
          onClick={(e) => {
            e.preventDefault();
            scrollToMenu();
          }}
          className="group flex flex-col items-center gap-3 bloom-body text-xs font-medium text-[#F7F6F2] hover:text-[#D4A72C] transition-colors"
        >
          Explore the Majlis
          <div className="w-10 h-16 rounded-full border border-[#F7F6F2]/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#D4A72C] rounded-full animate-bounce mt-1" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
