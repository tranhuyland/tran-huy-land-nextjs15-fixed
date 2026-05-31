"use client";
import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Layers, ShieldCheck, MapPin, Calendar, Phone, FileText, Map } from "lucide-react";
import { RealEstateItem, tinhThoiGianCachDay } from "@/utils/googleSheet";

interface DetailModalProps {
  item: RealEstateItem;
  onClose: () => void;
  onOpenSoDo: (url: string) => void;
}

export default function DetailModal({ item, onClose, onOpenSoDo }: DetailModalProps) {
  const vanBanCachDay = tinhThoiGianCachDay(item.ngayDang);
  const danhSachAnh = item.anh ? item.anh.split(",").map(url => url.trim()).filter(url => url !== '') : [];
  const tongSoMuc = danhSachAnh.length + (item.videoUrl ? 1 : 0);

  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

  const slideAction = (direction: "left" | "right") => {
    if (!scrollContainer) return;
    const width = scrollContainer.clientWidth;
    scrollContainer.scrollBy({ left: direction === "right" ? width : -width, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl relative max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-8 h-8 bg-slate-900/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-all shadow">
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto flex-1 no-scrollbar">
          <div className="w-full relative group/slide aspect-[16/10] bg-slate-100">
            <div ref={setScrollContainer} className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
              {item.videoUrl && (
                <div className="w-full h-full flex-shrink-0 snap-start snap-always relative">
                  <iframe className="w-full h-full" src={item.videoUrl} allowFullScreen></iframe>
                </div>
              )}
              {danhSachAnh.map((url, i) => (
                <div key={i} className="w-full h-full flex-shrink-0 snap-start snap-always">
                  <img src={url} alt={item.tieude} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {tongSoMuc > 1 && (
              <>
                <button onClick={() => slideAction("left")} className="absolute left-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all opacity-90 active:scale-90">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => slideAction("right")} className="absolute right-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all opacity-90 active:scale-90">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="bg-slate-900/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md absolute top-4 left-4 z-10 flex items-center gap-1 shadow-sm uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-amber-400" /> Giỏ hàng: {item.videoUrl ? '1 Video & ' : ''}{danhSachAnh.length} Ảnh
                </div>
              </>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="bg-amber-100 text-amber-900 font-extrabold text-base px-3 py-1 rounded-xl shadow-sm">{item.gia}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1" />{item.phapLy || 'Sổ hồng sẵn sàng'}
              </span>
            </div>
            
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 mt-4 leading-snug">{item.tieude}</h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 text-xs mt-2 border-b border-slate-100 pb-4 font-semibold">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" />{item.khuVucFull}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Đăng: {item.ngayDang}</span>
              <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[10px] uppercase">{vanBanCachDay}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 text-center font-semibold shadow-inner">
              <div><div className="text-slate-400 text-[11px] font-bold uppercase mb-0.5 tracking-wider">Diện tích</div><strong className="text-slate-900 text-sm sm:text-base">{item.dienTich}</strong></div>
              <div><div className="text-slate-400 text-[11px] font-bold uppercase mb-0.5 tracking-wider">Cấu trúc</div><strong className="text-slate-900 text-sm sm:text-base">{item.phongNgu || 'Đất ở'}</strong></div>
              <div><div className="text-slate-400 text-[11px] font-bold uppercase mb-0.5 tracking-wider">Hướng</div><strong className="text-slate-900 text-sm sm:text-base">{item.huong || 'Chưa rõ'}</strong></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {item.linkMap && <a href={item.linkMap} target="_blank" rel="noreferrer" className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 rounded-xl py-2.5 px-3 text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"><Map className="w-4 h-4" /> Bản Đồ Vị Trí</a>}
              {item.anhSoDo && <button onClick={() => onOpenSoDo(item.anhSoDo!)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 rounded-xl py-2.5 px-3 text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"><FileText className="w-4 h-4" /> Sổ Đỏ Bản Vẽ</button>}
            </div>

            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2">Mô tả thực tế nhà đất:</h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line mb-6">{item.moTa}</p>
            
            <div className="flex gap-3 mt-4 border-t border-slate-100 pt-4">
              <a href="tel:0931555551" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-sm transition-all active:scale-95 shadow-md">
                <Phone className="w-4 h-4 text-amber-400 fill-amber-400" /> Gọi Thỏa Thuận
              </a>
              <a href="https://zalo.me/0931555551" target="_blank" rel="noreferrer" className="flex-1 bg-[#0068ff] hover:opacity-90 text-white font-extrabold rounded-xl py-3 px-4 flex items-center justify-center text-sm transition-all active:scale-95 shadow-md">Liên Hệ Zalo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}