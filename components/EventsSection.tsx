import Link from 'next/link';
import { events } from '../utils/events';

export default function EventsSection() {
    return (
        <section id="events-section" className="w-full border-8 border-double border-vintage-brown/80 mt-6 relative bg-transparent rounded-3xl">
            {/* Inner Border container */}
            <div className="border-[3px] border-vintage-brown/80 p-6 pt-10 pb-8 bg-transparent relative rounded-2xl">
                {/* Header */}
                <div className="flex flex-col items-center mb-10 relative ">
                    <span className="text-[#c62828] font-bold uppercase tracking-[0.2em] text-sm md:text-lg mb-1 drop-shadow-sm font-sans text-center">
                        SỰ KIỆN MỚI TỪ
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.1em] text-center drop-shadow-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                        BÚN CHÚ BÉO
                    </h2>
                    {/* Decorative line below title */}
                    <div className="flex items-center w-48 justify-center mt-4">
                        <div className="h-[3px] bg-vintage-green flex-1 rounded-full"></div>
                        <div className="w-4 h-4 bg-vintage-green transform rotate-45 border border-[#dfd3b8] shadow-sm rounded-sm"></div>
                        <div className="h-[3px] bg-vintage-green flex-1 rounded-full"></div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex flex-col gap-3">
                            <div className="w-full aspect-[4/3] bg-black/10 border-2 border-vintage-brown/40 relative shadow-sm overflow-hidden flex items-center justify-center rounded-2xl">
                                <img src={event.thumbnail} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold uppercase leading-tight font-sans">
                                {event.title}
                            </h3>
                            <p className="font-sans text-[15px] leading-relaxed font-medium line-clamp-3">
                                {event.shortDesc}
                            </p>
                            <Link href={`/events/${event.id}`} className="font-bold text-sm mt-auto hover:text-accent-red tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                                XEM TIẾP
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
