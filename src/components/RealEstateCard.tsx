import React from "react";
import { MapPin, Clock, Square, Bed, ChevronRight, Compass } from "lucide-react";
import { RealEstateItem, tinhThoiGianCachDay } from "@/utils/googleSheet";

interface CardProps {
  item: RealEstateItem;
  onClick: () => void;
}

export default function RealEstateCard({ item, onClick }: CardProps) {
  const vanBanCachDay = tinhThoiGianCachDay(item.ngayDang);
  const danhSachAnh = item.anh ? item.anh.split(",").map(url => url.trim()).filter(url => url !== '') : [];
  const anhDaiDien = danhSachAnh.length > 0 ? danhSachAnh[0] : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600';

  return (
    <article onClick={onClick} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={anhDaiDien} alt={item.tieude} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <span className={`absolute top-3 left-3 ${item.tagColor || 'bg-slate-900'} text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-sm`}>
          {item.tag || 'Bán Đất'}
        </span>
        {item.huong && (
          <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 font-extrabold text-[10px] px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
            <Compass className="w-3 h-3 text-amber-500" />{item.huong}
          </span>
        )}
        <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-400" /> {vanBanCachDay}
        </span>
        <span className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm text-white font-extrabold text-sm px-3 py-1 rounded-xl shadow-md">
          {item.gia}
        </span>
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span className="truncate">{item.khuVucFull}</span>
          </div>
          <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-amber-500 text-sm sm:text-base leading-snug transition-colors">
            {item.tieude}
          </h3>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-slate-500 text-sm font-medium">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
            <span><Square className="w-3.5 h-3.5 inline mr-0.5" /> {item.dienTich}</span>
            <span><Bed className="w-3.5 h-3.5 inline mr-0.5" /> {item.phongNgu || 'Đất ở'}</span>
          </div>
          <span className="text-amber-500 font-bold flex items-center gap-0.5 text-xs uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
            Chi tiết <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  );
}