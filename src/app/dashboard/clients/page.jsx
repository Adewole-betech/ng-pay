"use client";

import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import ClientsPage from "./Clients";
import ClientDetails from "./Details";
import { getClientPayout } from "@/app/redux/features/clients";
import { PageContext } from "../layout";

export default function Clients() {
  const dispatch = useDispatch();
  const setDescription = useContext(PageContext);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (selectedClient) {
      dispatch(
        getClientPayout({
          page: 1,
          page_size: 10,
          mchid: selectedClient?.mchid,
        })
      );
    }
  }, [selectedClient]);

  function changePage() {
    setCurrentPage("dashboard");
  }

  useEffect(() => {
    if (currentPage === "dashboard") {
      setDescription({ page: "", link: "", action: null });
    } else if (currentPage === "details") {
      setDescription({
        page: selectedClient?.name,
        link: "Clients",
        action: changePage,
      });
    }
  }, [currentPage]);

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
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
          )}
        </div>
      </div>
    </div>
  );
}
