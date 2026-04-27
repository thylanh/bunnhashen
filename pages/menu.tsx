import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import BookingDialog from "../components/BookingDialog";
import BookingSection from "../components/BookingSection";
import { combos } from "../utils/combos";

export default function MenuPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="flex flex-col gap-12 pt-8 pb-16">
      <Head>
        <title>Thực đơn - Bún Đậu Chú Béo</title>
      </Head>

      <section className="w-full relative px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#3e2723] hover:text-[#A9442A] transition-colors font-bold uppercase tracking-wider text-sm md:text-base border-2 border-[#3e2723] px-3 py-1.5 md:px-4 md:py-2 hover:bg-[#3e2723] hover:text-[#e4ccaa] shadow-[2px_2px_0_rgba(62,39,35,0.2)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Quay về trang chủ
          </Link>
        </div>
        {/* Title */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-vintage-brown uppercase tracking-widest"
            style={{ fontFamily: "var(--font-heading)" }}>
            Menu
          </h1>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px bg-vintage-brown w-16 md:w-24"></div>
            <div className="mx-4 text-vintage-brown text-lg">❦</div>
            <div className="h-px bg-vintage-brown w-16 md:w-24"></div>
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {combos.map((combo) => (
            <Link
              key={combo.id}
              href={`/menu/${combo.id}`}
              className="group block focus:outline-none">
              <div className="border-4 md:border-[6px] border-[#5E3B22] p-1.5 bg-[#e4ccaa] relative shadow-[6px_6px_0_rgba(62,39,35,0.15)] flex flex-col h-full group-hover:-translate-y-1 transition-transform duration-300">
                {/* Product Image Area */}
                <div className="w-full aspect-[4/3] bg-black/5 relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-[#c5b092] flex items-center justify-center">
                    <span className="text-[#5E3B22] opacity-30 font-bold uppercase tracking-widest text-xl">
                      Hình Ảnh
                    </span>
                  </div>
                  <img
                    src={combo.image}
                    alt={combo.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  {/* Zigzag overlay at the bottom border of the image area acting as divider */}
                  <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-10 block">
                    <svg
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                      className="w-full h-5 md:h-7 text-[#e4ccaa]"
                      fill="currentColor">
                      <path d="M0,120 L0,60 Q150,0 300,60 T600,60 T900,60 T1200,60 L1200,120 Z" />
                    </svg>
                  </div>
                </div>

                {/* Price Circle Badge */}
                <div
                  className="absolute right-[2%] top-[calc(55%_-_10px)] md:top-[calc(60%_-_32px)] -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-[#A9442A] rounded-full flex flex-col items-center justify-center z-20 shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                  style={{ border: "3px solid #DFB58C" }}>
                  <span
                    className="text-[#FFEBB5] font-bold text-[9px] md:text-[10px] tracking-widest uppercase mb-0.5"
                    style={{ fontFamily: "var(--font-sans)" }}>
                    Giá
                  </span>
                  <span
                    className="text-[#FFEBB5] font-bold text-sm md:text-base leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}>
                    {combo.price}
                  </span>
                  <span
                    className="text-[#FFEBB5] font-bold text-[9px] md:text-[10px] leading-none mt-0.5"
                    style={{ fontFamily: "var(--font-heading)" }}>
                    VNĐ
                  </span>
                </div>

                {/* Text / Details Area */}
                <div className="px-4 md:px-5 pt-4 md:pt-5 pb-5 bg-[#e4ccaa] flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#3e2723] uppercase tracking-wide mr-16">
                      {combo.title}
                    </h3>
                    <div className="text-[#3e2723] tracking-[0.2em] text-base font-bold">
                      *****
                    </div>
                    {/* <p className="text-[#3e2723]/90 font-mono text-xs md:text-sm pr-10 md:pr-12 leading-relaxed line-clamp-3">
                      {combo.desc}
                    </p> */}
                  </div>

                  <div className="mt-8 flex justify-between items-end">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProduct(combo.title);
                        setIsDialogOpen(true);
                      }}
                      className="border-[2px] border-dotted border-[#3e2723] px-2 py-1 md:px-3 md:py-1.5 font-bold text-[#3e2723] uppercase tracking-wider hover:bg-[#3e2723] hover:text-[#e4ccaa] transition-colors text-[11px] md:text-xs shadow-[1.5px_1.5px_0_rgba(62,39,35,0.2)]">
                      Đặt món ngay
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <BookingSection />
      </div>

      <BookingDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        defaultItem={selectedProduct}
      />
    </div>
  );
}
