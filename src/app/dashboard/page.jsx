"use client";

import { LineChart } from "@tremor/react";
import { Eye, Wallet3 } from "iconsax-react";
import { useState } from "react";
import { chartdata } from "./data";
import customTooltip from "../components/chartTooltip";

const filters = [
  { title: "Today", filter: "today" },
  { title: "This Week", filter: "thisWeek" },
  { title: "Last 7 days", filter: "last7" },
  { title: "Last 30 days", filter: "last30" },
  { title: "This Month", filter: "thisMonth" },
  { title: "custom", filter: "custom" },
];

export default function Dashboard() {
  const [filterSet, setFilter] = useState("today");
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white grid grid-cols-1 md:grid-cols-3 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl gap-5 2xl:gap-10">
        <div className="flex gap-2 p-6 rounded-lg 2xl:rounded-xl justify-between bg-right-top bg-no-repeat bg-cover bg-mesh01">
          <div className="size-10 2xl:size-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-800">
            <Wallet3 variant="linear" className="size-5 2xl:size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-50 text-sm 2xl:text-base">
              Available Balance
            </p>
            <p className="text-white font-satoshi font-bold text-2xl">
              ₦3,000,000.00
            </p>

            <p className="text-neutral-50 text-sm 2xl:text-base mt-auto">
              View Balance History
            </p>
          </div>
          <Eye variant="linear" className="size-5 2xl:size-6 text-white mt-4" />
        </div>
        <div className="flex gap-2 p-6 rounded-lg 2xl:rounded-xl justify-between bg-white border 2xl:border-2 border-neutral-200">
          <div className="size-10 2xl:size-12 bg-[#FEF3F2] rounded-full flex items-center justify-center text-darkRed">
            <Wallet3 variant="linear" className="size-5 2xl:size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-500 text-sm 2xl:text-base">
              Unsettled Balance
            </p>
            <p className="font-satoshi font-bold text-2xl">₦39,000.00</p>

            <p className="text-primary-600 text-sm 2xl:text-base mt-auto">
              View Payment History
            </p>
          </div>
          <Eye
            variant="linear"
            className="size-5 2xl:size-6 text-neutral-500 mt-4"
          />
        </div>
        <div className="flex gap-2 p-6 rounded-lg 2xl:rounded-xl justify-between bg-white border 2xl:border-2 border-neutral-200">
          <div className="size-10 2xl:size-12 bg-[#ECFDF3] rounded-full flex items-center justify-center text-darkGreen">
            <Wallet3 variant="linear" className="size-5 2xl:size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-500 text-sm 2xl:text-base">
              Last Settlement
            </p>
            <p className="font-satoshi font-bold text-2xl">₦39,000.00</p>

            <p className="text-primary-600 text-sm 2xl:text-base mt-auto">
              View Payment History
            </p>
          </div>
          <Eye
            variant="linear"
            className="size-5 2xl:size-6 text-neutral-500 mt-4"
          />
        </div>
      </div>
      <div className="bg-white flex flex-col px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl gap-4 2xl:gap-8">
        <div className="flex items-center">
          {filters?.map((filter, ind) => (
            <div
              key={ind}
              onClick={() => setFilter(filter?.filter)}
              className={`border-y border-l 2xl:border-y-2 py-2 px-4 2xl:border-l-2 flex items-center justify-center hover:cursor-pointer ${
                filterSet === filter?.filter
                  ? "border-primary-700 text-primary-700 border-x 2xl:border-x-2"
                  : "border-neutral-200 text-neutral-700"
              } ${
                filter?.filter === "today" && "rounded-s-lg 2xl:rounded-s-xl"
              } ${
                filter.filter === "custom" &&
                "rounded-e-lg 2xl:rounded-e-xl border-r 2xl:border-r-2"
              }`}
            >
              {filter?.title}
            </div>
          ))}
        </div>
        <div className="border 2xl:border-2 border-neutral-200 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl flex flex-col">
          <p className="font-bold text-lg">Payment Trend</p>
          <div className="flex flex-col-reverse lg:flex-row gap-3 2xl:gap-8">
            <LineChart
              className="h-72"
              data={chartdata}
              index="date"
              categories={["Volume", "Value"]}
              colors={["blue", "green"]}
              yAxisWidth={30}
              customTooltip={customTooltip}
            />
            <div className="w-full lg:w-1/4 2xl:w-1/5 flex flex-col gap-4 2xl:gap-6">
              <div className="flex flex-col">
                <p className="text-neutral-700 text-sm 2xl:text-base">
                  Total Volume
                </p>
                <p className="font-bold text-2xl 2xl:text-3xl">3000</p>
              </div>
              <div className="flex flex-col">
                <p className="text-neutral-700 text-sm 2xl:text-base">
                  Total Value
                </p>
                <p className="font-bold font-satoshi text-2xl 2xl:text-3xl">
                  ₦2,585,000.00
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border 2xl:border-2 border-neutral-200 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl flex flex-col">
          <p className="font-bold text-lg">Payout Trend</p>
          <div className="flex flex-col-reverse lg:flex-row"></div>
        </div>
      </div>
    </div>
  );
}
