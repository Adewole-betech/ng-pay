"use client";

import { useState } from "react";
import ClientsPage from "./Clients";
import ClientDetails from "./Details";

export default function Clients() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl flex flex-col gap-4 2xl:gap-5 h-full">
        <div className="flex flex-col gap-4 2xl:gap-8 w-full overflow-y-auto no-scrollbar h-full">
          {currentPage === "dashboard" && (
            <ClientsPage
              showNew={showNew}
              setShowNew={setShowNew}
              setCurrentPage={setCurrentPage}
              setSelectedClient={setSelectedClient}
              selectedClient={selectedClient}
            />
          )}
          {currentPage === "details" && (
            <ClientDetails
              setCurrentPage={setCurrentPage}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
          )}
        </div>
      </div>
    </div>
  );
}
