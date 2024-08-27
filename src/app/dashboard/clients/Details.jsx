"use client";

import { Tabs } from "antd";
import { useState } from "react";
import Details from "./components/Details";

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
      {tab === "details" && <Details selectedClient={selectedClient} />}
    </>
  );
};

export default ClientDetails;
