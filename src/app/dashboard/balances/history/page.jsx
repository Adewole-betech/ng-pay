"use client";

import { CustomButton } from "@/app/components/button";
import { RiCloseLine } from "@remixicon/react";
import { FocusableItem, Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  ArrowLeft2,
  ArrowRight2,
  Bank,
  Briefcase,
  CalendarSearch,
  Copy,
  Eye,
  EyeSlash,
  FilterSearch,
  Import,
  Refresh,
  SearchNormal1,
  Wallet3,
} from "iconsax-react";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { historyTable, historyTableColumns } from "./data";
import Column from "antd/es/table/Column";
import { RxDotFilled } from "react-icons/rx";
import dayjs from "dayjs";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  DragIndexContext,
  TableBodyCell,
  TableHeaderCell,
} from "@/app/components/TableEdits";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import store from "@/app/redux/store/store";
import PaymentInformation from "./PaymentInformation";
import Filter from "./Filter";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  getBalancesHistory,
  setBalanceHistoryColumns,
} from "@/app/redux/features/balance/history";

const { RangePicker } = DatePicker;

export default function History() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [showAvailable, setShowAvailable] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState(["", ""]);
  const [settlementID, setSettlementID] = useState("");
  const [merchantID, setMerchantID] = useState("");
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");

  let timeoutId;

  const { balanceHistoryColumns, historyLoading, balanceHistory } = useSelector(
    () => store.getState().balanceHistory
  );

  function handleFilter() {
    setShowFilter(!showFilter);
  }

  function loadData() {
    dispatch(
      getBalancesHistory({
        page: page,
        page_size: size,
        start_date: selectedDate[0]
          ? dayjs(selectedDate[0]).format("YYYY-MM-DD")
          : "",
        end_date: selectedDate[1]
          ? dayjs(selectedDate[1]).format("YYYY-MM-DD")
          : "",
        status: status,
        txid: settlementID,
        debitorcredit: method,
      })
    );
  }


  const itemRender = (pag, type, originalElement) => {
    if (type === "prev") {
      return (
        <Button
          icon={<ArrowLeft2 />}
          iconPosition="start"
          loading={listLoading}
          onClick={async () => {
            await setPage(page - 1);
          }}
          className="h-10 hover:!bg-transparent hover:!text-primary-main disabled:hover:!text-inherit"
          type="text"
        >
          Previous
        </Button>
      );
    }
    if (type === "next") {
      return (
        <Button
          icon={<ArrowRight2 />}
          iconPosition="end"
          loading={listLoading}
          onClick={async () => {
            await setPage(page + 1);
          }}
          className="h-10 hover:!bg-transparent hover:!text-primary-main disabled:hover:!text-inherit"
          type="text"
        >
          Next
        </Button>
      );
    }
    if (type === "page") {
      return (
        <div
          onClick={() => setPage(parseInt(pag))}
          className="flex justify-center items-center h-full hover:!bg-transparent hover:!text-primary-main disabled:hover:!text-inherit"
        >
          {originalElement}
        </div>
      );
    }
    return originalElement;
  };

  const [dragIndex, setDragIndex] = useState({
    active: -1,
    over: -1,
  });
  const [columns, setColumns] = useState(() =>
    balanceHistoryColumns
      ? balanceHistoryColumns.map((column, i) => ({
          ...column,
          key: `${i}`,
          onHeaderCell: () => ({
            id: `${i}`,
          }),
          onCell: () => ({
            id: `${i}`,
          }),
        }))
      : historyTableColumns.map((column, i) => ({
          ...column,
          key: `${i}`,
          onHeaderCell: () => ({
            id: `${i}`,
          }),
          onCell: () => ({
            id: `${i}`,
          }),
        }))
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    })
  );
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setColumns((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.key === active?.id);
        const overIndex = prevState.findIndex((i) => i.key === over?.id);
        const orderedColumns = arrayMove(prevState, activeIndex, overIndex);
        return orderedColumns;
      });
    }
    setDragIndex({
      active: -1,
      over: -1,
    });
  };
  const onDragOver = ({ active, over }) => {
    const activeIndex = columns.findIndex((i) => i.key === active.id);
    const overIndex = columns.findIndex((i) => i.key === over?.id);
    setDragIndex({
      active: active.id,
      over: over?.id,
      direction: overIndex > activeIndex ? "right" : "left",
    });
  };

  useEffect(() => {
    if (columns) {
      dispatch(setBalanceHistoryColumns({ columns: columns }));
      router;
    }
  }, [columns]);

  useEffect(() => {
    if (searchParams.has("txId")) {
      setSettlementID(searchParams.get("txId"));
      router.push(pathname);
    }
  }, [searchParams]);

  useEffect(() => {
    if (balanceHistory) {
      setTotal(balanceHistory?.count);
      setHistoryData(balanceHistory?.results);
    }
  }, [balanceHistory]);

  useEffect(() => {
    loadData();
  }, [page, size, selectedDate, settlementID, method]);

  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl flex flex-col gap-4 2xl:gap-5 h-full">
        <div className="flex flex-col gap-4 2xl:gap-8 w-full overflow-y-auto no-scrollbar h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 2xl:gap-5">
            <div className="flex gap-2 p-3 lg:p-4 2xl:p-6 rounded-lg 2xl:rounded-xl justify-between bg-[center_-500px] bg-no-repeat bg-auto bg-mesh01 items-center">
              <div className="flex gap-3 2xl:gap-4 items-center">
                <div className="size-8 2xl:size-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-800">
                  <Wallet3 variant="linear" className="size-4 2xl:size-6" />
                </div>
                <div className="flex flex-col gap-2 text-neutral-50">
                  <p className="text-sm 2xl:text-base">Available Balance</p>
                  <p className="font-bold text-lg lg:text-xl 2xl:text-2xl font-geistSans">
                    {showAvailable ? "₦3,000,000.00" : "*****"}
                  </p>
                </div>
              </div>
              {showAvailable ? (
                <Eye
                  onClick={() => setShowAvailable(!showAvailable)}
                  variant="linear"
                  className="size-4 2xl:size-6 text-neutral-50 hover:text-white hover:cursor-pointer"
                />
              ) : (
                <EyeSlash
                  onClick={() => setShowAvailable(!showAvailable)}
                  variant="linear"
                  className="size-4 2xl:size-6  text-neutral-50 hover:text-white hover:cursor-pointer"
                />
              )}
            </div>
            <div className="flex gap-2 p-3 lg:p-4 2xl:p-6 rounded-lg 2xl:rounded-xl justify-between bg-white border 2xl:border-2 border-neutral-200 items-center">
              <div className="flex gap-3 2xl:gap-4 items-center">
                <div className="size-8 2xl:size-12 bg-[#FEF3F2] rounded-full flex items-center justify-center text-darkRed">
                  <Bank variant="linear" className="size-4 2xl:size-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-neutral-500 text-sm 2xl:text-base">
                    NgPay Account Details
                  </p>
                  <div className="flex items-center gap-1 lg:gap-2">
                    <p className="font-geistSans font-bold text-lg lg:text-xl 2xl:text-2xl">
                      2597764401
                    </p>
                    <div className="py-1 px-3 bg-primary-main bg-opacity-5 text-primary-700 flex items-center gap-1 rounded-s-full rounded-e-full font-medium text-xs lg:text-sm">
                      <Briefcase className="size-3 lg:size-4" />
                      <p className="">Proton Ventures</p>
                    </div>
                  </div>
                </div>
              </div>
              <Copy
                //   onClick={() => setShowUnsettled(!showUnsettled)}
                variant="linear"
                className="size-4 2xl:size-6 text-neutral-500 hover:text-primary-main hover:cursor-pointer"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Menu
                value={merchantID}
                onItemClick={(e) => setMerchantID(e?.value)}
                menuButton={
                  <MenuButton className="border-y border-l py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 rounded-s-md lg:rounded-s-lg font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>{merchantID ? merchantID : "Merchant ID"}</p>
                    <FaChevronDown className="size-3 2xl:size-4 " />
                  </MenuButton>
                }
              >
                <FocusableItem>
                  {({ ref }) => (
                    <Input
                      size="large"
                      ref={ref}
                      placeholder="Merchant ID"
                      value={merchantID}
                      onChange={(e) => {
                        clearTimeout(timeoutId);

                        setMerchantID(e.target.value);
                        timeoutId = setTimeout(setPage, 3000, 1);
                      }}
                      prefix={<SearchNormal1 />}
                    />
                  )}
                </FocusableItem>
                <MenuItem disabled>Merchant ID</MenuItem>
                {historyData?.map((hist) => (
                  <MenuItem
                    key={hist?.id}
                    value={hist?.mchid}
                    className={"uppercase"}
                  >
                    {hist?.mchid}
                  </MenuItem>
                ))}
              </Menu>
              <Menu
                value={settlementID}
                onItemClick={(e) => setSettlementID(e?.value)}
                menuButton={
                  <MenuButton className="border-y py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>{settlementID ? settlementID : "Transaction ID"}</p>
                    <FaChevronDown className="size-3 2xl:size-4 " />
                  </MenuButton>
                }
              >
                <FocusableItem>
                  {({ ref }) => (
                    <Input
                      size="large"
                      ref={ref}
                      placeholder="Settlement ID"
                      value={settlementID}
                      onChange={(e) => {
                        clearTimeout(timeoutId);

                        setSettlementID(e.target.value);
                        timeoutId = setTimeout(setPage, 3000, 1);
                      }}
                      prefix={<SearchNormal1 />}
                    />
                  )}
                </FocusableItem>
                {historyData?.map((hist) => (
                  <MenuItem key={hist?.id} value={hist?.txid}>
                    {hist?.txid}
                  </MenuItem>
                ))}
              </Menu>
              <RangePicker
                value={selectedDate}
                onChange={(e) =>
                  e ? setSelectedDate(e) : setSelectedDate(["", ""])
                }
                popupClassName="z-[10001]"
                format={"MMM D, YYYY"}
                placeholder={`${dayjs().format("MMMM D, YYYY")}`}
                size="large"
                suffixIcon={<CalendarSearch className="text-neutral-700" />}
                className="border-r border-y border-l-0 py-2 2xl:py-2.5 px-3 2xl:px-4 rounded-e-md lg:rounded-e-lg rounded-s-none w-56 border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3"
              />
            </div>
            <div className="flex items-center gap-2 2xl:gap-3">
              <CustomButton
                outlined
                click={loadData}
                className="border !py-2 !px-3 2xl:!py-2.5 2xl:!px-5 flex items-center gap-1.5 2xl:gap-2 text-base rounded-md lg:rounded-lg !border-neutral-200 font-medium"
              >
                <Refresh className="size-4 2xl:size-5" />
                Refresh
              </CustomButton>
              <CustomButton
                outlined
                className="border !py-2 !px-3 2xl:!py-2.5 2xl:!px-5 flex items-center gap-1.5 2xl:gap-2 text-base rounded-md lg:rounded-lg !border-neutral-200 font-medium"
                click={handleFilter}
              >
                <FilterSearch className="size-4 2xl:size-5" />
                <p className="font-medium">Filter</p>
                <FaChevronDown className="size-3 2xl:size-4" />
              </CustomButton>
              <CustomButton
                primary
                className="border 2xl:border-2 !py-2 !px-3 2xl:!py-2.5 2xl:!px-5 flex items-center gap-1.5 2xl:gap-2 text-base rounded-md lg:rounded-lg !border-primary-500 font-medium"
              >
                <Import className="size-4 2xl:size-5" />
                Export CSV
              </CustomButton>
            </div>
          </div>
          <div className="flex gap-2 lg:gap-3">
            {selectedDate && selectedDate[0] !== "" && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {`${dayjs(selectedDate[0]).format("MMM D")} - ${dayjs(
                  selectedDate[1]
                ).format("MMM D")}`}{" "}
                <RiCloseLine
                  onClick={() => setSelectedDate(["", ""])}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
            {settlementID && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {settlementID}{" "}
                <RiCloseLine
                  onClick={() => setSettlementID("")}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
            {merchantID && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {merchantID}{" "}
                <RiCloseLine
                  onClick={() => setMerchantID("")}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
            {method && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {method}{" "}
                <RiCloseLine
                  onClick={() => setMethod("")}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
          </div>
          <div className="w-full flex flex-col gap-4">
            <DndContext
              sensors={sensors}
              modifiers={[restrictToHorizontalAxis]}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={columns.map((i) => i.key)}
                strategy={horizontalListSortingStrategy}
              >
                <DragIndexContext.Provider value={dragIndex}>
                  <Table
                    className="no-scrollbar"
                    bordered
                    dataSource={historyData}
                    components={{
                      header: {
                        cell: TableHeaderCell,
                      },
                      body: {
                        cell: TableBodyCell,
                      },
                    }}
                    rowKey="key"
                    scroll={{
                      y: 800,
                    }}
                    loading={historyLoading}
                    pagination={{
                      pageSize: size,
                      itemRender: itemRender,
                      current: page,
                      total: total,
                      hideOnSinglePage: true,
                      responsive: true,
                      onShowSizeChange: (current, size) => {
                        setSize(size);
                        setPage(1);
                      },
                    }}
                    title={() => (
                      <div className="flex flex-col gap-2 p-4">
                        <div className="flex items-center gap-3 overflow-x-auto w-full mb-4 text-nowrap">
                          {columns?.map((column) => (
                            <Checkbox
                              key={column?.dataIndex}
                              checked={!column?.hidden}
                              title={column?.title}
                              onChange={(e) => {
                                setColumns(
                                  columns?.map((col) => {
                                    if (col?.dataIndex === column?.dataIndex) {
                                      return {
                                        ...col,
                                        hidden: !e.target.checked,
                                      };
                                    } else {
                                      return col;
                                    }
                                  })
                                );
                              }}
                            >
                              {column?.title}
                            </Checkbox>
                          ))}
                        </div>
                      </div>
                    )}
                  >
                    {columns?.map((column) => (
                      <Column
                        key={column?.key}
                        dataIndex={column?.dataIndex}
                        hidden={column?.hidden}
                        title={column?.title}
                        onHeaderCell={column?.onHeaderCell}
                        render={(value, record, _) => {
                          if (column?.dataIndex.includes("amount")) {
                            return (
                              <p
                                className={`font-medium capitalize ${
                                  record?.debitorcredit === "credit"
                                    ? "text-darkGreen"
                                    : "text-darkRed"
                                }`}
                              >
                                ₦{parseFloat(value)?.toLocaleString("en-us")}
                              </p>
                            );
                          } else if (
                            column?.dataIndex === "mchid" ||
                            column?.dataIndex === "txid"
                          ) {
                            return (
                              <p className="font-medium uppercase">{value}</p>
                            );
                          } else if (
                            column?.dataIndex.includes("balance") ||
                            column?.dataIndex.includes("balace")
                          ) {
                            return (
                              <p className="capitalize">
                                ₦{parseFloat(value)?.toLocaleString("en-us")}
                              </p>
                            );
                          } else if (column?.dataIndex === "actions") {
                            return (
                              <Button
                                type="link"
                                onClick={() => {
                                  setSelectedPayment(record);
                                  setShowPayment(true);
                                }}
                              >
                                View
                              </Button>
                            );
                          } else if (column?.dataIndex === "settletime") {
                            return (
                              <p className="capitalize">
                                {dayjs(value, "YYYYMMDD").format("MMM D, YYYY")}
                              </p>
                            );
                          } else {
                            return <p className="capitalize">{value}</p>;
                          }
                        }}
                      />
                    ))}
                  </Table>
                </DragIndexContext.Provider>
              </SortableContext>
              <DragOverlay>
                <th
                  style={{
                    backgroundColor: "gray",
                    padding: 16,
                  }}
                >
                  {
                    columns[
                      columns.findIndex((i) => i.key === dragIndex.active)
                    ]?.title
                  }
                </th>
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
      <PaymentInformation
        show={showPayment}
        setShow={setShowPayment}
        selectedPayment={selectedPayment}
      />
      <Filter
        show={showFilter}
        setShow={setShowFilter}
        txId={settlementID}
        setTxId={setSettlementID}
        refId={merchantID}
        setRefId={setMerchantID}
        status={status}
        setStatus={setStatus}
        method={method}
        setMethod={setMethod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setPage={setPage}
        timeoutId={timeoutId}
      />
    </div>
  );
}
