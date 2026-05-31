"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RealEstateItem } from "@/utils/googleSheet";
import RealEstateCard from "./RealEstateCard";
import DetailModal from "./DetailModal";
import { X } from "lucide-react";

interface FilterSectionProps {
  initialData: RealEstateItem[];
}

export default function FilterSection({ initialData }: FilterSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [khuVuc, setKhuVuc] = useState("all");
  const [loaiHinh, setLoaiHinh] = useState("all");
  const [gia, setGia] = useState("all");
  const [huong, setHuong] = useState("all");
  const [activeTag, setActiveTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState<RealEstateItem | null>(null);
  const [soDoUrl, setSoDoUrl] = useState<string | null>(null);

  const itemsPerPage = 6;

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const target = initialData.find((p) => p.id === parseInt(idParam));
      if (target) {
        setSelectedItem(target);
        document.body.style.overflow = 'hidden';
      }
    } else {
      setSelectedItem(null);
      document.body.style.overflow = '';
    }
  }, [searchParams, initialData]);

  const filteredData = useMemo(() => {
    let result = [...initialData];
    if (khuVuc !== "all") result = result.filter((i) => i.khuVuc === khuVuc);
    if (loaiHinh !== "all") result = result.filter((i) => i.loaiHinh === loaiHinh);
    if (huong !== "all") result = result.filter((i) => i.huong?.toLowerCase().includes(huong.toLowerCase()));
    
    if (gia !== "all") {
      if (gia === "duoi3") result = result.filter((i) => i.soGia < 3.0);
      else if (gia === "3to5") result = result.filter((i) => i.soGia >= 3.0 && i.soGia <= 5.0);
      else if (gia === "tren5") result = result.filter((i) => i.soGia > 5.0);
    }

    if (activeTag === "mattien") result = result.filter((i) => i.isMatTien === true || i.isMatTien === "TRUE");
    if (activeTag === "chinhchu") result = result.filter((i) => i.tag?.includes("Chính Chủ"));

    return result;
  }, [initialData, khuVuc, loaiHinh, gia, huong, activeTag]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const triggerOpenProduct = (item: RealEstateItem) => {
    router.push(`?id=${item.id}`, { scroll: false });
  };

  const triggerCloseProduct = () => {
    router.push("/", { scroll: false });
  };

  return (
    <>
      <section className="max-w-7xl mx-auto w-full px-4 -mt-10 relative z-10">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1 tracking-wider">Khu Vực</label>
              <select value={khuVuc} onChange={e => { setKhuVuc(e.target.value); setCurrentPage(1); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:border-amber-500 cursor-pointer text-slate-700">
                <option value="all">Tất cả Quận Huyện</option>
                <option value="Hải Châu">Quận Hải Châu</option>
                <option value="Thanh Khê">Quận Thanh Khê</option>
                <option value="Liên Chiểu">Quận Liên Chiểu</option>
                <option value="Cẩm Lệ">Quận Cẩm Lệ</option>
                <option value="Sơn Trà">Quận Sơn Trà</option>
                <option value="Ngũ Hành Sơn">Quận Ngũ Hành Sơn</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1 tracking-wider">Loại Hình</label>
              <select value={loaiHinh} onChange={e => { setLoaiHinh(e.target.value); setCurrentPage(1); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:border-amber-500 cursor-pointer text-slate-700">
                <option value="all">Tất cả Loại hình</option>
                <option value="Nhà phố">Nhà phố / Kiệt</option>
                <option value="Đất nền">Đất nền / Đất ở</option>
                <option value="Căn hộ">Căn hộ / Chung cư</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1 tracking-wider">Khoảng Giá</label>
              <select value={gia} onChange={e => { setGia(e.target.value); setCurrentPage(1); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:border-amber-500 cursor-pointer text-slate-700">
                <option value="all">Tất cả mức giá</option>
                <option value="duoi3">Dưới 3 Tỷ</option>
                <option value="3to5">Từ 3 - 5 Tỷ</option>
                <option value="tren5">Trên 5 Tỷ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1 tracking-wider">Hướng Nhà</label>
              <select value={huong} onChange={e => { setHuong(e.target.value); setCurrentPage(1); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:border-amber-500 cursor-pointer text-slate-700">
                <option value="all">Tất cả các hướng</option>
                <option value="Đông">Hướng Đông</option>
                <option value="Tây">Hướng Tây</option>
                <option value="Nam">Hướng Nam</option>
                <option value="Bắc">Hướng Bắc</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 items-center">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1 tracking-wider hidden sm:inline">Lọc nhanh:</span>
            <button onClick={() => { setActiveTag("all"); setCurrentPage(1); }} className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${activeTag === "all" ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600'}`}>Tất Cả</button>
            <button onClick={() => { setActiveTag("mattien"); setCurrentPage(1); }} className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${activeTag === "mattien" ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-500'}`}>Mặt Tiền Kinh Doanh</button>
            <button onClick={() => { setActiveTag("chinhchu"); setCurrentPage(1); }} className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${activeTag === "chinhchu" ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-500'}`}>Hàng Chính Chủ</button>
          </div>
        </div>
      </section>

      <main id="listing-section" className="max-w-7xl mx-auto w-full px-4 mt-16 mb-20 flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <p className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-1.5">Giỏ hàng cập nhật liên tục</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Nhà Đất Được Quan Tâm</h2>
          </div>
          <p className="text-sm text-slate-400 font-medium">Hình ảnh khảo sát thực tế • Không tin ảo • Cập nhật tự động</p>
        </div>

        {displayedItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm font-medium">Không tìm thấy sản phẩm nhà đất nào phù hợp với bộ lọc hiện tại.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayedItems.map((item) => (
              <RealEstateCard key={item.id} item={item} onClick={() => triggerOpenProduct(item)} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="col-span-full flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button key={p} onClick={() => { setCurrentPage(p); window.scrollTo({ top: (document.getElementById("listing-section")?.offsetTop || 0) - 90, behavior: "smooth" }); }} className={`w-9 h-9 rounded-xl text-sm transition-all font-bold ${p === currentPage ? 'bg-amber-500 text-slate-900 shadow-sm font-extrabold scale-105' : 'bg-white border border-slate-200 text-slate-600'}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </main>

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={triggerCloseProduct} onOpenSoDo={(url) => setSoDoUrl(url)} />
      )}

      {soDoUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <button onClick={() => setSoDoUrl(null)} className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all">
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-3xl w-full max-h-[85vh] flex items-center justify-center overflow-hidden rounded-xl">
            <img src={soDoUrl} alt="Sổ đỏ" className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-xl" />
          </div>
        </div>
      )}
    </>
  );
}