"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const AVAILABLE_ITEMS = [
  "Thập cẩm 1 người",
  "Thập cẩm 2 người",
  "Đặc biệt 1 người",
  "Đặc biệt 2 người",
  "Bún thêm",
  "Đậu hũ thêm",
  "Dồi sụn thêm",
  "Thịt luộc thêm",
  "Chả cốm thêm",
  "Chả giò thêm",
  "Nem chua rán thêm",
  "Trà Tắc",
  "Nước mơ",
  "Nước sấu",
];

export default function BookingSection({
  defaultItem,
}: { defaultItem?: string } = {}) {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(
    () => {
      if (defaultItem) return { [defaultItem]: 1 };
      return {};
    },
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: (prev[item] || 0) + 1,
    }));
  };

  const removeItem = (item: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItems((prev) => {
      const next = { ...prev };
      delete next[item];
      return next;
    });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setIsSubmitting(true);
    const formData = new FormData(form.current);
    const templateParams: Record<string, unknown> = {
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      location: formData.get("location") || "",
      code: formData.get("code") || "",
      order:
        Object.entries(selectedItems)
          .map(([name, qty]) => `${name} (x${qty})`)
          .join(", ") || "",
      date: new Date().toLocaleDateString("vi-VN"),
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_zwfjdkn",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_0i8bbrb",
        templateParams,
        {
          publicKey:
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "vHuuFTcVGfa6ZgTQ6",
        },
      )
      .then(
        () => {
          toast.success("Success", {
            description:
              "Bạn đã đặt món thành công! Bún Đậu Chú Béo sẽ sớm liên hệ xác nhận.",
          });
          form.current?.reset();
          setSelectedItems({});
          setIsSubmitting(false);
        },
        (error) => {
          console.error("FAILED...", error.text);
          toast.error("Error", {
            description: "Có lỗi xảy ra, vui lòng thử lại sau.",
          });
          setIsSubmitting(false);
        },
      );
  };

  return (
    <section id="booking-section" className="w-full relative mt-16 mb-8">
      {/* The main dashed border container */}
      <div className="relative mx-auto border-x-2 border-b-2 border-dashed border-[#5e4d2f] pt-8 pb-8 px-6 md:px-12 md:mx-10">
        {/* Top border with Scissor and Title */}
        <div className="absolute top-0 left-0 w-full flex items-center justify-center -mt-[25px] sm:-mt-[34px] lg:-mt-[42px]">
          <div className="flex-1 border-t-2 border-dashed border-[#5e4d2f] ml-2 sm:ml-6 md:ml-12"></div>
          <div className="px-2 md:px-6 relative flex items-center group">
            <h2
              className="text-[#a3381a] font-black font-serif text-2xl sm:text-3xl lg:text-5xl uppercase tracking-wider text-shadow-sm whitespace-nowrap"
              style={{ fontFamily: "var(--font-heading)" }}>
              ORDER NHANH
            </h2>
            {/* Scissors icon */}
            <div className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 text-[#5e4d2f] translate-x-1/2 hidden sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform rotate-180">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                Đặt món ngay để nhận được sự phục vụ tốt nhất đến từ Bún Đậu Chú
                Béo{" "}
              </svg>
            </div>
          </div>
          <div className="flex-1 border-t-2 border-dashed border-[#5e4d2f] mr-2 sm:mr-6 md:mr-12"></div>
        </div>
        <div className="text-center mb-8">
          <div className="w-24 md:w-32 h-[2px] bg-[#5e4d2f] mx-auto mb-4 md:mb-6"></div>
          <p
            className="text-[#5e4d2f] font-mono text-sm md:text-lg font-semibold tracking-wide px-4"
            style={{ fontFamily: "var(--font-mono)" }}>
            Đặt món ngay để nhận được sự phục vụ tốt nhất{" "}
            <br className="hidden md:block" />
            đến từ Bún Đậu Chú Béo
          </p>
        </div>
        {/* Form area */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-3xl mx-auto flex flex-col gap-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {/* HỌ VÀ TÊN */}
            <div className="border-[2px] border-[#5e4d2f] p-1 bg-white/20">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                required
                className="w-full border border-[#5e4d2f] bg-transparent px-4 py-3 font-bold text-[#5e4d2f] font-mono placeholder:text-[#5e4d2f] focus:outline-none focus:bg-white/40 transition-colors"
              />
            </div>
            {/* SỐ ĐIỆN THOẠI */}
            <div className="border-[2px] border-[#5e4d2f] p-1 bg-white/20">
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                required
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    "",
                  );
                }}
                className="w-full border border-[#5e4d2f] bg-transparent px-4 py-3 font-bold text-[#5e4d2f] font-mono placeholder:text-[#5e4d2f] focus:outline-none focus:bg-white/40 transition-colors"
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {/* ĐỊA CHỈ */}
            <div className="md:col-span-2 border-[2px] border-[#5e4d2f] p-1 bg-white/20">
              <input
                type="text"
                name="location"
                placeholder="Địa chỉ nhà"
                required
                className="w-full border border-[#5e4d2f] bg-transparent px-4 py-3 font-bold text-[#5e4d2f] font-mono placeholder:text-[#5e4d2f] focus:outline-none focus:bg-white/40 transition-colors"
              />
            </div>
            {/* EMAIL */}
            <div className="border-[2px] border-[#5e4d2f] p-1 bg-white/20">
              <input
                type="text"
                name="code"
                placeholder="Mã giảm giá (nếu có)"
                className="w-full border border-[#5e4d2f] bg-transparent px-4 py-3 font-bold text-[#5e4d2f] font-mono placeholder:text-[#5e4d2f] focus:outline-none focus:bg-white/40 transition-colors"
              />
            </div>
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 gap-5 md:gap-8">
            {/* MÓN HÀNG */}
            <div className="border-[2px] border-[#5e4d2f] p-1 bg-white/20">
              <div
                className="relative w-full border border-[#5e4d2f]"
                ref={dropdownRef}>
                <div
                  className="min-h-[50px] w-full bg-transparent px-4 py-[10px] flex flex-wrap gap-2 items-center cursor-pointer transition-colors hover:bg-white/40"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {Object.keys(selectedItems).length === 0 ? (
                    <span className="text-[#5e4d2f] font-mono font-bold opacity-70">
                      Chọn món bạn yêu thích (Có thể chọn nhiều)
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-2 flex-grow">
                      {Object.entries(selectedItems).map(([item, qty]) => (
                        <div
                          key={item}
                          className="flex items-center gap-1 bg-[#5e4d2f] text-vintage-yellow px-3 py-1 rounded-full text-sm font-bold font-mono shadow-sm"
                          onClick={(e) => {
                            // Toggling a selected chip again increments quantity instead of deleting
                            e.stopPropagation();
                            toggleItem(item);
                          }}>
                          <span>
                            {item}{" "}
                            {qty > 1 && (
                              <span className="bg-white/20 px-1.5 py-0.5 rounded-full ml-1 text-xs">
                                x{qty}
                              </span>
                            )}
                          </span>
                          <button
                            type="button"
                            className="hover:text-white transition-colors ml-1"
                            onClick={(e) => removeItem(item, e)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="ml-auto text-[#5e4d2f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border-[2px] border-[#5e4d2f] shadow-lg z-50 max-h-60 overflow-y-auto w-[calc(100%+4px)] -ml-[2px] cursor-pointer">
                    {AVAILABLE_ITEMS.map((item) => {
                      const qty = selectedItems[item] || 0;
                      const isSelected = qty > 0;
                      return (
                        <div
                          key={item}
                          className={`px-4 py-3 font-mono font-bold transition-all flex justify-between items-center border-b border-[#5e4d2f]/10 last:border-0 ${isSelected ? "bg-[#5e4d2f]/10 text-[#a3381a]" : "text-[#5e4d2f] hover:bg-black/5"}`}
                          onClick={() => toggleItem(item)}>
                          <span>{item}</span>
                          {isSelected && (
                            <div className="flex items-center gap-2">
                              <span className="text-[#a3381a] bg-white/50 px-2 py-0.5 rounded font-black text-sm border border-[#a3381a]/20">
                                x{qty}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <input
                  type="hidden"
                  name="Món Hàng"
                  value={Object.entries(selectedItems)
                    .map(([name, qty]) => `${name} (x${qty})`)
                    .join(", ")}
                />
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border-[2px] border-[#5e4d2f] p-1 group disabled:opacity-50 disabled:cursor-not-allowed">
              <div className="bg-vintage-yellow border border-[#5e4d2f] px-12 py-3 group-hover:bg-yellow-400 transition-colors cursor-pointer">
                <span className="font-bold text-[#5e4d2f] font-mono tracking-widest uppercase text-lg">
                  {isSubmitting ? "ĐANG GỬI..." : "ĐẶT MÓN NGAY"}
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
