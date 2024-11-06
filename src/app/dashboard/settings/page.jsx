"use client";

import { Tabs } from "antd";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";
import BusinessInformation from "./components/Business";
import Passwords from "./components/Passwords";
import Teams from "./components/Teams";
import Payin from "./components/Payin";
import Payout from "./components/Payout";
import Recharge from "./components/Recharge";
import { useDispatch, useSelector } from "react-redux";
import store from "@/app/redux/store/store";
import { getClientPayout, getClientsList } from "@/app/redux/features/clients";

export default function Settings() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("profile");
  const [clientData, setClientData] = useState(null);
  const [payoutData, setPayoutData] = useState(null);

  const { userLogin } = useSelector(() => store.getState().login);
  const { payoutConf, clientsList } = useSelector(
    () => store.getState().client
  );

  useEffect(() => {
    dispatch(
      getClientPayout({
        page: 1,
        page_size: 10,
        mchid: userLogin?.mchid,
      })
    );
    dispatch(
      getClientsList({
        page: 1,
        page_size: 10,
        mchid: userLogin?.mchid,
      })
    );
  }, []);

  useEffect(() => {
    if (payoutConf && payoutConf?.results) {
      setPayoutData(payoutConf?.results[0]);
    }
    if (clientsList && clientsList?.results) {
      setClientData(clientsList?.results[0]);
    }
  }, [payoutConf, clientsList]);
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
          {tab === "profile" && <Profile userProfile={userLogin} />}
          {tab === "information" && (
            <BusinessInformation clientData={clientData} />
          )}
          {tab === "passwords" && <Passwords />}
          {tab === "teams" && <Teams />}
          {tab === "payin" && <Payin payinConf={clientData} />}
          {tab === "payout" && <Payout payoutConf={payoutData} />}
          {tab === "recharge" && <Recharge payoutConf={payoutData} />}
        </div>
      </div>
    </div>
  );
}
