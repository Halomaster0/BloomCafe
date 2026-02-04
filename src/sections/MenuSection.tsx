import { useLayoutEffect, useRef, useState, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Plus, ShoppingBag, ChevronRight } from 'lucide-react';
import { MENU_DATA, TOP_LEVEL_CATEGORIES } from '../constants/menuData';
import type { TopLevelCategory } from '../constants/menuData';
import { useCart } from '../CartContext';

gsap.registerPlugin(ScrollTrigger);

interface MenuSectionProps {
  className?: string;
  isOpenInitial?: boolean;
}

const MenuSection = ({ className = '' }: MenuSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const [activeTopCategory, setActiveTopCategory] = useState<TopLevelCategory | null>(null);
  const { addToCart, cart, subtotal, setIsMenuOpen, setIsCartModalOpen } = useCart();

  const topCategories = Object.keys(TOP_LEVEL_CATEGORIES) as TopLevelCategory[];

  // Sync modal state with global context
  useEffect(() => {
    setIsMenuOpen(!!activeTopCategory);
    if (activeTopCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeTopCategory, setIsMenuOpen]);

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
        { x: 50, opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          textRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          pillsRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
          0.3
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const topLevelData = useMemo(() => {
    if (!activeTopCategory) return [];
    const subCats = TOP_LEVEL_CATEGORIES[activeTopCategory];
    return subCats.map(subCat => ({
      name: subCat,
      items: MENU_DATA.filter(item => item.category === subCat)
    })).filter(group => group.items.length > 0);
  }, [activeTopCategory]);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className={`section-pinned bg-[#F7F6F2] ${className}`}
    >
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-[8vw] flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-0">
          <div
            ref={textRef}
            className="flex flex-col justify-center lg:pr-[6vw] w-full lg:w-[45vw]"
          >
            <h2 className="bloom-heading text-[clamp(40px,5vw,64px)] text-[#111C16] mb-6">
              Our Menu
            </h2>
            <p className="bloom-body text-base text-[#6B7A70] mb-10 leading-relaxed max-w-lg">
              A curated journey through flavors, from traditional Arabic coffee and
              appetizers to our signature shisha "Cloud" experience.
            </p>

            <div ref={pillsRef} className="flex flex-wrap gap-4">
              {topCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTopCategory(cat)}
                  className="group flex items-center justify-between gap-6 px-8 py-5 rounded-2xl border border-[#013A1E]/10 hover:border-[#013A1E] hover:bg-[#013A1E] transition-all duration-300 bg-white min-w-[160px]"
                >
                  <span className="bloom-body text-sm font-bold text-[#111C16] group-hover:text-[#F7F6F2] transition-colors whitespace-nowrap uppercase tracking-wider">
                    {cat}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#013A1E]/30 group-hover:text-[#F7F6F2] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div
            ref={imageRef}
            className="bloom-card w-full lg:w-[35vw] h-[40vh] lg:h-[60vh] flex-shrink-0 lg:ml-auto"
          >
            <img
              src="images/menu_pastries.jpg"
              alt="Pastries and coffee"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {activeTopCategory && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#013A1E]/70 backdrop-blur-md p-4 lg:p-8 animate-in fade-in duration-300">
          <div className="bg-[#F7F6F2] w-full max-w-4xl h-[85vh] rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setActiveTopCategory(null)}
              className="absolute top-8 right-8 z-10 p-3 rounded-full bg-[#111C16]/5 hover:bg-[#111C16]/10 transition-colors"
            >
              <X className="w-6 h-6 text-[#111C16]" />
            </button>

            <div className="p-8 lg:p-12 border-b border-[#013A1E]/5">
              <h3 className="bloom-heading text-4xl lg:text-5xl text-[#111C16]">
                {activeTopCategory}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
              {topLevelData.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-6">
                  <div className="py-2">
                    <h4 className="bloom-heading text-2xl text-[#013A1E] border-b border-[#013A1E]/10 pb-2">
                      {group.name}
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {group.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center group py-4 px-6 rounded-2xl hover:bg-[#013A1E]/5 transition-colors"
                      >
                        <div className="flex-1">
                          <h5 className="bloom-body font-bold text-lg text-[#111C16]">{item.name}</h5>
                          {item.description && <p className="bloom-body text-sm text-[#6B7A70] mt-1">{item.description}</p>}
                          <span className="bloom-body text-sm font-medium text-[#013A1E] mt-2 block">${item.price.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="ml-6 w-12 h-12 rounded-full bg-[#013A1E] flex items-center justify-center text-[#F7F6F2] hover:bg-[#D4A72C] hover:text-[#111C16] transition-all transform hover:scale-110 active:scale-90"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="p-8 lg:px-12 py-8 bg-white border-t border-[#013A1E]/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ShoppingBag className="w-6 h-6 text-[#111C16]" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D4A72C] text-[#111C16] text-[10px] font-bold flex items-center justify-center">
                      {cart.reduce((acc, i) => acc + i.quantity, 0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold mb-1">Subtotal</p>
                    <p className="bloom-body text-xl font-bold text-[#111C16]">${subtotal.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTopCategory(null);
                    setIsCartModalOpen(true);
                  }}
                  className="bloom-button-primary bg-[#013A1E] px-8 py-4 rounded-full text-[#F7F6F2] hover:bg-[#D4A72C] hover:text-[#111C16] transition-colors"
                >
                  View Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuSection;
