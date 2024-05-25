"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Coin1,
  Wallet3,
  PercentageSquare,
  Profile2User,
  Element2,
  Setting2,
  Notification,
  User,
} from "iconsax-react";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Navigate, useLocation } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store, { persistor } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function DashboardLayout({ children }) {
  const location = usePathname();
  const [child, setChild] = useState(null);
  console.log(location.split("/"));

  const paths = [
    {
      icon: (
        <Element2 variant={location === "/dashboard" ? "Bold" : "Outline"} />
      ),
      title: "Dashboard",
      link: "/dashboard",
      desc: `Welcome Temitope Famuyiwa`,
      children: null,
    },
    {
      icon: (
        <PercentageSquare
          variant={location === "/dashboard/payments" ? "Bold" : "Outline"}
        />
      ),
      title: "Payments",
      link: "/dashboard/payments",
      desc: "Manage your payments summary.",
      children: [
        { link: "/dashboard/payments/history", title: "Payments History" },
        { link: "/dashboard/payments/exclusive", title: "Exclusive Payments" },
      ],
    },
    {
      icon: (
        <Coin1
          variant={location === "/dashboard/payouts" ? "Bold" : "Outline"}
        />
      ),
      title: "Payouts",
      link: "/dashboard/payouts",
      desc: "Get an overview of your payouts history.",
      children: null,
    },
    {
      icon: (
        <Wallet3
          variant={location === "/dashboard/balances" ? "Bold" : "Outline"}
        />
      ),
      title: "Balances",
      link: "/dashboard/balances",
      desc: "",
      children: null,
    },
    {
      icon: (
        <Profile2User
          variant={location === "/dashboard/customers" ? "Bold" : "Outline"}
        />
      ),
      title: "Customers",
      link: "/dashboard/customers",
      desc: "",
      children: null,
    },
    {
      icon: (
        <Profile2User
          variant={location === "/dashboard/teams" ? "Bold" : "Outline"}
        />
      ),
      title: "Teams",
      link: "/dashboard/teams",
      desc: "Invite your team members here.",
      children: null,
    },
    {
      icon: (
        <Setting2
          variant={location === "/dashboard/settings" ? "Bold" : "Outline"}
        />
      ),
      title: "Settings",
      link: "/dashboard/settings",
      desc: "Manage your profile, teams and preference here.",
      children: null,
    },
  ];

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return isLoggedIn ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="bg-neutral-50 flex justify-center items-center h-screen w-full relative overflow-y-auto p-6 2xl:p-10 gap-6 ">
          <div className="flex flex-col bg-white rounded-xl 2xl:rounded-2xl w-1/4 2xl:w-1/5 pt-6 2xl:pt-12 gap-3 sticky left-0 top-0 bottom-0 h-full justify-between">
            <div className="flex flex-col px-2 gap-4">
              <div className="flex gap-4 items-center">
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={30}
                  height={30}
                  className="ml-16"
                />
                <p className="font-bold text-3xl 2xl:text-4xl">NGPAY</p>
              </div>
              <div className="flex flex-col gap-2 relative">
                {paths?.map((path, ind) => (
                  <div key={ind} className="flex flex-col">
                    <Link
                      suppressHydrationWarning={true}
                      href={path?.children ? location : path?.link}
                      onClick={() =>
                        path.children
                          ? child
                            ? setChild(null)
                            : setChild(ind)
                          : null
                      }
                      className={`relative flex py-2 2xl:py-4 px-3 2xl:px-6 gap-2 2xl:gap-3 items-center rounded-md 2xl:rounded-lg hover:text-primary-700 ${
                        path?.link === location
                          ? "text-primary-700 bg-primary-50 font-semibold"
                          : "text-neutral-700 bg-primary-transparent font-medium"
                      }`}
                    >
                      {path?.icon}
                      <p>{path?.title}</p>
                      {path?.children && <FaAngleDown className="ml-auto" />}
                    </Link>
                    {path?.children && child === ind && (
                      <div className="flex flex-col">
                        {path?.children?.map((subPath, idx) => (
                          <Link
                            key={idx}
                            suppressHydrationWarning={true}
                            href={subPath?.link}
                            className={`relative flex py-2 2xl:py-4 pr-3 pl-14 2xl:pl-16 2xl:pr-6 gap-2 2xl:gap-3 items-center rounded-md 2xl:rounded-lg hover:text-primary-700 ${
                              global?.window && path?.link === location
                                ? "text-primary-700 bg-primary-50 font-semibold"
                                : "text-neutral-700 bg-primary-transparent font-medium"
                            }`}
                          >
                            {subPath?.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 h-full">
            <div className="bg-white flex items-center px-6 2xl:px-7 py-4 2xl:py-5 rounded-xl 2xl:rounded-2xl justify-between">
              <div className="flex flex-col gap-2 2xl:gap-3">
                {paths
                  ?.filter((path) => path?.link === location)
                  ?.map((path, ind) => (
                    <>
                      <p className="font-bold text-2xl capitalize">
                        {path?.title}
                      </p>
                      <p>{path?.desc}</p>
                    </>
                  ))}
              </div>
              <div className="flex items-center gap-3 2xl:gap-4 text-neutral-700">
                <div className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-200 shadow-xSmall hover:text-primary-main hover:border-primary-main">
                  <Notification variant="linear" className="ize-5" />
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-200 shadow-xSmall hover:text-primary-main hover:border-primary-main">
                  <User variant="linear" className="size-5" />
                </div>
              </div>
            </div>
            <div className="h-full overflow-y-auto no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      </PersistGate>
    </Provider>
  ) : (
    <Navigate to={"/log-in"} state={{ from: location }} replace />
  );
}
