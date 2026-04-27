import Link from "next/link";
import BookingSection from "../components/BookingSection";
import EventsSection from "../components/EventsSection";
import HeroLayout from "../components/HeroLayout";
import { combos } from "../utils/combos";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pt-4">
      <HeroLayout />
      <EventsSection />
      {/* MENU Section preview */}
      <section
        id="menu-section"
        className="w-full border-8 border-double border-vintage-brown/80 mt-6 relative bg-transparent rounded-3xl">
        <div className="border-[3px] border-vintage-brown/80 p-6 pt-10 pb-8 bg-transparent relative rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-4">
            {combos.slice(0, 4).map((combo) => (
              <Link
                href={`/menu/${combo.id}`}
                key={combo.id}
                className="group focus:outline-none block">
                <div className="flex border-b border-dashed border-vintage-brown pb-4 group-hover:bg-white/40 transition-colors p-2 -mx-2 rounded-xl">
                  <div className="w-24 h-24 bg-black/10 flex-shrink-0 border-2 border-vintage-brown rounded-xl overflow-hidden relative">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="pl-4 flex flex-col justify-center w-full min-w-0">
                    <div className="md:flex justify-between items-end border-b border-dotted border-vintage-brown pb-1 gap-2">
                      <h4 className="font-bold text-sm md:text-lg font-sans text-vintage-brown group-hover:text-[#a3381a] transition-colors truncate">
                        {combo.title}
                      </h4>
                      <span className="font-bold text-accent-red font-mono whitespace-nowrap">
                        {combo.price}đ
                      </span>
                    </div>
                    <p className="text-sm font-sans mt-1 italic text-vintage-brown/80 line-clamp-2">
                      {combo.ingredients.join(", ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/menu">
              <button className="bg-vintage-yellow text-vintage-brown border-2 border-vintage-brown px-8 py-3 font-bold tracking-widest uppercase hover:bg-yellow-400 transition-colors shadow-[4px_4px_0_rgba(62,39,35,1)] rounded-full">
                XEM TOÀN BỘ THỰC ĐƠN
              </button>
            </Link>
          </div>
        </div>
      </section>
      <BookingSection />
    </div>
  );
}
