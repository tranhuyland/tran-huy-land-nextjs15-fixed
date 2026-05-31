"use client";
import React, { useState } from "react";
import { X, PenTool } from "lucide-react";

interface DepositModalProps {
  onClose: () => void;
}

export default function DepositModal({ onClose }: DepositModalProps) {
  const [ten, setTen] = useState("");
  const [diachi, setDiachi] = useState("");
  const [gia, setGia] = useState("");

  const xuLyGuiFormKyGui = (event: React.FormEvent) => {
    event.preventDefault();
    const giaTriGia = gia || "Thương lượng";
    const tinNhan = `Chào anh Huy, tôi muốn ký gửi nhà đất với thông tin:\n- Liên hệ: ${ten}\n- Địa chỉ: ${diachi}\n- Giá mong muốn: ${giaTriGia}`;
    
    navigator.clipboard.writeText(tinNhan).then(() => {
      alert("📋 Đã tự động sao chép thông tin ký gửi!\nHệ thống đang mở Zalo anh Huy, bạn chỉ cần bấm chọn 'DÂN' (Paste) và gửi đi là xong ngay nhé.");
      window.open("https://zalo.me/0931555551", "_blank");
      onClose();
    }).catch(() => {
      window.open("https://zalo.me/0931555551", "_blank");
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
        <h3 className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
          <PenTool className="text-amber-500 w-4 h-4" /> Ký Gửi Nhanh Trong 10s
        </h3>
        <p className="text-xs text-slate-400 mb-4">Thông tin đăng ký sẽ tự động soạn thảo để gửi trực tiếp sang ứng dụng Zalo của anh Huy.</p>
        <form onSubmit={xuLyGuiFormKyGui} className="space-y-3 text-sm">
          <div>
            <label className="block font-bold text-slate-600 mb-1">Tên & SĐT Liên Hệ *</label>
            <input type="text" value={ten} onChange={e => setTen(e.target.value)} required placeholder="Ví dụ: Anh Nam - 0905..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">Địa Chỉ Nhà Đất Ký Gửi *</label>
            <input type="text" value={diachi} onChange={e => setDiachi(e.target.value)} required placeholder="Số nhà, tên đường, tên quận..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">Giá Bán Mong Muốn</label>
            <input type="text" value={gia} onChange={e => setGia(e.target.value)} placeholder="Ví dụ: 3.5 Tỷ (Để trống nếu muốn thương lượng)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500" />
          </div>
          <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl py-3 text-sm mt-3 shadow-md transition-all active:scale-95">Xác Nhận Ký Gửi</button>
        </form>
      </div>
    </div>
  );
}