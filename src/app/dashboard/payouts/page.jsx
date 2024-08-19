"use client";

import { useState } from "react";
import Payout from "./pages/Payout";
import SendMoney from "./pages/SendMoney";

export default function Settlement() {
  const [currentPage, setCurrentPage] = useState("payout");
  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl flex flex-col gap-4 2xl:gap-5 h-full">
        <div className="flex flex-col overflow-y-auto gap-3 lg:gap-4 2xl:gap-5 no-scrollbar">
          {currentPage === "payout" && (
            <Payout setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "send" && (
            <SendMoney setCurrentPage={setCurrentPage} />
          )}
        </div>
      </div>
    </div>
  );
}
