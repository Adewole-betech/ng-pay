import { CustomButton } from "@/app/components/button";
import { MenuButton, MenuItem, Menu, FocusableItem } from "@szhsin/react-menu";
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  ArrowLeft2,
  ArrowRight2,
  ArrowUp,
  Eye,
  EyeSlash,
  FilterSearch,
  Import,
  Receipt2,
  Refresh,
  SearchNormal1,
  Wallet3,
} from "iconsax-react";
import { useEffect, useState } from "react";
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

import { historyTable, historyTableColumns } from "../data";
import Column from "antd/es/table/Column";
import { RxDotFilled } from "react-icons/rx";

import store from "@/app/redux/store/store";
import { FaChevronDown } from "react-icons/fa6";
import PaymentInformation from "../PaymentInformation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getPayoutHistory,
  setPayoutColumns,
} from "@/app/redux/features/payout";
import Filter from "../Filter";
import { getClientsList } from "@/app/redux/features/clients";
import { RiCloseLine } from "@remixicon/react";

const Payout = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [showAvailable, setShowAvailable] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState(["", ""]);
  const [settlementID, setSettlementID] = useState("");
  const [merchantID, setMerchantID] = useState("");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("");
  function handleFilter() {
    setShowFilter(!showFilter);
  }

  let timeoutId;

  const { userLogin } = useSelector(() => store.getState().login);
  const { payoutColumns, historyLoading, payoutHistory } = useSelector(
    () => store.getState().payout
  );
  const { clientsList } = useSelector(() => store.getState().client);

  function loadData() {
    dispatch(
      getPayoutHistory({
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
        reference: reference,
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
    payoutColumns
      ? payoutColumns.map((column, i) => ({
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

  const changePage = () => {
    setCurrentPage("send");
  };

  useEffect(() => {
    dispatch(
      getClientsList({
        page: 1,
        page_size: 10,
        mchid: userLogin?.mchid,
      })
    );
  }, []);
  useEffect(() => {
    if (clientsList && clientsList?.results) {
      setClientData(clientsList?.results[0]);
    }
  }, [clientsList]);

  useEffect(() => {
    if (columns) {
      dispatch(setPayoutColumns({ columns: columns }));
    }
  }, [columns]);

  useEffect(() => {
    if (searchParams.has("txId")) {
      setSettlementID(searchParams.get("txId"));
      router.push(pathname);
    }
  }, [searchParams]);

  useEffect(() => {
    if (payoutHistory) {
      setTotal(payoutHistory?.count);
      setHistoryData(payoutHistory?.results);
    }
  }, [payoutHistory]);

  useEffect(() => {
    loadData();
  }, [page, size, selectedDate, reference]);

  return (
    <>
      <div className="flex items-center justify-between p-3 lg:p-4 2xl:p-6 rounded-lg 2xl:rounded-xl flex-wrap gap-3 lg:gap-4 2xl:gap-5 bg-[center_-500px] bg-no-repeat bg-cover bg-mesh01">
        <div className="flex gap-3 lg:gap-4 2xl:gap-6 items-center">
          <div className="flex gap-3 2xl:gap-4 items-center">
            <div className="size-8 2xl:size-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-800">
              <Wallet3 variant="linear" className="size-4 2xl:size-6" />
            </div>
            <div className="flex flex-col gap-2 text-neutral-50">
              <p className="text-sm 2xl:text-base">Available Balance</p>
              <p className="font-bold text-lg lg:text-xl 2xl:text-2xl font-geistSans">
                {showAvailable
                  ? `₦${
                      clientData &&
                      parseFloat(
                        clientData?.availability?.toFixed(2)
                      ).toLocaleString("en-us")
                    }`
                  : "*****"}
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
        <CustomButton
          click={changePage}
          className="bg-white flex items-center gap-2 lg:gap-3 text-neutral-900 hover:text-primary-main !text-base"
        >
          <ArrowUp className="size-3 lg:size-4" />
          Send Money
        </CustomButton>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Menu
            value={""}
            menuButton={
              <MenuButton className="border-y border-l py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 rounded-s-md lg:rounded-s-lg font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                <p>Transaction ID</p>
                <FaChevronDown className="size-3 2xl:size-4 " />
              </MenuButton>
            }
          >
            <MenuItem disabled>Transaction ID</MenuItem>
          </Menu>
          <Menu
            value={reference}
            onItemClick={(e) => setReference(e?.value)}
            menuButton={
              <MenuButton className="border-y py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3 hover:border-primary-main">
                <p>{reference ? reference : "Reference ID"}</p>
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
                  value={txID}
                  onChange={(e) => {
                    clearTimeout(timeoutId);

                    setReference(e.target.value);
                    timeoutId = setTimeout(setPage, 3000, 1);
                  }}
                  prefix={<SearchNormal1 />}
                />
              )}
            </FocusableItem>
            {historyData?.map((hist) => (
              <MenuItem key={hist?.id} value={hist?.reference}>
                {hist?.reference}
              </MenuItem>
            ))}
          </Menu>
          <Menu
            value={""}
            menuButton={
              <MenuButton className="border-r border-y border-l-0 py-2 2xl:py-2.5 px-3 2xl:px-4 rounded-e-md lg:rounded-e-lg rounded-s-none border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3">
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
              onClick={() => setSelectedDate()}
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
                      if (column?.dataIndex === "status") {
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
                      } else if (column?.dataIndex.includes("amount")) {
                        return (
                          <p className="capitalize font-medium">
                            ₦{parseFloat(value)?.toLocaleString("en-us")}
                          </p>
                        );
                      } else if (column?.dataIndex.includes("txid")) {
                        return <p className="uppercase font-medium">{value}</p>;
                      } else if (column?.dataIndex === "actions") {
                        if (record?.status === "pending") {
                          return (
                            <Button type="link" className="pl-0">
                              Check Status
                            </Button>
                          );
                        } else {
                          return (
                            <Space size="middle" className="font-semibold">
                              <Tooltip
                                title={"Download Receipt"}
                                arrow
                                placement="bottom"
                              >
                                <Receipt2
                                  onClick={() => {
                                    setSelectedPayment(record);
                                    setShowPayment(true);
                                  }}
                                  className="text-[#374151] hover:text-primary-main hover:cursor-pointer"
                                />
                              </Tooltip>
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
                      } else if (column?.dataIndex === "create_time") {
                        return (
                          <p className="capitalize">
                            {dayjs(value, "YYYYMMDD").format("MMM D, YYYY")}
                          </p>
                        );
                      } else if (column?.dataIndex === "recipient") {
                        return (
                          <div className="flex items-center gap-2 lg:gap-3">
                            <Avatar src="">
                              {record?.account_name.split(" ")[0].slice(0, 1)}
                              {record?.account_name.split(" ")[1].slice(0, 1)}
                            </Avatar>
                            <div className="flex flex-col xl:gap-1">
                              <p className="font-medium text-xs lg:text-sm">
                                {record?.account_name}
                              </p>
                              <p className="text-xs lg:text-sm">
                                {record?.account_number} - {record?.bank_code}
                              </p>
                            </div>
                          </div>
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
                columns[columns.findIndex((i) => i.key === dragIndex.active)]
                  ?.title
              }
            </th>
          </DragOverlay>
        </DndContext>
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
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

export default Payout;
