import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QrCode, CreditCard, Truck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TableOrderSectionProps {
  className?: string;
}

const TableOrderSection = ({ className = '' }: TableOrderSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const [tableId, setTableId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) setTableId(table);
  }, []);

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
        imageRef.current,
        { x: -50, opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          textRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          featuresRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
          0.3
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleOpenMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { icon: QrCode, text: 'Scan to order' },
    { icon: CreditCard, text: 'Pay securely' },
    { icon: Truck, text: 'We deliver to your table' },
  ];

  return (
    <section
      ref={sectionRef}
      id="order"
      className={`section-flowing bg-[#F7F6F2] py-20 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-[8vw] flex flex-col lg:row items-center gap-12 lg:gap-20">
        <div
          ref={imageRef}
          className="bloom-card w-full lg:w-[45vw] h-[50vh] flex-shrink-0"
        >
          <img
            src="images/table_order.jpg"
            alt="Table QR ordering"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={textRef}
          className="flex flex-col justify-center w-full lg:w-[45vw]"
        >
          <h2 className="bloom-heading text-[clamp(40px,5vw,64px)] text-[#111C16] mb-6">
            {tableId ? `Ordering for Table ${tableId}` : 'Table Ordering'}
          </h2>
          <p className="bloom-body text-lg text-[#6B7A70] mb-10 leading-relaxed">
            {tableId
              ? "You're all set. Browse the complete menu and your order will be delivered directly to your seat."
              : "Scan, order, and pay from your table—no app required. We'll bring everything to you."
            }
          </p>

          <div ref={featuresRef} className="flex flex-col gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-[#013A1E]/5 flex items-center justify-center group-hover:bg-[#013A1E] transition-colors">
                  <feature.icon className="w-6 h-6 text-[#013A1E] group-hover:text-[#F7F6F2] transition-colors" />
                </div>
                <span className="bloom-body text-base font-medium text-[#111C16]">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleOpenMenu}
            className="bloom-button-primary w-fit flex items-center gap-3 group px-10 py-5 bg-[#013A1E] text-[#F7F6F2] rounded-full hover:bg-[#D4A72C] hover:text-[#111C16] transition-all"
          >
            Order Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TableOrderSection;
