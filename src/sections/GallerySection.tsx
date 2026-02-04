import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = ({ className = '' }: { className?: string }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                gridRef.current?.children || [],
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    const items = [
        { src: 'images/gallery1.jpg', span: 'col-span-2 row-span-2' },
        { src: 'images/gallery2.jpg', span: 'col-span-1 row-span-1' },
        { src: 'images/gallery3.jpg', span: 'col-span-1 row-span-1' },
        { src: 'images/gallery4.jpg', span: 'col-span-1 row-span-2' },
        { src: 'images/gallery5.jpg', span: 'col-span-1 row-span-1' },
    ];

    return (
        <section id="gallery" ref={sectionRef} className={`section-pinned bg-[#FDFDFC] ${className}`}>
            <div className="w-full h-full px-6 lg:px-[8vw] py-20 flex flex-col">
                <h2 className="bloom-heading text-[clamp(40px,5vw,64px)] text-[#111C16] mb-12 text-center">
                    The Gallery
                </h2>

                <div
                    ref={gridRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 flex-grow aspect-video lg:aspect-auto"
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`bloom-card ${item.span} relative group cursor-pointer`}
                        >
                            <img
                                src={item.src}
                                alt={`Gallery image ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#013A1E]/0 group-hover:bg-[#013A1E]/10 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
