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
  Login,
} from "iconsax-react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Avatar, Badge } from "antd";

export default function DashboardLayout({ children }) {
  const location = usePathname();
  const [child, setChild] = useState(null);

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
          variant={
            location.includes("/dashboard/payments") ? "Bold" : "Outline"
          }
        />
      ),
      title: "Payments",
      link: "/dashboard/payments",
      desc: "Manage your payments summary.",
      children: [
        {
          link: "/dashboard/payments/history",
          title: "Payments History",
          desc: "Manage your payments summary.",
        },
        {
          link: "/dashboard/payments/exclusive",
          title: "Exclusive Payments",
          desc: "Manage your exclusive payments summary.",
        },
        {
          link: "/dashboard/payments/links",
          title: "Payment Links",
          desc: "Generate payment links and receive payments.",
        },
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
          variant={
            location.includes("/dashboard/balances") ? "Bold" : "Outline"
          }
        />
      ),
      title: "Balances",
      link: "/dashboard/balances",
      desc: "",
      children: [
        {
          link: "/dashboard/balances/history",
          title: "Balance History",
          desc: "Get an overview of your balance history.",
        },
        {
          link: "/dashboard/balances/settlement",
          title: "Settlement History",
          desc: "Get an overview of your settlement history.",
        },
      ],
    },
    {
      icon: (
        <Profile2User
          variant={location === "/dashboard/clients" ? "Bold" : "Outline"}
        />
      ),
      title: "Clients",
      link: "/dashboard/clients",
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

  return (
    <div className="bg-neutral-50 md:grid md:grid-cols-12 justify-center items-center h-screen w-full absolute hidden md:relative overflow-y-auto p-6 2xl:p-10 gap-6 ">
      <div className="flex flex-col bg-white rounded-xl 2xl:rounded-2xl pt-6 2xl:pt-12 gap-3 sticky left-0 top-0 bottom-0 h-full justify-between md:col-span-1 lg:col-span-3 2xl:col-span-2">
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
                    path?.link === location ||
                    (path?.children &&
                      path?.children.find((sub) => sub.link === location))
                      ? "text-primary-700 bg-primary-50 font-semibold"
                      : "text-neutral-700 bg-primary-transparent font-medium"
                  }`}
                >
                  {path?.icon}
                  <p>{path?.title}</p>
                  {path?.children && <FaAngleDown className="ml-auto" />}
                </Link>
                {path?.children && child === ind && (
                  <div className="flex flex-col py-1">
                    {path?.children?.map((subPath, idx) => (
                      <Link
                        key={idx}
                        suppressHydrationWarning={true}
                        href={subPath?.link}
                        className={`relative flex py-2 2xl:py-4 pr-3 pl-14 2xl:pl-16 2xl:pr-6 gap-2 2xl:gap-3 items-center rounded-md 2xl:rounded-lg hover:text-primary-700 ${
                          subPath?.link === location
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
        <div className="flex p-4 lg:p-5 2xl:p-6 border-t border-t-neutral-200 justify-between items-center">
          <div className="flex items-center gap-3">
            <Badge dot color="green" size="large" offset={[-5, 35]}>
              <Avatar className="size-8 2xl:size-10" />
            </Badge>
            <div className="flex flex-col gap-0.5">
              <p className="text-xs lg:text-sm font-medium">Temi Famuyiwa</p>
              <p className="text-xs lg:text-sm text-neutral-500">
                MERCHANT ID:NG1011
              </p>
            </div>
          </div>
          <Login className="text-neutral-500 size-4 2xl:size-6 hover:cursor-pointer" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 h-full md:col-span-11 lg:col-span-9 2xl:col-span-10">
        <div className="bg-white flex items-center px-6 2xl:px-7 py-4 2xl:py-5 rounded-xl 2xl:rounded-2xl justify-between">
          <div className="flex flex-col gap-2 2xl:gap-3">
            {paths
              ?.filter((path) =>
                path.children
                  ? location.includes(path?.link)
                  : path?.link === location
              )
              ?.map((path, ind) => {
                if (path?.children) {
                  let subPath = path?.children.find(
                    (subPath) => subPath?.link === location
                  );
                  return (
                    <div key={ind}>
                      <p className="font-bold text-2xl capitalize">
                        {subPath?.title}
                      </p>
                      <p>{subPath?.desc}</p>
                    </div>
                  );
                } else
                  return (
                    <div key={ind}>
                      <p className="font-bold text-2xl capitalize">
                        {path?.title}
                      </p>
                      <p>{path?.desc}</p>
                    </div>
                  );
              })}
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
        <div className="h-full overflow-y-auto no-scrollbar">{children}</div>
      </div>
    </div>
  );
}
