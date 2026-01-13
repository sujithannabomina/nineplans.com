import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="h-8 w-8 rounded-2xl border border-black bg-black text-white flex items-center justify-center font-black">
        9
      </div>
      <div className="leading-tight">
        <div className="text-sm font-extrabold tracking-tight">NinePlans</div>
        <div className="text-[10px] text-black/60 -mt-0.5">anonymous community</div>
      </div>
    </div>
  );
}
