"use client";

import { Tabs } from "antd";
import { useState } from "react";
import Details from "./components/Details";
import Payin from "./components/Payin";
import Password from "./components/Password";
import Payout from "./components/Payout";

const ClientDetails = ({
  selectedClient,
  setSelectedClient,
  setCurrentPage,
}) => {
  const [tab, setTab] = useState("details");
  return (
    <>
      <Tabs
        activeKey={tab}
        onChange={(key) => setTab(key)}
        items={[
          { key: "details", label: "Client Details" },
          { key: "payin", label: "Payin Configuration" },
          { key: "payout", label: "Payout Configuration" },
          { key: "reset", label: "Reset Password" },
        ]}
      />
      {tab === "details" && (
        <Details
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          setCurrentPage={setCurrentPage}
        />
      )}
      {tab === "payin" && (
        <Payin
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          setCurrentPage={setCurrentPage}
        />
      )}
      {tab === "payout" && (
        <Payout
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          setCurrentPage={setCurrentPage}
        />
      )}
      {tab === "reset" && (
        <Password
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default ClientDetails;
