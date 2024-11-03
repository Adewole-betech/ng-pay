"use client";

import { CustomButton } from "@/app/components/button";
import { RiCloseLine } from "@remixicon/react";
import { FocusableItem, Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Button, Checkbox, Input, Space, Table, Tag, Tooltip } from "antd";
import {
  ArrowLeft2,
  ArrowRight2,
  Eye,
  FilterSearch,
  Import,
  Refresh,
  SearchNormal1,
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
import {
  getPaymentsHistory,
  setHistoryColumns,
} from "@/app/redux/features/payments/history";
import Filter from "./Filter";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function History() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [showPayment, setShowPayment] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState(["", ""]);
  const [txID, setTxID] = useState("");
  const [refID, setRefID] = useState("");
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [merchant, setMerchant] = useState("");

  let timeoutId;

  const { paymentHistoryColumns, historyLoading, paymentsHistory } =
    useSelector(() => store.getState().paymentHistory);

  function handleFilter() {
    setShowFilter(!showFilter);
  }

  function loadData() {
    dispatch(
      getPaymentsHistory({
        page: page,
        page_size: size,
        start_date: selectedDate[0]
          ? dayjs(selectedDate[0]).format("YYYY-MM-DD")
          : "",
        end_date: selectedDate[1]
          ? dayjs(selectedDate[1]).format("YYYY-MM-DD")
          : "",
        status: status,
        txid: txID,
        txtype: method,
        ref: refID,
        txtype: method,
      })
    );
  }

  const itemRender = (pag, type, originalElement) => {
    if (type === "prev") {
      return (
        <Button
          icon={<ArrowLeft2 />}
          iconPosition="start"
          loading={historyLoading}
          onClick={async () => {
            await setPage(page - 1);
          }}
          className="h-10"
          type="text"
        ></Button>
      );
    }
    if (type === "next") {
      return (
        <Button
          icon={<ArrowRight2 />}
          iconPosition="end"
          loading={historyLoading}
          onClick={async () => {
            await setPage(page + 1);
          }}
          className="h-10"
          type="text"
        ></Button>
      );
    }
    if (type === "page") {
      return (
        <div
          onClick={() => setPage(parseInt(pag))}
          className="flex justify-center items-center h-full"
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
    paymentHistoryColumns
      ? paymentHistoryColumns.map((column, i) => ({
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
      dispatch(setHistoryColumns({ columns: columns }));
      router;
    }
  }, [columns]);

  useEffect(() => {
    if (searchParams.has("txId")) {
      setTxID(searchParams.get("txId"));
      router.push(pathname);
    }
  }, [searchParams]);

  useEffect(() => {
    if (paymentsHistory) {
      setTotal(paymentsHistory?.count);
      setHistoryData(paymentsHistory?.results);
    }
  }, [paymentsHistory]);

  useEffect(() => {
    loadData();
  }, [page, size, selectedDate, status, txID, method, refID]);

  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl flex flex-col gap-4 2xl:gap-5 h-full">
        <div className="flex flex-col gap-4 2xl:gap-8 w-full overflow-y-auto no-scrollbar h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Menu
                value={merchant}
                onItemClick={(e) => setMerchant(e?.value)}
                menuButton={
                  <MenuButton className="border-y border-l py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 rounded-s-md lg:rounded-s-lg font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>{merchant ? merchant : "Merchant ID"}</p>
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
                      value={merchant}
                      onChange={(e) => {
                        clearTimeout(timeoutId);

                        setMerchant(e.target.value);
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
                value={txID}
                onItemClick={(e) => setTxID(e?.value)}
                menuButton={
                  <MenuButton className="border-y py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>{txID ? txID : "Transaction ID"}</p>
                    <FaChevronDown className="size-3 2xl:size-4 " />
                  </MenuButton>
                }
              >
                <FocusableItem>
                  {({ ref }) => (
                    <Input
                      size="large"
                      ref={ref}
                      placeholder="Transaction ID"
                      value={txID}
                      onChange={(e) => {
                        clearTimeout(timeoutId);

                        setTxID(e.target.value);
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
              <Menu
                value={refID}
                onItemClick={(e) => setRefID(e?.value)}
                menuButton={
                  <MenuButton className="border-y py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>{refID ? refID : "Reference ID"}</p>
                    <FaChevronDown className="size-3 2xl:size-4 " />
                  </MenuButton>
                }
              >
                <FocusableItem>
                  {({ ref }) => (
                    <Input
                      size="large"
                      ref={ref}
                      placeholder="Reference ID"
                      value={refID}
                      onChange={(e) => {
                        clearTimeout(timeoutId);

                        setRefID(e.target.value);
                        timeoutId = setTimeout(setPage, 3000, 1);
                      }}
                      prefix={<SearchNormal1 />}
                    />
                  )}
                </FocusableItem>
                {historyData?.map((hist) => (
                  <MenuItem key={hist?.id} value={hist?.ref}>
                    {hist?.ref}
                  </MenuItem>
                ))}
              </Menu>
              <Menu
                value={status}
                onItemClick={(e) => setStatus(e?.value)}
                menuButton={
                  <MenuButton className="border-r border-y py-2 2xl:py-2.5 px-3 2xl:px-4 rounded-e-md lg:rounded-e-lg border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>{status ? status : "Status"}</p>
                    <FaChevronDown className="size-3 2xl:size-4 " />
                  </MenuButton>
                }
              >
                <MenuItem value="settled">Settled</MenuItem>
                <MenuItem value={"successful"}>Successful</MenuItem>
                <MenuItem value={"failed"}>Failed</MenuItem>
              </Menu>
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
            {status && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {status}{" "}
                <RiCloseLine
                  onClick={() => setStatus("")}
                  className="text-primary-main size-6 hover:cursor-pointer"
                />
              </Tag>
            )}
            {selectedDate && selectedDate[0] !== "" && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {`${dayjs(selectedDate[0]).format("MMM D, YYYY")} - ${dayjs(
                  selectedDate[1]
                ).format("MMM D, YYYY")}`}{" "}
                <RiCloseLine
                  onClick={() => setSelectedDate(["", ""])}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
            {txID && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {txID}{" "}
                <RiCloseLine
                  onClick={() => setTxID("")}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
            {refID && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {refID}{" "}
                <RiCloseLine
                  onClick={() => setRefID("")}
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
                              key={column.dataIndex}
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
                              <p className="font-medium capitalize">
                                ₦{parseFloat(value)?.toLocaleString("en-us")}
                              </p>
                            );
                          } else if (column?.dataIndex === "merchant_id") {
                            return (
                              <p className="font-medium uppercase">{value}</p>
                            );
                          } else if (column?.dataIndex === "status") {
                            return (
                              <div
                                className={`flex items-center rounded-s-full rounded-e-full font-medium py-1.5 pl-1.5 pr-4 capitalize w-fit ${
                                  value === "successful"
                                    ? "bg-[#ECFDF3] text-[#027A48]"
                                    : value === "failed"
                                    ? "bg-[#FEF3F2] text-[#B42318]"
                                    : "bg-[#FFFAEB] text-[#B54708]"
                                }`}
                              >
                                <RxDotFilled
                                  className={`size-6 ${
                                    value === "successful"
                                      ? "text-[#12B76A]"
                                      : value === "failed"
                                      ? "text-[#F04438]"
                                      : "text-[#F79009]"
                                  }`}
                                />{" "}
                                {value}
                              </div>
                            );
                          } else if (column?.dataIndex === "actions") {
                            if (record?.status === "pending") {
                              return <Button type="link">Check Status</Button>;
                            } else {
                              return (
                                <Space size="middle" className="font-semibold">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-[#374151] hover:stroke-primary-main stroke-[1.25] lg:stroke-[1.5] hover:cursor-pointer"
                                  >
                                    <path
                                      d="M7.50008 18.3333H12.5001C16.6667 18.3333 18.3334 16.6666 18.3334 12.5V7.49996C18.3334 3.33329 16.6667 1.66663 12.5001 1.66663H7.50008C3.33341 1.66663 1.66675 3.33329 1.66675 7.49996V12.5C1.66675 16.6666 3.33341 18.3333 7.50008 18.3333Z"
                                      // stroke="#374151"
                                      stroke-width="1.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M8.82495 6.3999H12.3583V9.94157"
                                      // stroke="#374151"
                                      stroke-width="1.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12.3583 6.3999L7.6416 11.1166"
                                      // stroke="#374151"
                                      stroke-width="1.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M5 13.7583C8.24167 14.8416 11.7583 14.8416 15 13.7583"
                                      // stroke="#374151"
                                      stroke-width="1.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <Tooltip
                                    title={"View Details"}
                                    arrow
                                    placement="bottom"
                                  >
                                    <Eye
                                      onClick={() => {
                                        setSelectedPayment(record);
                                        setShowPayment(true);
                                      }}
                                      className="text-[#374151] hover:text-primary-main hover:cursor-pointer"
                                    />
                                  </Tooltip>
                                </Space>
                              );
                            }
                          } else if (column?.dataIndex.includes("time")) {
                            return (
                              <p className="capitalize">
                                {dayjs(value, "YYYYMMDD").format("MMM D, YYYY")}
                              </p>
                            );
                          } else {
                            return <p className="uppercase">{value}</p>;
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
        txId={txID}
        setTxId={setTxID}
        refId={refID}
        setRefId={setRefID}
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
