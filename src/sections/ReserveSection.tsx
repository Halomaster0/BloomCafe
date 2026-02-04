import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

interface ReserveSectionProps {
  className?: string;
}

const ReserveSection = ({ className = '' }: ReserveSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    guests: '2',
    date: '',
    time: ''
  });

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

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('reservations')
      .insert([
        {
          name: reservationData.name,
          email: reservationData.email,
          guests: parseInt(reservationData.guests),
          date: reservationData.date,
          time: reservationData.time,
          status: 'confirmed'
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Reservation error:', error);
      alert('Failed to book reservation. Please try again.');
    } else {
      alert('Reservation confirmed! We look forward to seeing you.');
      setIsDialogOpen(false);
      setReservationData({ name: '', email: '', guests: '2', date: '', time: '' });
    }
  };

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
        <DialogContent className="bg-[#F7F6F2] border-none rounded-[28px] max-w-md p-8 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="bloom-heading text-2xl text-[#111C16] mb-4">
              Reserve Your Table
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReserve} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold px-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Ex. John Doe"
                className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border border-transparent focus:border-[#D4A72C] focus:outline-none bloom-body text-sm transition-all"
                value={reservationData.name}
                onChange={e => setReservationData({ ...reservationData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold px-1">Email</label>
              <input
                type="email"
                required
                placeholder="Ex. john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border border-transparent focus:border-[#D4A72C] focus:outline-none bloom-body text-sm transition-all"
                value={reservationData.email}
                onChange={e => setReservationData({ ...reservationData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold px-1">Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border border-transparent focus:border-[#D4A72C] focus:outline-none bloom-body text-sm transition-all"
                  value={reservationData.date}
                  onChange={e => setReservationData({ ...reservationData, date: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold px-1">Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border border-transparent focus:border-[#D4A72C] focus:outline-none bloom-body text-sm transition-all"
                  value={reservationData.time}
                  onChange={e => setReservationData({ ...reservationData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-[#6B7A70] font-bold px-1">Number of Guests</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-[#013A1E]/5 border border-transparent focus:border-[#D4A72C] focus:outline-none bloom-body text-sm transition-all"
                value={reservationData.guests}
                onChange={e => setReservationData({ ...reservationData, guests: e.target.value })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#013A1E] hover:bg-[#D4A72C] text-[#F7F6F2] hover:text-[#111C16] rounded-full py-6 font-bold transition-all mt-4"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Reservation'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ReserveSection;
