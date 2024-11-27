"use client";

// import { LineChart } from "@tremor/react";
import { Eye, EyeSlash, Wallet3 } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { chartdata } from "./data";
import { DatePicker, Spin } from "antd";
// import ReactApexChart from "react-apexcharts";
import { PageContext } from "./layout";
import { useDispatch, useSelector } from "react-redux";
import store from "@/app/redux/store/store";
import { getClientsList } from "@/app/redux/features/clients";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getBalancesHistory } from "../redux/features/balance/history";
import { getPaymentsTrend } from "../redux/features/payments/history";
import { getPayoutsTrend } from "../redux/features/payout";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/de";

// dayjs.locale("de");
dayjs.extend(weekday);

const DynamicApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Ensure ApexCharts is not imported during SSR
});

export default function Homeboard() {
  const dispatch = useDispatch();
  const [filterSet, setFilter] = useState("today");
  const [showAvailable, setShowAvailable] = useState(true);
  const [showUnsettled, setShowUnsettled] = useState(true);
  const [showLast, setShowLast] = useState(true);
  const [clientData, setClientData] = useState(null);
  const [payoutData, setPayoutData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(["", ""]);

  const onDateChange = (date) => {
    if (date) {
      setSelectedDate([dayjs(date[0]), dayjs(date[1])]);
      setFilter("cust");
    } else {
      setSelectedDate(["", ""]);
      setFilter("");
    }
  };

  const setDescription = useContext(PageContext);

  const { userLogin } = useSelector(() => store.getState().login);
  const { clientsList } = useSelector(() => store.getState().client);
  const { balanceHistory } = useSelector(() => store.getState().balanceHistory);
  const { paymentsTrend, trendLoading: paymentTrendLoading } = useSelector(
    () => store.getState().paymentHistory
  );
  const { payoutsTrend, trendLoading: payoutTrendLoading } = useSelector(
    () => store.getState().payout
  );

  const filters = [
    { title: "Today", filter: "today" },
    { title: "This Week", filter: "thisWeek" },
    { title: "Last 7 days", filter: "last7" },
    { title: "Last 30 days", filter: "last30" },
    { title: "This Month", filter: "thisMonth" },
    // { title: "custom", filter: "custom" },
  ];

  useEffect(() => {
    dispatch(
      getClientsList({
        page: 1,
        page_size: 10,
        mchid: userLogin?.mchid,
      })
    );
    dispatch(
      getBalancesHistory({
        page: 1,
        page_size: 10,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getPaymentsTrend({
        start_date:
          filterSet === "cust"
            ? dayjs(selectedDate[0]).format("YYYY-MM-DD")
            : filterSet === "today"
            ? dayjs().format("YYYY-MM-DD")
            : filterSet === "thisWeek"
            ? dayjs().weekday(0).format("YYYY-MM-DD")
            : filterSet === "last7"
            ? dayjs().subtract(7, "day").format("YYYY-MM-DD")
            : filterSet === "last30"
            ? dayjs().subtract(30, "day").format("YYYY-MM-DD")
            : filterSet === "thisMonth"
            ? dayjs().date(1).format("YYYY-MM-DD")
            : "",
        end_date:
          filterSet === ""
            ? ""
            : filterSet === "cust"
            ? dayjs(selectedDate[1]).format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD"),
      })
    );
    dispatch(
      getPayoutsTrend({
        start_date:
          filterSet === "cust"
            ? dayjs(selectedDate[0]).format("YYYY-MM-DD")
            : filterSet === "today"
            ? dayjs().format("YYYY-MM-DD")
            : filterSet === "thisWeek"
            ? dayjs().weekday(0).format("YYYY-MM-DD")
            : filterSet === "last7"
            ? dayjs().subtract(7, "day").format("YYYY-MM-DD")
            : filterSet === "last30"
            ? dayjs().subtract(30, "day").format("YYYY-MM-DD")
            : filterSet === "thisMonth"
            ? dayjs().date(1).format("YYYY-MM-DD")
            : "",
        end_date:
          filterSet === ""
            ? ""
            : filterSet === "cust"
            ? dayjs(selectedDate[1]).format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD"),
      })
    );
  }, [filterSet]);

  useEffect(() => {
    if (balanceHistory && balanceHistory?.results) {
      setPayoutData(balanceHistory?.results[0]);
    }
    if (clientsList && clientsList?.results) {
      setClientData(clientsList?.results[0]);
    }
  }, [balanceHistory, clientsList]);

  useEffect(() => {
    setDescription({ page: "", link: "", action: null });
  }, []);

  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white grid grid-cols-1 md:grid-cols-3 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl gap-5 2xl:gap-10">
        <div className="flex gap-2 p-3 lg:p-4 2xl:p-6 rounded-lg 2xl:rounded-xl justify-between bg-[center_-500px] bg-no-repeat bg-auto bg-mesh01">
          <div className="flex gap-3 2xl:gap-4">
            <div className="size-8 2xl:size-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-800">
              <Wallet3 variant="linear" className="size-4 2xl:size-6" />
            </div>
            <div className="flex flex-col gap-2 text-neutral-50">
              <p className="text-sm 2xl:text-base">Available Balance</p>
              <p className="font-bold text-lg lg:text-xl 2xl:text-2xl font-geistSans">
                {showAvailable
                  ? `₦${
                      clientData?.availability
                        ? parseFloat(
                            clientData?.availability?.toFixed(2)
                          ).toLocaleString("en-us")
                        : "0.00"
                    }`
                  : "*****"}
              </p>
              <p className="text-sm 2xl:text-base mt-auto">
                View Balance History
              </p>
            </div>
          </div>
          {showAvailable ? (
            <EyeSlash
              onClick={() => setShowAvailable(!showAvailable)}
              variant="linear"
              className="size-4 2xl:size-6  text-neutral-50 hover:text-white mt-4 hover:cursor-pointer"
            />
          ) : (
            <Eye
              onClick={() => setShowAvailable(!showAvailable)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-50 hover:text-white mt-4 hover:cursor-pointer"
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
                {showUnsettled
                  ? `₦${
                      clientData?.balance
                        ? parseFloat(
                            clientData?.balance?.toFixed(2)
                          ).toLocaleString("en-us")
                        : "0.00"
                    }`
                  : "*****"}
              </p>

              <Link
                href={"/dashboard/payments/history"}
                className="text-primary-600 text-sm 2xl:text-base mt-auto"
              >
                View Payment History
              </Link>
            </div>
          </div>
          {showUnsettled ? (
            <EyeSlash
              onClick={() => setShowUnsettled(!showUnsettled)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-500 mt-4 hover:text-primary-main hover:cursor-pointer"
            />
          ) : (
            <Eye
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
                {showLast
                  ? `₦${
                      payoutData?.amount
                        ? parseFloat(
                            payoutData?.amount?.toFixed(2)
                          ).toLocaleString("en-us")
                        : "0.00"
                    }`
                  : "*****"}
              </p>

              <Link
                href={"/dashboard/balances/history"}
                className="text-primary-600 text-sm 2xl:text-base mt-auto"
              >
                View Settlements History
              </Link>
            </div>
          </div>
          {showLast ? (
            <EyeSlash
              onClick={() => setShowLast(!showLast)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-500 mt-4 hover:text-primary-main hover:cursor-pointer"
            />
          ) : (
            <Eye
              onClick={() => setShowLast(!showLast)}
              variant="linear"
              className="size-4 2xl:size-6 text-neutral-500 mt-4 hover:text-primary-main hover:cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex bg-white rounded-xl 2xl:rounded-2xl px-6 2xl:px-8 py-4 2xl:py-6 h-full">
        <div className="flex flex-col gap-4 2xl:gap-8 w-full overflow-y-auto no-scrollbar h-full">
          <div className="flex items-center">
            {filters?.map((filter, ind) => (
              <div
                key={ind}
                onClick={() => {
                  filter?.filter === filterSet
                    ? setFilter("")
                    : setFilter(filter?.filter);
                  setSelectedDate(["", ""]);
                }}
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
              maxDate={dayjs()}
              format={"MMM DD, YYYY"}
              onChange={onDateChange}
              value={selectedDate}
              presets={[
                {
                  label: "Last 7 Days",
                  value: [dayjs().add(-7, "d"), dayjs()],
                },
                {
                  label: "Last 14 Days",
                  value: [dayjs().add(-14, "d"), dayjs()],
                },
                {
                  label: "Last 30 Days",
                  value: [dayjs().add(-30, "d"), dayjs()],
                },
              ]}
              className="rounded-e-lg 2xl:rounded-e-xl border 2xl:border-2 py-[9px] px-4 rounded-s-none border-neutral-200 hover:border-primary-700 w-40 h-full"
            />
          </div>
          <div className="border 2xl:border-2 border-neutral-200 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl flex flex-col">
            <p className="font-bold text-lg">Payment Trend</p>
            <div className="flex flex-col-reverse lg:flex-row gap-3 2xl:gap-8">
              <div className="w-full overflow-x-auto">
                <Spin spinning={paymentTrendLoading}>
                  <div id="chart" className="min-w-[40rem] overflow-hidden">
                    <DynamicApexCharts
                      options={{
                        labels: paymentsTrend?.map((usage) =>
                          dayjs(usage?.date)?.format("MM-DD-YY")
                        ),
                        stroke: {
                          width: [0, 2],
                          curve: "smooth",
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
                      }}
                      series={[
                        {
                          data: paymentsTrend?.map(
                            (usage) => usage?.total_amount
                          ),
                          type: "column",
                          name: "Amount",
                        },
                        {
                          data: paymentsTrend?.map(
                            (usage) => usage?.total_amount
                          ),
                          type: "line",
                          name: "Amount",
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
                    Total Amount
                  </p>
                  <p className="font-bold text-2xl 2xl:text-3xl">
                    ₦
                    {paymentsTrend?.length > 0 || paymentTrendLoading
                      ? parseFloat(
                          paymentsTrend
                            ?.reduce(
                              (acc, curr) =>
                                acc + parseFloat(curr?.total_amount),
                              0
                            )
                            .toFixed(2)
                        ).toLocaleString("en-us")
                      : "0.00"}
                  </p>
                </div>
                {/* <div className="flex flex-col">
                  <p className="text-neutral-700 text-sm 2xl:text-base">
                    Total Value
                  </p>
                  <p className="font-bold font-geistSans text-2xl 2xl:text-3xl">
                    ₦2,585,000.00
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="border 2xl:border-2 border-neutral-200 px-6 2xl:px-8 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl flex flex-col">
            <p className="font-bold text-lg">Payout Trend</p>
            <div className="flex flex-col-reverse lg:flex-row gap-3 2xl:gap-8">
              <div className="w-full overflow-x-auto">
                <Spin spinning={payoutTrendLoading}>
                  <div id="chart" className="min-w-[40rem] overflow-hidden">
                    <DynamicApexCharts
                      options={{
                        labels: payoutsTrend?.map((usage) =>
                          dayjs(usage?.date)?.format("MM-DD-YY")
                        ),
                        stroke: {
                          width: [0, 2],
                          curve: "smooth",
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
                      }}
                      series={[
                        {
                          data: payoutsTrend?.map(
                            (usage) => usage?.total_amount
                          ),
                          type: "column",
                          name: "Amount",
                        },
                        {
                          data: payoutsTrend?.map(
                            (usage) => usage?.total_amount
                          ),
                          type: "line",
                          name: "Amount",
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
                    Total Amount
                  </p>
                  <p className="font-bold text-2xl 2xl:text-3xl">
                    ₦
                    {payoutsTrend?.length > 0 || payoutTrendLoading
                      ? parseFloat(
                          payoutsTrend
                            ?.reduce(
                              (acc, curr) =>
                                acc + parseFloat(curr?.total_amount),
                              0
                            )
                            .toFixed(2)
                        ).toLocaleString("en-us")
                      : "0.00"}
                  </p>
                </div>
                {/* <div className="flex flex-col">
                  <p className="text-neutral-700 text-sm 2xl:text-base">
                    Total Value
                  </p>
                  <p className="font-bold font-geistSans text-2xl 2xl:text-3xl">
                    ₦2,585,000.00
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
