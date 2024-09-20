"use client";

import { Tabs } from "antd";
import { useState } from "react";
import Profile from "./components/Profile";
import BusinessInformation from "./components/Business";
import Passwords from "./components/Passwords";
import Teams from "./components/Teams";
import Payin from "./components/Payin";
import Payout from "./components/Payout";
import Recharge from "./components/Recharge";

export default function Settings() {
  const [tab, setTab] = useState("profile");
  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl flex flex-col gap-4 2xl:gap-5 h-full">
        <div className="flex flex-col gap-4 2xl:gap-8 w-full overflow-y-auto no-scrollbar h-full">
          <Tabs
            activeKey={tab}
            onChange={(key) => setTab(key)}
            items={[
              { key: "profile", label: "Profile" },
              { key: "information", label: "Business Information" },
              { key: "passwords", label: "Passwords" },
              { key: "teams", label: "Teams" },
              { key: "payin", label: "Payin Rate" },
              { key: "payout", label: "Payout Rate" },
              { key: "recharge", label: "Recharge Account" },
            ]}
          />
          {tab === "profile" && <Profile />}
          {tab === "information" && <BusinessInformation />}
          {tab === "passwords" && <Passwords />}
          {tab === "teams" && <Teams />}
          {tab === "payin" && <Payin />}
          {tab === "payout" && <Payout />}
          {tab === "recharge" && <Recharge />}
        </div>
      </div>
    </div>
  );
}
