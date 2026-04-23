import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import BookingDialog from "../../components/BookingDialog";
import BookingSection from "../../components/BookingSection";
import ImageMagnifier from "../../components/ImageMagnifier";
import { combos } from "../../utils/data";

export default function ProductDetail() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined,
  );
  const router = useRouter();
  const { id } = router.query;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({ left: -cardWidth - 24, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  // Find product by id or fallback to the first one if not found or id is missing
  const product = combos.find((c) => c.id === Number(id)) || combos[0];

  if (!product) return null; // Avoid render errors if product mapping fails

  // Find related products (same category, exclude current)
  const relatedProducts = combos.filter(
    (c) => c.category === product.category && c.id !== product.id,
  );

  return (
    <div className="flex flex-col pt-8 pb-16 px-4 md:px-8 max-w-6xl mx-auto min-h-[70vh]">
      <Head>
        <title>{product.title} - Bún Đậu Chú Béo</title>
      </Head>

      {/* Breadcrumb / Back button */}
      <div className="mb-8">
        <Link
          href="/menu"
          className="text-vintage-brown hover:text-[#A9442A] font-bold text-sm tracking-widest uppercase transition-colors inline-flex items-center gap-2 border-b-2 border-transparent hover:border-[#A9442A] pb-0.5">
          <span>← Quay lại Menu</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-start">
        {/* Left Column: Image Area */}
        <div className="w-full">
          {/* Exact double border implementation: Outer thick #5e3b22, padding #dcb588, inner thick #5e3b22 */}
          <div className="border-[5px] border-[#4a2e19] p-2 bg-[#dfc39d] shadow-[4px_4px_0_rgba(62,39,35,0.15)]">
            <div className="border-[2px] border-[#4a2e19] relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden">
              <ImageMagnifier
                src={product.image}
                alt={product.title}
                zoomLevel={2.5}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Text Details Area */}
        <div className="flex flex-col py-0">
          <h1 className="text-[26px] md:text-4xl lg:text-[40px] leading-[1.15] font-bold text-[#4a2e19] uppercase tracking-wide mb-3">
            {product.title}
          </h1>
          <div className="text-[#4a2e19] tracking-[0.2em] text-xl font-bold font-mono leading-none">
            *****
          </div>
          <p className="text-[#4a2e19]/90 font-mono text-[14px] md:text-[15px] leading-[1.65] pr-2 lg:pr-8 mb-5">
            {product.desc}
          </p>
          <div className="text-[#4a2e19] tracking-[0.2em] text-xl font-bold font-mono leading-none">
            *****
          </div>

          {/* Price and Quantity Box Row */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-6">
            {/* Text: GiÁ: 269.000 đ */}
            <div className="flex items-baseline gap-2 text-[#a93c24]">
              <span
                className="font-bold text-[22px] md:text-[26px] tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}>
                Giá:
              </span>
              <span
                className="font-bold text-[36px] md:text-[42px]"
                style={{ fontFamily: "var(--font-heading)" }}>
                {product.price}
              </span>
              <span
                className="font-bold text-[18px] md:text-[22px]"
                style={{ fontFamily: "var(--font-heading)" }}>
                vnđ
              </span>
            </div>
          </div>

          {/* Button Row */}
          <div className="mb-8 block">
            <button
              onClick={() => {
                setSelectedProduct(product.title);
                setIsDialogOpen(true);
              }}
              className="border-[3px] border-[#4a2e19] p-[2px] group focus:outline-none block w-max bg-[#e4ccaa]">
              <div className="border-[1px] border-[#4a2e19] bg-[#d2a325] group-hover:bg-[#b88c1b] transition-colors h-10 md:h-11 px-5 flex items-center justify-center">
                <span className="font-bold text-[#4a2e19] uppercase tracking-wider text-[13px] whitespace-nowrap">
                  Đặt món ngay
                </span>
              </div>
            </button>
          </div>

          <div className="text-[#4a2e19]/80 font-mono text-sm border-t border-[#4a2e19]/20 pt-4 max-w-sm">
            <span className="opacity-80">Loại: </span>
            <span className="text-[#a93c24]">{product.category}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-24 w-full">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#4a2e19] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-heading)" }}>
              Món Ăn Cùng Loại
            </h2>
            <div className="flex items-center justify-center mt-4 gap-4">
              <div className="h-px bg-[#4a2e19] w-6 md:w-16"></div>
              <div className="text-[#4a2e19] text-sm">❦</div>
              <div className="h-px bg-[#4a2e19] w-6 md:w-16"></div>
            </div>
          </div>

          <div className="relative w-full group">
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className={`absolute left-1 sm:-left-4 md:-left-6 top-[44%] lg:top-[48%] -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#e4ccaa] border-[2px] border-[#4a2e19] rounded-full items-center justify-center text-[#4a2e19] shadow-[2px_2px_0_rgba(62,39,35,0.3)] focus:outline-none transition-all duration-300 ${!canScrollLeft ? "hidden" : relatedProducts.length < 5 ? "hidden md:flex" : "flex"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
               </svg>
            </button>

            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto gap-4 md:gap-6 py-4 px-2 snap-x w-full hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}>
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {relatedProducts.map((combo) => (
              <div
                key={combo.id}
                className="snap-start shrink-0 w-[80vw] sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.125rem)]">
                <Link
                  href={`/menu/${combo.id}`}
                  className="group block focus:outline-none h-full">
                  <div className="border-[3px] border-[#5E3B22] p-1 bg-[#e4ccaa] relative shadow-[4px_4px_0_rgba(62,39,35,0.15)] flex flex-col h-full">
                    {/* Product Image Area */}
                    <div className="w-full aspect-[4/3] bg-black/5 relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-[#c5b092] flex items-center justify-center">
                        <span className="text-[#5E3B22] opacity-30 font-bold uppercase tracking-widest text-sm">
                          Hình Ảnh
                        </span>
                      </div>
                      <img
                        src={combo.image}
                        alt={combo.title}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                      />
                      <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-10 block">
                        <svg
                          viewBox="0 0 1200 120"
                          preserveAspectRatio="none"
                          className="w-full h-4 md:h-5 text-[#e4ccaa]"
                          fill="currentColor">
                          <path d="M0,120 L0,60 Q150,0 300,60 T600,60 T900,60 T1200,60 L1200,120 Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Price Circle Badge */}
                    <div
                      className="absolute right-[2%] top-[calc(55%_-_10px)] md:top-[calc(60%_-_20px)] -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-[#A9442A] rounded-full flex flex-col items-center justify-center z-20 shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                      style={{ border: "2px solid #DFB58C" }}>
                      <span
                        className="text-[#FFEBB5] font-bold text-[8px] md:text-[9px] tracking-widest uppercase mb-0.5"
                        style={{ fontFamily: "var(--font-sans)" }}>
                        Giá
                      </span>
                      <span
                        className="text-[#FFEBB5] font-bold text-xs md:text-sm leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}>
                        {combo.price}
                      </span>
                    </div>

                    {/* Text / Details Area */}
                    <div className="px-3 md:px-4 pt-4 pb-4 bg-[#e4ccaa] flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-[#3e2723] uppercase tracking-wide mr-12 line-clamp-2">
                          {combo.title}
                        </h3>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedProduct(combo.title);
                            setIsDialogOpen(true);
                          }}
                          className="border-[2px] border-dotted border-[#3e2723] px-2 py-1 md:px-3 md:py-1.5 font-bold text-[#3e2723] uppercase tracking-wider hover:bg-[#3e2723] hover:text-[#e4ccaa] transition-colors text-[10px] md:text-[11px] shadow-[1.5px_1.5px_0_rgba(62,39,35,0.2)]">
                          Đặt món
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

            <button
              onClick={scrollRight}
              className={`absolute right-1 sm:-right-4 md:-right-6 top-[44%] lg:top-[48%] -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#e4ccaa] border-[2px] border-[#4a2e19] rounded-full items-center justify-center text-[#4a2e19] shadow-[2px_2px_0_rgba(62,39,35,0.3)] focus:outline-none transition-all duration-300 ${!canScrollRight ? "hidden" : relatedProducts.length < 5 ? "hidden md:flex" : "flex"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
               </svg>
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 md:mt-16 border-t-[3px] border-dashed border-[#5e3b22]/30 pt-8">
        <BookingSection />
      </div>

      <BookingDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        defaultItem={selectedProduct || product.title}
      />
    </div>
  );
}
