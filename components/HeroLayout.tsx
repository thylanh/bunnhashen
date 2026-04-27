export default function HeroLayout() {
  return (
    <section className="w-full flex flex-col md:flex-row gap-8 mb-12">
      {/* Left Column: BAN ĐỌC CHÚ Ý */}
      <div className="hidden md:flex w-full md:w-1/4 flex-col items-center">
        <div className="w-3/5 md:w-full max-w-[250px] md:max-w-none aspect-square bg-vintage-brown flex flex-col items-center justify-center text-[#fbc02d] relative clip-triangle-bottom border-[4px] md:border-[6px] border-[#fbc02d] origin-top animate-bounce-smooth">
          <h3
            className="text-3xl md:text-4xl px-2 font-bold mb-10 md:mb-14 text-center leading-tight uppercase "
            style={{ fontFamily: "var(--font-heading)" }}>
            BÚN
            <br />
            CHÚ
            <br />
            BÉO
          </h3>
          <div className="absolute bottom-0 w-0 h-0 border-l-[60px] md:border-l-[100px] border-l-transparent border-t-[50px] md:border-t-[80px] border-t-vintage-brown border-r-[60px] md:border-r-[100px] border-r-transparent transform translate-y-[48px] md:translate-y-[78px]"></div>
        </div>
      </div>

      {/* Center Column: Highlight/Video placeholder and Đặc sản */}
      <div className="w-full md:w-1/2 flex flex-col border-x-2 border-dashed border-vintage-brown px-4">
        {/* Placeholder for video or featured image */}
        <div className="w-full aspect-video bg-black/80 relative flex items-center justify-center overflow-hidden border-4 border-vintage-brown">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('/images/parchment.png')]"></div>
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent-red"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent-red"></div>
          <div className="absolute top-6 left-6 w-4 h-4 bg-accent-red rounded-full animate-blink"></div>

          <video
            className="w-full h-full object-cover"
            src="/videos/vungtau.mp4"
            autoPlay
            muted
            loop
            controls
          />
        </div>

        {/* Đặc sản Section */}
        <div className="mt-8 pt-4 border-t-2 border-dashed border-vintage-brown">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-vintage-brown uppercase tracking-widest text-center mb-6"
            style={{ fontFamily: "var(--font-heading)" }}>
            Món Ngon Hà Thành
          </h2>
          <p
            className="font-serif text-base md:text-lg leading-relaxed first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 md:first-letter:mr-3 first-letter:mt-1 first-letter:text-accent-red"
            style={{ fontFamily: "var(--font-sans)" }}>
            Món ăn này gồm có bún tươi, đậu hũ chiên vàng, thịt luộc, chả cốm,
            và rau thơm, ăn kèm với mắm tôm pha chế đặc biệt. Bún đậu mắm tôm
            không chỉ là một món ăn, mà còn là một phần của văn hóa ẩm thực Hà
            Nội. Đến Vũng Tàu mà chưa ghé qua chú béo thưởng thức món này thì
            quả là một thiếu sót lớn!
          </p>
        </div>
      </div>

      {/* Right Column: Một vòng Hà Thành */}
      <div className="w-full md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
        <h2
          className="text-3xl md:text-4xl font-bold text-accent-red uppercase tracking-widest mb-4 leading-tight border-b-2 border-vintage-brown pb-4 inline-block w-full"
          style={{ fontFamily: "var(--font-heading)" }}>
          VÒNG QUANH
          <br /> BÚN CHÚ BÉO
        </h2>
        <div
          className="font-serif text-base leading-relaxed text-justify relative before:content-[''] before:w-8 before:h-0.5 before:bg-vintage-brown before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2"
          style={{ fontFamily: "var(--font-sans)" }}>
          <p className="mb-4">
            Ngày xưa, ở một con hẻm nhỏ có một quán bún đậu mắm tôm nhỏ xíu.
            Quán chỉ có vài chiếc bàn gỗ thấp, mấy cái ghế nhựa cũ và một chiếc
            quạt quay kẽo kẹt cả ngày. Nhưng lúc nào quán cũng đông khách. Chủ
            quán là một bà cụ đã ngoài bảy mươi tuổi. Ai cũng gọi bà là bà Năm.
            Mỗi sáng sớm, bà dậy từ lúc trời còn chưa sáng để chuẩn bị bún, rán
            đậu, luộc thịt và pha mắm tôm.
          </p>
          <p className="font-bold border-l-4 border-accent-red pl-3 mt-4 text-sm bg-black/5 p-2 italic">
            "Bí mật của quán nằm ở bát Bún đậu mắm tôm."
          </p>
        </div>
      </div>
    </section>
  );
}
