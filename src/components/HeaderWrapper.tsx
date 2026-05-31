"use client";
import React, { useState } from "react";
import Header from "./Header";
import DepositModal from "./DepositModal";
import { Phone, FilePlus2 } from "lucide-react";

export default function HeaderWrapper() {
  const [isOpenDeposit, setIsOpenDeposit] = useState(false);

  return (
    <>
      <Header onOpenDeposit={() => setIsOpenDeposit(true)} />
      
      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex gap-3 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <button onClick={() => setIsOpenDeposit(true)} className="flex-[2] bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold rounded-xl py-3 px-4 flex items-center justify-center gap-1.5 text-sm shadow-sm active:scale-95 transition-all">
          <FilePlus2 className="w-4 h-4" /> Ký Gửi Nhanh
        </button>
        <a href="tel:0931555551" className="flex-[1.5] bg-slate-900 text-white font-bold rounded-xl py-3 px-4 flex items-center justify-center gap-1.5 text-sm transition-transform active:scale-95 shadow-md">
          <Phone className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Gọi Ngay
        </a>
        <a href="https://zalo.me/0931555551" target="_blank" rel="noreferrer" className="flex-[1.5] bg-[#0068ff] text-white font-bold rounded-xl py-3 px-4 flex items-center justify-center text-sm transition-transform active:scale-95 shadow-md">Zalo</a>
      </div>

      {/* Desktop Floating Action Buttons */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <a href="https://zalo.me/0931555551" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#0068ff] text-white flex items-center justify-center shadow-2xl font-bold text-lg hover:scale-105 transition-transform">
          Zalo
        </a>
        <a href="tel:0931555551" className="w-14 h-14 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shadow-2xl floating">
          <Phone className="w-5 h-5 text-slate-900 fill-slate-900/10" />
        </a>
      </div>

      {isOpenDeposit && <DepositModal onClose={() => setIsOpenDeposit(false)} />}
    </>
  );
}