import { Button, Checkbox, Input, Space, Table, Tooltip } from "antd";
import { ArrowLeft2, ArrowRight2, Eye, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { clientTable, clientTableColumns } from "./data";
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
import { setClientColumns } from "@/app/redux/features/clients";
import Column from "antd/es/table/Column";
import NewClient from "./components/NewClient";

const ClientsPage = ({
  showNew,
  setShowNew,
  selectedClient,
  setSelectedClient,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

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

  const { clientColumns } = useSelector(() => store.getState().client);

  const [dragIndex, setDragIndex] = useState({
    active: -1,
    over: -1,
  });
  const [columns, setColumns] = useState(() =>
    clientColumns
      ? clientColumns.map((column, i) => ({
          ...column,
          key: `${i}`,
          onHeaderCell: () => ({
            id: `${i}`,
          }),
          onCell: () => ({
            id: `${i}`,
          }),
        }))
      : clientTableColumns.map((column, i) => ({
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
      dispatch(setClientColumns({ columns: columns }));
    }
  }, [columns]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Input size="large" className="w-fit" prefix={<FiSearch />} />
        <Button
          onClick={() => setShowNew(true)}
          type="primary"
          size="large"
          icon={<FiPlus />}
        >
          Add New Client
        </Button>
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
                dataSource={clientTable}
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
                      if (column?.dataIndex === "client_id") {
                        return <p className="font-medium uppercase">{value}</p>;
                      } else if (column?.dataIndex === "status") {
                        return (
                          <p
                            className={`flex items-center justify-center rounded-s-full rounded-e-full font-medium py-1.5 px-3 capitalize w-fit ${
                              value === "active"
                                ? "bg-[#ECFDF3] text-[#027A48]"
                                : value === "inactive"
                                ? "bg-[#FEF3F2] text-[#B42318]"
                                : "bg-[#F2F4F7] text-[#344054]"
                            }`}
                          >
                            {value}
                          </p>
                        );
                      } else if (column?.dataIndex === "actions") {
                        return (
                          <Space size="middle" className="font-semibold">
                            <Tooltip
                              title={"View Details"}
                              arrow
                              placement="bottom"
                            >
                              <Eye
                                onClick={() => {
                                  setSelectedClient(record);
                                  setCurrentPage("details");
                                }}
                                className="text-[#374151] hover:text-primary-main hover:cursor-pointer"
                              />
                            </Tooltip>
                            <Tooltip
                              title={"Delete Client"}
                              arrow
                              placement="bottom"
                            >
                              <Trash
                                onClick={() => {
                                  setSelectedClient(record);
                                  // setShowPayment(true);
                                }}
                                className="text-[#374151] hover:text-primary-main hover:cursor-pointer"
                              />
                            </Tooltip>
                          </Space>
                        );
                      } else if (column?.dataIndex === "date_added") {
                        return (
                          <p className="capitalize">
                            {dayjs(value, "YYYYMMDD").format("MMM D, YYYY")}
                          </p>
                        );
                      } else if (column?.dataIndex.includes("balance")) {
                        return (
                          <p className="font-medium text-xs lg:text-sm">
                            ₦
                            {parseFloat(value.toFixed(2)).toLocaleString(
                              "en-us"
                            )}
                          </p>
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
                columns[columns.findIndex((i) => i.key === dragIndex.active)]
                  ?.title
              }
            </th>
          </DragOverlay>
        </DndContext>
      </div>
      <NewClient
        show={showNew}
        setShow={setShowNew}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
    </>
  );
};

export default ClientsPage;
