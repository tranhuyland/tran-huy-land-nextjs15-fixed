import React from "react";
import { Building2, Map, Car } from "lucide-react";
import { fetchGoogleSheetData } from "@/utils/googleSheet";
import HeaderWrapper from "@/components/HeaderWrapper";
import Hero from "@/components/Hero";
import FilterSection from "@/components/FilterSection";
import Footer from "@/components/Footer";

export const revalidate = 300;

export default async function Home() {
  const dataBds = await fetchGoogleSheetData();

  return (
    <>
      <HeaderWrapper />
      <Hero />
      <FilterSection initialData={dataBds} />

      {/* SEO Static Fallback Area for Web Crawlers */}
      <div className="sr-only">
        <h2>Danh sách nhà đất đang bán tại Hải Châu, Cẩm Lệ, Đà Nẵng</h2>
        <div>
          {dataBds.map((item) => (
            <article key={item.id}>
              <h3>{item.tieude}</h3>
              <p>{item.moTa}</p>
              <span>Giá: {item.gia} - Diện tích: {item.dienTich} - Khu vực: {item.khuVucFull}</span>
            </article>
          ))}
        </div>
      </div>

      <section id="about-section" className="bg-white border-t border-b border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl flex flex-col justify-center">
            <p className="text-amber-400 uppercase tracking-widest text-xs font-bold mb-3">VÌ SAO CHỌN TRẦN HUY LAND</p>
            <h3 className="text-3xl font-extrabold leading-tight mb-6">Chuyên Nhà Đất Thực Tế Tại Đà Nẵng</h3>
            <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              <div>
                <h4 className="text-white font-bold mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Hình Ảnh & Vị Trí Thật
                </h4>
                <p className="text-slate-400 text-sm">Cam kết hạn chế tối đa tin ảo, hình minh họa sai lệch thực tế hoặc nhà đã giao dịch xong làm mất thời gian khách hàng.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Hỗ Trợ Pháp Lý Minh Bạch
                </h4>
                <p className="text-slate-400 text-sm">Kiểm tra quy hoạch đô thị, hỗ trợ xem trực tiếp bản vẽ sổ hồng gốc và thương lượng giá cả trực tiếp với chủ tài sản.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-slate-50 border border-slate-100 p-8 sm:p-12 rounded-[2.5rem]">
            <p className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2">THỊ TRƯỜNG ĐÀ NẴNG</p>
            <h3 className="text-3xl font-extrabold text-slate-900 leading-tight mb-5">Phân Tích Địa Bàn Nổi Bật</h3>
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 text-justify">
              <p>Thị trường nhà đất Đà Nẵng hiện đang tập trung dòng tiền mạnh tại khu vực Hải Châu, Cẩm Lệ và Sơn Trà nhờ hạ tầng giao thông đồng bộ, mật độ cư dân sầm uất và tính khai thác mặt bằng kinh doanh dòng tiền vượt trội.</p>
              <p>Trong khi phân khúc nhà mặt tiền trung tâm phù hợp dòng tiền lớn cho thuê, phân khúc nhà trong kiệt rộng ô tô đỗ cửa tại Cẩm Lệ luôn được các hộ gia đình trẻ săn đón nhiệt tình vì phù hợp nhu cầu định cư an toàn lâu dài.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="blog-section" className="max-w-7xl mx-auto w-full px-4 py-20">
        <div className="mb-10 text-center sm:text-left">
          <p className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-2">GÓC CHIA SẺ KINH NGHIỆM</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Tin Tức & Kiến Thức Thị Trường</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4"><Building2 className="w-5 h-5" /></div>
            <h3 className="font-extrabold text-lg mb-3 text-slate-900 hover:text-amber-500 transition-colors">Có Nên Mua Nhà Hải Châu?</h3>
            <p className="text-slate-500 text-sm leading-relaxed text-justify">Phân tích chuyên sâu về tiềm năng tăng giá bền vững, mật độ tiện ích công cộng và nhu cầu sở hữu bất động sản lõi đô thị trung tâm Đà Nẵng.</p>
          </article>
          <article className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4"><Map className="w-5 h-5" /></div>
            <h3 className="font-extrabold text-lg mb-3 text-slate-900 hover:text-amber-500 transition-colors">Kinh Nghiệm Mua Đất Sơn Trà</h3>
            <p className="text-slate-500 text-sm leading-relaxed text-justify">Những lưu ý pháp lý quan trọng cốt lõi, kiểm tra tranh chấp ranh giới và khoảng cách an toàn khi chọn mua đất thổ cư gần biển Đà Nẵng.</p>
          </article>
          <article className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4"><Car className="w-5 h-5" /></div>
            <h3 className="font-extrabold text-lg mb-3 text-slate-900 hover:text-amber-500 transition-colors">Nhà Kiệt Ô Tô Là Gì?</h3>
            <p className="text-slate-500 text-sm leading-relaxed text-justify">Định nghĩa lộ giới kiệt hẻm chuẩn, giải thích ưu nhược điểm thực tế và cách thẩm định giá khi tìm mua phân khúc nhà kiệt ô tô ở thực.</p>
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}