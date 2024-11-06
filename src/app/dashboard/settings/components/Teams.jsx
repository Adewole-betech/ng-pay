import { Avatar, Button, Checkbox, Input, Space, Table, Tooltip } from "antd";
import { ArrowLeft2, ArrowRight2, Eye, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { teamsTable, teamsTableColumns } from "../data";
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
import Column from "antd/es/table/Column";
import { getTeams, setTeamsColumns } from "@/app/redux/features/settings/teams";
import NewMember from "./NewMember";

const Teams = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [showNew, setShowNew] = useState(false);
  const [historyData, setHistoryData] = useState(null);

  const { userLogin } = useSelector(() => store.getState().login);
  const { teamsColumns, teams, teamsLoading } = useSelector(
    () => store.getState().teams
  );

  function loadData() {
    dispatch(
      getTeams({
        page: page,
        page_size: size,
        mchid: userLogin?.mchid,
      })
    );
  }

  const itemRender = (pag, type, originalElement) => {
    if (type === "prev") {
      return (
        <Button
          icon={<ArrowLeft2 />}
          iconPosition="start"
          loading={teamsLoading}
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
          loading={teamsLoading}
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
    teamsColumns
      ? teamsColumns.map((column, i) => ({
          ...column,
          key: `${i}`,
          onHeaderCell: () => ({
            id: `${i}`,
          }),
          onCell: () => ({
            id: `${i}`,
          }),
        }))
      : teamsTableColumns.map((column, i) => ({
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
      dispatch(setTeamsColumns({ columns: columns }));
    }
  }, [columns]);

  useEffect(() => {
    if (teams) {
      setTotal(teams?.count);
      setHistoryData(teams?.results);
    }
  }, [teams]);

  useEffect(() => {
    loadData();
  }, [page, size]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Input
          size="large"
          className="w-fit"
          prefix={<FiSearch />}
          placeholder="Search for member"
        />
        <Button
          onClick={() => setShowNew(true)}
          type="primary"
          size="large"
          icon={<FiPlus />}
        >
          Invite New Member
        </Button>
      </div>
      <div className="w-full flex flex-col gap-4 overflow-x-auto">
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
                loading={teamsLoading}
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
                      if (column?.dataIndex === "name") {
                        return (
                          <div className="flex items-center gap-2 lg:gap-3">
                            <Avatar src="" className="uppercase font-medium">
                              {record?.username?.split(" ")[0].slice(0, 1)}
                              {/* {record?.username?.split(" ")[1].slice(0, 1)} */}
                            </Avatar>
                            <div className="flex flex-col xl:gap-1">
                              <p className="font-medium text-xs lg:text-sm">
                                {record?.username}
                              </p>
                              <p className="text-xs lg:text-sm">
                                {record?.email}
                              </p>
                            </div>
                          </div>
                        );
                      } else if (column?.dataIndex === "roles") {
                        return (
                          <p
                            className={`flex items-center justify-center rounded-s-full rounded-e-full font-medium py-1.5 px-3 capitalize w-fit ${
                              value
                                ? value === "admin"
                                  ? "bg-[#F5F5FF] text-[#0408E7]"
                                  : value === "operator"
                                  ? "bg-[#FEF3F2] text-[#B42318]"
                                  : "bg-[#EFF8FF] text-[#175CD3]"
                                : ""
                            }`}
                          >
                            {value}
                          </p>
                        );
                      } else if (column?.dataIndex === "actions") {
                        return (
                          <Space size="middle" className="font-semibold">
                            <Button
                              type="link"
                              className="pl-0 text-[#475467] font-medium"
                            >
                              Delete
                            </Button>
                            <Button type="link" className="pl-0 font-medium">
                              Edit
                            </Button>
                          </Space>
                        );
                      } else if (
                        column?.dataIndex === "createtime" ||
                        column?.dataIndex === "last_active"
                      ) {
                        return (
                          <p className="capitalize">
                            {value &&
                              dayjs(value, "YYYYMMDD").format("MMM D, YYYY")}
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
                columns[columns.findIndex((i) => i.key === dragIndex.active)]
                  ?.title
              }
            </th>
          </DragOverlay>
        </DndContext>
      </div>
      <NewMember show={showNew} setShow={setShowNew} />
    </>
  );
};

export default Teams;
