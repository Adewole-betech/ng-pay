"use client";

import { CustomButton } from "@/app/components/button";
import { RiCloseLine } from "@remixicon/react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Button, Checkbox, Space, Table, Tag, Tooltip } from "antd";
import {
  ArrowLeft2,
  ArrowRight2,
  Eye,
  FilterSearch,
  Import,
  Refresh,
  Trash,
} from "iconsax-react";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { exclusiveTable, exclusiveTableColumns } from "./data";
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
import { setExclusiveColumns } from "@/app/redux/features/payments/exclusive";
import Filter from "./Filter";

export default function Exclusive() {
  const dispatch = useDispatch();
  const [showPayment, setShowPayment] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [createdDate, setCreatedDate] = useState();
  const [paidDate, setPaidDate] = useState();
  const [status, setStatus] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [merchantId, setMerchantId] = useState("");

  function handleFilter() {
    setShowFilter(!showFilter);
  }

  const itemRender = (pag, type, originalElement) => {
    if (type === "prev") {
      return (
        <Button
          icon={<ArrowLeft2 />}
          iconPosition="start"
          loading={loading}
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
          loading={loading}
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

  const { paymentExclusiveColumns } = useSelector(
    () => store.getState().paymentExclusive
  );

  const [dragIndex, setDragIndex] = useState({
    active: -1,
    over: -1,
  });
  const [columns, setColumns] = useState(() =>
    paymentExclusiveColumns
      ? paymentExclusiveColumns.map((column, i) => ({
          ...column,
          key: `${i}`,
          onHeaderCell: () => ({
            id: `${i}`,
          }),
          onCell: () => ({
            id: `${i}`,
          }),
        }))
      : exclusiveTableColumns.map((column, i) => ({
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
      dispatch(setExclusiveColumns({ columns: columns }));
    }
  }, [columns]);

  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6 h-full">
      <div className="bg-white p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl flex flex-col gap-4 2xl:gap-5 h-full">
        <div className="flex flex-col gap-4 2xl:gap-8 w-full overflow-y-auto no-scrollbar h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Menu
                value={""}
                menuButton={
                  <MenuButton className="border-y border-l py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 rounded-s-md lg:rounded-s-lg font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>Merchant ID</p>
                    <FaChevronDown className="size-3 2xl:size-4 " />
                  </MenuButton>
                }
              >
                <MenuItem disabled>Merchant ID</MenuItem>
              </Menu>
              <Menu
                value={""}
                menuButton={
                  <MenuButton className="border-r border-y py-2 2xl:py-2.5 px-3 2xl:px-4 rounded-e-md lg:rounded-e-lg border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                    <p>Status</p>
                    <FaChevronDown className="size-3 2xl:size-4 " />
                  </MenuButton>
                }
              >
                <MenuItem disabled>Status</MenuItem>
              </Menu>
            </div>
            <div className="flex items-center gap-2 2xl:gap-3">
              <CustomButton
                outlined
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
            {createdDate && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {`${dayjs(createdDate[0]).format("MMM D")} - ${dayjs(
                  createdDate[1]
                ).format("MMM D")}`}{" "}
                <RiCloseLine
                  onClick={() => setCreatedDate()}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
            {paidDate && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {`${dayjs(paidDate[0]).format("MMM D")} - ${dayjs(
                  paidDate[1]
                ).format("MMM D")}`}{" "}
                <RiCloseLine
                  onClick={() => setPaidDate()}
                  className="text-primary-main size-6 hover:cursor-pointer stroke-[3]"
                />
              </Tag>
            )}
            {merchantId && (
              <Tag className="text-primary-main font-medium bg-primary-50 py-1.5 2xl:py-2 px-4 2xl:px-5 border-none flex items-center text-xs lg:text-sm rounded-md">
                {merchantId}{" "}
                <RiCloseLine
                  onClick={() => setMerchantId("")}
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
                    dataSource={exclusiveTable}
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
                    // loading={loading}
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
                          if (column?.dataIndex === "merchant_id") {
                            return (
                              <p className="font-medium uppercase">{value}</p>
                            );
                          } else if (column?.dataIndex === "status") {
                            return (
                              <div
                                className={`flex items-center rounded-s-full rounded-e-full font-medium py-1.5 pl-1.5 pr-4 capitalize w-fit ${
                                  value === "active"
                                    ? "bg-[#ECFDF3] text-[#027A48]"
                                    : value === "inactive"
                                    ? "bg-[#FEF3F2] text-[#B42318]"
                                    : "bg-[#FFFAEB] text-[#B54708]"
                                }`}
                              >
                                <RxDotFilled
                                  className={`size-6 ${
                                    value === "active"
                                      ? "text-[#12B76A]"
                                      : value === "inactive"
                                      ? "text-[#F04438]"
                                      : "text-[#F79009]"
                                  }`}
                                />{" "}
                                {value}
                              </div>
                            );
                          } else if (column?.dataIndex === "actions") {
                            if (record?.status === "disabled") {
                              return (
                                <Button type="link" className="px-0">
                                  Check Status
                                </Button>
                              );
                            } else {
                              return (
                                <Space size="middle" className="font-semibold">
                                  <Tooltip
                                    title={"View Details"}
                                    arrow
                                    placement="bottom"
                                  >
                                    <a
                                      href={`/dashboard/payments/history?txId=${record?.tx_id}`}
                                    >
                                      <Eye className="text-[#374151] hover:text-primary-main hover:cursor-pointer" />
                                    </a>
                                  </Tooltip>
                                  <Tooltip
                                    title={"Delete Account"}
                                    arrow
                                    placement="bottom"
                                  >
                                    <Trash
                                      onClick={() => {
                                        setSelectedPayment(record);
                                        // setShowPayment(true);
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
                          } else if (column?.dataIndex === "account_number") {
                            return (
                              <div className="flex flex-col xl:gap-1">
                                <p className="font-medium text-xs lg:text-sm">
                                  {record?.recipient_account}
                                </p>
                                <p className="text-xs lg:text-sm">
                                  {record?.customer}
                                </p>
                              </div>
                            );
                          } else if (column?.dataIndex === "notify_url") {
                            return (
                              <a
                                href={value}
                                className="px-0 hover:text-primary-main"
                              >
                                {value}
                              </a>
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
        merchantId={merchantId}
        setMerchantId={setMerchantId}
        status={status}
        setStatus={setStatus}
        createdDate={createdDate}
        setCreatedDate={setCreatedDate}
        paidDate={paidDate}
        setPaidDate={setPaidDate}
        account={accountNumber}
        setAccount={setAccountNumber}
      />
    </div>
  );
}
