"use client";

// import { LineChart } from "@tremor/react";
import { Avalanche, Eye, EyeSlash, Wallet3 } from "iconsax-react";
import { useState } from "react";
import { chartdata } from "./data";
import { DatePicker, Spin } from "antd";
import ReactApexChart from "react-apexcharts";

const filters = [
  { title: "Today", filter: "today" },
  { title: "This Week", filter: "thisWeek" },
  { title: "Last 7 days", filter: "last7" },
  { title: "Last 30 days", filter: "last30" },
  { title: "This Month", filter: "thisMonth" },
  // { title: "custom", filter: "custom" },
];

export default function Dashboard() {
  const [filterSet, setFilter] = useState("today");
  const [showAvailable, setShowAvailable] = useState(true);
  const [showUnsettled, setShowUnsettled] = useState(true);
  const [showLast, setShowLast] = useState(true);

  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white grid grid-cols-1 md:grid-cols-3 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl gap-5 2xl:gap-10">
        <div className="flex gap-2 p-3 lg:p-4 2xl:p-6 rounded-lg 2xl:rounded-xl justify-between bg-bottom bg-no-repeat bg-auto bg-mesh01">
          <div className="flex gap-3 2xl:gap-4">
            <div className="size-8 2xl:size-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-800">
              <Wallet3 variant="linear" className="size-4 2xl:size-6" />
            </div>
            <div className="flex flex-col gap-2 text-neutral-50">
              <p className="text-sm 2xl:text-base">Available Balance</p>
              <p className="font-bold text-lg lg:text-xl 2xl:text-2xl font-geistSans">
                {showAvailable ? "₦3,000,000.00" : "*****"}
              </p>
              <p className="text-sm 2xl:text-base mt-auto">
                View Balance History
              </p>
            </div>
          </div>
          {showAvailable ? (
            <Eye
              onClick={() => setShowAvailable(!showAvailable)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-50 hover:text-white mt-4 hover:cursor-pointer"
            />
          ) : (
            <EyeSlash
              onClick={() => setShowAvailable(!showAvailable)}
              variant="linear"
              className="size-4 2xl:size-6  text-neutral-50 hover:text-white mt-4 hover:cursor-pointer"
            />
          )}
        </div>
        <div className="flex gap-2 p-3 lg:p-4 2xl:p-6 rounded-lg 2xl:rounded-xl justify-between bg-white border 2xl:border-2 border-neutral-200">
          <div className="flex gap-3 2xl:gap-4">
            <div className="size-8 2xl:size-12 bg-[#FEF3F2] rounded-full flex items-center justify-center text-darkRed">
              <Wallet3 variant="linear" className="size-4 2xl:size-6" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-neutral-500 text-sm 2xl:text-base">
                Unsettled Balance
              </p>
              <p className="font-geistSans font-bold text-lg lg:text-xl 2xl:text-2xl">
                {showUnsettled ? "₦39,000.00" : "*****"}
              </p>

              <p className="text-primary-600 text-sm 2xl:text-base mt-auto">
                View Payment History
              </p>
            </div>
          </div>
          {showUnsettled ? (
            <Eye
              onClick={() => setShowUnsettled(!showUnsettled)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-500 mt-4 hover:text-primary-main hover:cursor-pointer"
            />
          ) : (
            <EyeSlash
              onClick={() => setShowUnsettled(!showUnsettled)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-500 mt-4 hover:text-primary-main hover:cursor-pointer"
            />
          )}
        </div>
        <div className="flex gap-2 p-3 lg:p-4 2xl:p-6 rounded-lg 2xl:rounded-xl justify-between bg-white border 2xl:border-2 border-neutral-200">
          <div className="flex gap-3 2xl:gap-4">
            <div className="size-8 2xl:size-12 bg-[#ECFDF3] rounded-full flex items-center justify-center text-darkGreen">
              <Wallet3 variant="linear" className="size-4 2xl:size-6" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-neutral-500 text-sm 2xl:text-base">
                Last Settlement
              </p>
              <p className="font-geistSans font-bold text-lg lg:text-xl 2xl:text-2xl">
                {showLast ? "₦39,000.00" : "*****"}
              </p>

              <p className="text-primary-600 text-sm 2xl:text-base mt-auto">
                View Payment History
              </p>
            </div>
          </div>
          {showLast ? (
            <Eye
              onClick={() => setShowLast(!showLast)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-500 mt-4 hover:text-primary-main hover:cursor-pointer"
            />
          ) : (
            <EyeSlash
              onClick={() => setShowLast(!showLast)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-500 mt-4 hover:text-primary-main hover:cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex bg-white rounded-xl 2xl:rounded-2xl overflow-y-auto no-scrollbar px-6 2xl:px-8 py-4 2xl:py-6">
        <div className="flex flex-col gap-4 2xl:gap-8 w-full pb-4 2xl:pb-6">
          <div className="flex items-center">
            {filters?.map((filter, ind) => (
              <div
                key={ind}
                onClick={() => setFilter(filter?.filter)}
                className={`border-y 2xl:border-y-2 py-2 px-4 flex items-center justify-center hover:cursor-pointer ${
                  filterSet === filter?.filter
                    ? "border-primary-700 text-primary-700 bg-[#F5F5FF]"
                    : "border-neutral-200 text-neutral-700"
                } ${
                  filter?.filter === "today" &&
                  "rounded-s-lg 2xl:rounded-s-xl border-l 2xl:border-l-2"
                } ${
                  filter.filter === "custom" &&
                  "rounded-e-lg 2xl:rounded-e-xl border-r 2xl:border-r-2"
                }`}
              >
                {filter?.title}
              </div>
            ))}
            <DatePicker.RangePicker
              format={"MMM d"}
              className="rounded-e-lg 2xl:rounded-e-xl border 2xl:border-2 py-[9px] px-4 rounded-s-none border-neutral-200 hover:border-primary-700 w-40 h-full"
            />
          </div>
          <div className="border 2xl:border-2 border-neutral-200 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl flex flex-col">
            <p className="font-bold text-lg">Payment Trend</p>
            <div className="flex flex-col-reverse lg:flex-row gap-3 2xl:gap-8">
              <div className="w-full overflow-x-auto">
                <Spin spinning={false}>
                  <div id="chart" className="min-w-[40rem] overflow-hidden">
                    <ReactApexChart
                      options={{
                        labels: chartdata?.map((usage) => usage?.date),
                        stroke: {
                          width: [0, 2],
                          curve: "smooth"
                        },
                        markers: {
                          size: [0, 0],
                          shape: "circle",
                        },
                        colors: [
                          "#4B4EFC",
                          "#22C55E",
                          // "#B692F6",
                        ],
                        legend: {
                          position: "top",
                          horizontalAlign: "center",
                        },
                        // yaxis: [
                        //   {
                        //     seriesName: "Volume",
                        //     axisTicks: {
                        //       show: true,
                        //     },
                        //     axisBorder: {
                        //       show: true,
                        //     },
                        //     title: {
                        //       text: "Columns",
                        //     },
                        //   },
                        //   {
                        //     opposite: true,
                        //     seriesName: "Value",
                        //     axisTicks: {
                        //       show: true,
                        //     },
                        //     axisBorder: {
                        //       show: true,
                        //     },
                        //     title: {
                        //       text: "Percentage (for Rate)",
                        //     },
                        //     forceNiceScale: true,
                        //   },
                        // ],
                      }}
                      series={[
                        {
                          data: chartdata?.map((usage) => usage?.Volume),
                          type: "column",
                          name: "Volume",
                        },
                        {
                          data: chartdata?.map((usage) => usage?.Value),
                          type: "line",
                          name: "Value",
                          
                        },
                      ]}
                      type="line"
                      height={500}
                      
                    />
                  </div>
                </Spin>
                <div id="html-dist"></div>
              </div>
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
                  <p className="font-bold font-geistSans text-2xl 2xl:text-3xl">
                    ₦2,585,000.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border 2xl:border-2 border-neutral-200 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl flex flex-col">
            <p className="font-bold text-lg">Payout Trend</p>
            <div className="flex flex-col-reverse lg:flex-row gap-3 2xl:gap-8">
              <div className="w-full overflow-x-auto">
                <Spin spinning={false}>
                  <div id="chart" className="min-w-[40rem] overflow-hidden">
                    <ReactApexChart
                      options={{
                        labels: chartdata?.map((usage) => usage?.date),
                        stroke: {
                          width: [0, 2],
                          curve: "smooth"
                        },
                        markers: {
                          size: [0, 0],
                          shape: "circle",
                        },
                        colors: [
                          "#4B4EFC",
                          "#22C55E",
                          // "#B692F6",
                        ],
                        legend: {
                          position: "top",
                          horizontalAlign: "center",
                        },
                        // yaxis: [
                        //   {
                        //     seriesName: "Volume",
                        //     axisTicks: {
                        //       show: true,
                        //     },
                        //     axisBorder: {
                        //       show: true,
                        //     },
                        //     title: {
                        //       text: "Columns",
                        //     },
                        //   },
                        //   {
                        //     opposite: true,
                        //     seriesName: "Value",
                        //     axisTicks: {
                        //       show: true,
                        //     },
                        //     axisBorder: {
                        //       show: true,
                        //     },
                        //     title: {
                        //       text: "Percentage (for Rate)",
                        //     },
                        //     forceNiceScale: true,
                        //   },
                        // ],
                      }}
                      series={[
                        {
                          data: chartdata?.map((usage) => usage?.Volume),
                          type: "column",
                          name: "Volume",
                        },
                        {
                          data: chartdata?.map((usage) => usage?.Value),
                          type: "line",
                          name: "Value",
                        },
                      ]}
                      type="line"
                      height={500}
                    />
                  </div>
                </Spin>
                <div id="html-dist"></div>
              </div>
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
                  <p className="font-bold font-geistSans text-2xl 2xl:text-3xl">
                    ₦2,585,000.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
