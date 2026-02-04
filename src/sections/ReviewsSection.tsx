import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ReviewsSectionProps {
  className?: string;
}

const ReviewsSection = ({ className = '' }: ReviewsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          cardsRef.current?.children || [],
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8 },
          0.2
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      name: 'Amina',
      avatar: '/images/avatar_amina.jpg',
      quote: 'The calmest coffee spot in the city.',
      rating: 5,
    },
    {
      name: 'Jared',
      avatar: '/images/avatar_jared.jpg',
      quote: 'They remembered my order on the second visit.',
      rating: 5,
    },
    {
      name: 'Priya',
      avatar: '/images/avatar_priya.jpg',
      quote: 'Perfect for slow mornings and deep work.',
      rating: 5,
    },
  ];

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
          What guests are saying
        </h2>

        {/* Review Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bloom-card bg-white p-6 lg:p-8 w-full lg:w-[28vw] ${index === 1 ? 'lg:-mt-4' : ''
                }`}
            >
              {/* Avatar and Name */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="bloom-body text-sm font-medium text-[#111C16]">
                    {review.name}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-[#D4A72C] text-[#D4A72C]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="bloom-heading text-xl lg:text-2xl text-[#111C16] leading-snug">
                "{review.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
