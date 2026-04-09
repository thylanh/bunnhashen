import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BookingSection from '../../components/BookingSection';
import { events } from '../../utils/data';

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const eventId = Number(id);
  
  const event = events.find(e => e.id === eventId) || events[0];
  
  if (!event) return null;

  return (
    <div className="flex flex-col pt-4 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <Head>
        <title>{event.title} - Bún Đậu Chú Béo</title>
      </Head>

      <div className="mb-16">
        <Link href="/#events-section" className="text-[#4a2e19] hover:text-[#a93c24] font-bold text-sm tracking-widest uppercase transition-colors inline-flex items-center gap-2 border-b-2 border-transparent hover:border-[#a93c24] pb-0.5" style={{ fontFamily: 'var(--font-sans)' }}>
           <span>← Về trang chủ</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start pt-2">
        
        {/* Left Column: Main Article (3/4 width) */}
        <fieldset className="lg:col-span-3 border-[4px] border-solid border-[#4a2e19] shadow-[4px_4px_0_rgba(62,39,35,0.15)] relative p-1.5 pt-0 min-w-0 m-0">
          {/* Timestamp Tag Overlay (Top Left) - VISIBLE ON OUTER RING */}
          <legend className="ml-4 md:ml-6 px-3 flex gap-2 items-center leading-none pointer-events-none sticky top-0">
             <div className="font-extrabold text-4xl md:text-[52px] tracking-tighter text-[#4a2e19] pointer-events-auto" style={{ fontFamily: 'var(--font-heading)' }}>
              {event.date.split(' ')[0]}/{event.date.split(' ')[2]}
             </div>
          </legend>
          <fieldset className="md:p-10 relative min-w-0 h-full mb-1 m-0">
            {/* INVISIBLE GAP MAKER FOR INNER RING */}
            <legend className="ml-4 md:ml-6 px-3 flex gap-2 items-center leading-none opacity-0 pointer-events-none select-none">
               <div className="font-extrabold text-4xl md:text-[52px] tracking-tighter text-[#4a2e19]" style={{ fontFamily: 'var(--font-heading)' }}>
                {event.date.split(' ')[0]}/{event.date.split(' ')[2]}
               </div>
            </legend>

            {/* Main Title */}
            <h1 className="text-2xl md:text-3xl lg:text-[38px] leading-[1.1] font-black text-[#4a2e19] uppercase tracking-wide mb-10 md:pr-12" style={{ fontFamily: 'var(--font-heading)' }}>
              {event.title}
            </h1>
            
            {/* Content Blocks */}
            <div className="flex flex-col gap-6 md:gap-10 font-sans font-semibold text-[15px] md:text-[16.5px] text-[#4a2e19] leading-relaxed">
              {event.content.map((block, idx) => {
                if (block.type === 'text') {
                  return <p key={idx} className="whitespace-pre-wrap">{block.value}</p>;
                } else if (block.type === 'image') {
                  return (
                    <div key={idx} className="w-full flex flex-col gap-2">
                      <div className="w-full border-[3px] border-[#4a2e19] relative bg-black/10">
                        <img src={block.value} alt={event.title} className="w-full h-auto object-cover max-h-[600px]" />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Separator / Footer of article */}
            <div className="mt-12 pt-8 border-t border-[#4a2e19]/30 border-dashed">
                <div className="font-mono text-xs md:text-sm space-y-2 text-[#4a2e19]/90 font-bold tracking-wider">
                  <div>Hotline: <span className="text-[#a93c24]">0332215823</span></div>
                  <div>Fanpage: <span className="text-[#a93c24]">https://www.facebook.com/bdcbvt</span></div>
                  <div>Website: <span className="text-[#a93c24]">bundauchubeo.official@gmail.com</span></div>
                </div>
                
                {/* Share Buttons */}
                <div className="flex gap-2 items-center justify-center mt-12 mb-4 space-x-1">
                   {['f', 't', 'g+'].map(platform => (
                     <button key={platform} className="w-9 h-9 rounded-full bg-[#4a2e19] text-[#dfc39d] flex items-center justify-center text-sm font-bold shadow-md hover:bg-[#a93c24] hover:text-white transition-colors border border-[#dfc39d]">
                       {platform}
                     </button>
                   ))}
                </div>
            </div>

          </fieldset>
        </fieldset>

        {/* Right Column: Related News (1/4 width) */}
        <fieldset className="lg:col-span-1 border-[4px] border-solid border-[#4a2e19] shadow-[4px_4px_0_rgba(62,39,35,0.15)] relative p-1.5 pt-0 min-w-0 m-0">
          {/* Title Top Center - VISIBLE ON OUTER RING */}
          <legend className="mx-auto px-3 text-center leading-none flex flex-col gap-1 items-center pointer-events-none">
             <span className="text-[#4C643A] font-black uppercase text-xl tracking-widest block leading-none pointer-events-auto" style={{ fontFamily: 'var(--font-heading)' }}>TIN TỨC</span>
             <span className="text-[#4C643A] font-black uppercase text-xl tracking-widest block leading-[1.2] pointer-events-auto" style={{ fontFamily: 'var(--font-heading)' }}>LIÊN QUAN</span>
          </legend>
          <fieldset className="relative min-h-full min-w-0 mb-1 w-full flex flex-col m-0 pt-0">
            
            {/* INVISIBLE GAP MAKER FOR INNER RING */}
            <legend className="mx-auto px-3 text-center leading-none flex flex-col gap-1 items-center opacity-0 pointer-events-none select-none">
               <span className="text-[#4C643A] font-black uppercase text-xl tracking-widest block leading-none" style={{ fontFamily: 'var(--font-heading)' }}>TIN TỨC</span>
               <span className="text-[#4C643A] font-black uppercase text-xl tracking-widest block leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>LIÊN QUAN</span>
            </legend>
            
            <div className="px-4 pb-4 flex flex-col gap-6 h-full flex-grow">
              {events.filter(e => e.id !== eventId).map(related => (
                <div key={related.id} className="flex flex-col gap-2 pb-5 border-b border-dashed border-[#4a2e19]/30 last:border-0 last:pb-0 transition-opacity hover:opacity-90">
                  <Link href={`/events/${related.id}`} className="group block overflow-hidden border-2 border-[#4a2e19] bg-black/10">
                    <img src={related.thumbnail} alt={related.title} className="w-full h-auto aspect-video object-cover" />
                  </Link>
                  <div className="text-[10px] md:text-[11px] font-bold text-[#4a2e19]/70 tracking-widest uppercase mt-2 font-mono">
                      {related.time} - {related.date}
                  </div>
                  <Link href={`/events/${related.id}`} className="hover:text-[#a93c24] transition-colors">
                    <h3 className="text-sm font-bold uppercase leading-[1.3] font-sans text-[#4a2e19] line-clamp-3">
                        {related.title}
                    </h3>
                  </Link>
                  <Link href={`/events/${related.id}`} className="font-black uppercase text-[11px] hover:text-[#a93c24] transition-colors tracking-widest text-[#4a2e19] font-sans mt-0.5 inline-flex">
                      ĐỌC TIẾP
                  </Link>
                </div>
              ))}
            </div>

          </fieldset>
        </fieldset>

      </div>

      <div className="mt-8 relative -mx-4 md:mx-0">
         <BookingSection />
      </div>
      
    </div>
  );
}
