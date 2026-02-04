import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VisitSectionProps {
  className?: string;
}

const VisitSection = ({ className = '' }: VisitSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-flowing bg-[#F7F6F2] py-20 lg:py-32 ${className}`}
    >
      {/* Botanical Decoration */}
      <svg
        className="botanical-outline absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] h-[50vh] text-[#013A1E]"
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

      <div className="relative z-10 w-full px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left Image Card */}
          <div
            ref={imageRef}
            className="bloom-card w-full lg:w-[40vw] h-[40vh] lg:h-[56vh] flex-shrink-0"
          >
            <img
              src="/images/visit_exterior.jpg"
              alt="Cafe exterior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Info Block */}
          <div
            ref={infoRef}
            className="flex flex-col justify-center lg:pl-[6vw] w-full lg:w-[38vw]"
          >
            <span className="bloom-label text-[#D4A72C] mb-4">Visit</span>
            <h2 className="bloom-heading text-[clamp(36px,4vw,52px)] text-[#111C16] mb-8">
              Come say hello.
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="w-5 h-5 text-[#013A1E] mt-1 flex-shrink-0" />
              <div>
                <p className="bloom-body text-base text-[#111C16]">
                  123 Lakeshore Road East
                </p>
                <p className="bloom-body text-base text-[#6B7A70]">
                  Mississauga, ON
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 mb-8">
              <Clock className="w-5 h-5 text-[#013A1E] mt-1 flex-shrink-0" />
              <div>
                <p className="bloom-body text-base text-[#111C16]">
                  Mon–Fri: 7am–6pm
                </p>
                <p className="bloom-body text-base text-[#111C16]">
                  Sat–Sun: 8am–7pm
                </p>
              </div>
            </div>

            {/* Directions Link */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bloom-body text-sm text-[#013A1E] hover:text-[#D4A72C] transition-colors group"
            >
              Get directions
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSection;
