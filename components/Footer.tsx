import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
      className="w-full relative pb-32">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 px-8 relative z-10 w-full">
        <div className="w-full lg:w-2/5">
          {/* Left Column */}
          <div className="flex-1 lg:max-w-xl z-20">
            <h2 className="text-[#4C643A] font-black font-serif text-xl sm:text-[22px] leading-snug uppercase mb-1 tracking-wider text-shadow-sm text-center lg:text-left">
              Bún đậu chú béo
            </h2>
            <div className="mb-4 text-[#2b2b2b] tracking-[0.2em] font-bold text-lg text-[#a3381a] leading-none text-center lg:text-left">*****</div>
            <div className="font-mono text-[#2b2b2b] text-sm md:text-[15px] font-semibold flex flex-col items-center lg:items-start text-center lg:text-left">
              <p><span className="text-[#a3381a] font-bold">Địa chỉ:</span> 54 Nơ Trang Long, phường Rạch Dừa, TP. Hồ Chí Minh</p>
              <p><span className="text-[#a3381a] font-bold">Điện thoại:</span> 0332215823</p>
              <p><span className="text-[#a3381a] font-bold">Email:</span> bundauchubeo.official@gmail.com</p>
              <p><span className="text-[#a3381a] font-bold">Số chứng nhận đăng ký kinh doanh:</span> 01234456677</p>
              <p><span className="text-[#a3381a] font-bold">Ngày cấp:</span> 30/5/2026</p>
              <p><span className="text-[#a3381a] font-bold">Nơi cấp:</span> Sở kế hoạch & đầu tư TP.Hồ Chí Minh</p>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex-2 lg:max-w-md xl:max-w-[500px] z-20 w-full lg:flex lg:flex-col mt-8 lg:mt-16">
            <div className="w-full flex flex-col items-center lg:items-start">
              <h3 className="text-[#4C643A] font-black font-serif text-xl sm:text-[22px] uppercase mb-1 tracking-wider text-shadow-sm text-center lg:text-left">
                Site map
              </h3>
              <div className="mb-4 text-[#2b2b2b] tracking-[0.2em] font-bold text-lg text-[#a3381a] leading-none text-center lg:text-left">*****</div>
              
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 font-mono text-[#2b2b2b] text-sm md:text-[15px] font-semibold mb-8 lg:max-w-md xl:max-w-none text-left w-[300px] sm:w-[400px] lg:w-auto">
                  <Link href="/" className="hover:text-[#a3381a] transition-colors leading-tight">Trang chủ</Link>
                  <Link href="/menu" className="hover:text-[#a3381a] transition-colors leading-tight whitespace-nowrap">Cửa hàng</Link>
                  <Link href="/#menu-section" className="hover:text-[#a3381a] transition-colors leading-tight">Menu</Link>
                  <Link href="/" className="hover:text-[#a3381a] transition-colors leading-tight whitespace-nowrap">Tuyển dụng</Link>
                  <Link href="/#booking-section" className="hover:text-[#a3381a] transition-colors leading-tight whitespace-nowrap">Đặt bàn</Link>
                  <div></div>
                  <Link href="/#events-section" className="hover:text-[#a3381a] transition-colors leading-tight whitespace-nowrap">Tin tức & sự kiện</Link>
                  <div></div>
              </div>
            </div>
          </div>

        </div>

        {/* Image Column right side */}
        <div className="w-full lg:w-3/5 flex justify-center lg:justify-end items-center mt-12 lg:mt-0 relative z-20">
          <img 
            src="https://dauhomemade.vn/apps/themes/bundau/img/bundaufull.png" 
            alt="Mẹt bún đậu" 
            className="w-full h-auto max-w-[500px] xl:max-w-[650px] object-contain drop-shadow-2xl hover:-rotate-40 transition-transform duration-500 cursor-pointer"
          />
        </div>

      </div>
    </footer>
  );
}

