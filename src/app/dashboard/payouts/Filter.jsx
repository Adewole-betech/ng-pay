import RightModal from "@/app/components/RightModal";
import { HiMiniXMark } from "react-icons/hi2";
import { Button, DatePicker, Input, Select } from "antd";
import { CalendarSearch } from "iconsax-react";
import dayjs from "dayjs";

const Filter = ({
  show,
  setShow,
  txId,
  setTxId,
  refId,
  setRefId,
  status,
  setStatus,
  selectedDate,
  setSelectedDate,
}) => {
  function clearFilters() {
    setRefId("");
    setSelectedDate();
    setStatus("");
    setTxId("");
  }

  return (
    <RightModal show={show}>
      <div className="flex flex-col gap-4 lg:gap-6 2xl:gap-8 w-full">
        <div className="py-4  px-4 lg:px-6 flex items-center justify-between border-b border-b-[#EAECF0]">
          <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize">
            Filter
          </p>
          <HiMiniXMark
            onClick={() => setShow(!show)}
            className="text-neutral-500 stroke-2 size-3 lg:size-4 hover:text-primary-main hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-3 lg:gap-4 2xl:gap-6 px-4 lg:px-6">
          <div className="flex flex-col gap-1 2xl:gap-2">
            <label htmlFor="date" className="w-fit font-medium">
              Date
            </label>
            <DatePicker.RangePicker
              value={selectedDate}
              onChange={(e) => setSelectedDate(e)}
              id="date"
              separator={"-"}
              placeholder={`${dayjs().format("MMMM D, YYYY")}`}
              popupClassName="z-[10001]"
              format={"MMMM D, YYYY"}
              size="large"
              suffixIcon={<CalendarSearch className="text-neutral-700" />}
            />
          </div>
          <div className="flex flex-col gap-1 2xl:gap-2">
            <label htmlFor="txId" className="w-fit font-medium">
              Transaction ID
            </label>
            <Input
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              id="txId"
              placeholder="Enter ID"
              size="large"
              allowClear
              showSearch
            />
          </div>
          <div className="flex flex-col gap-1 2xl:gap-2">
            <label htmlFor="refId" className="w-fit font-medium">
              Reference ID
            </label>
            <Input
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              id="refId"
              placeholder="Enter ID"
              size="large"
              allowClear
            />
          </div>
          <div className="flex flex-col gap-1 2xl:gap-2">
            <label htmlFor="status" className="w-fit font-medium">
              Status
            </label>
            <Select
              value={status}
              //   mode="tags"
              onSearch={(e) => setStatus(e)}
              id="status"
              placeholder="Enter ID"
              size="large"
              allowClear
              showSearch
              options={[
                { label: "Successful", value: "successful" },
                { label: "Failed", value: "failed" },
                { label: "Pending", value: "pending" },
              ]}
            />
          </div>
        </div>
        <div className="flex w-full justify-end px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <Button
              onClick={() => clearFilters()}
              // className="border !py-2 !px-3 2xl:!py-2.5 2xl:!px-5 flex items-center gap-1.5 2xl:gap-2 text-base rounded-md lg:rounded-lg !border-neutral-200 font-medium"
            >
              Clear Filter
            </Button>
            <Button
              type="primary"
              onClick={() => setShow(!show)}
              // className="border 2xl:border-2 !py-2 !px-3 2xl:!py-2.5 2xl:!px-5 flex items-center gap-1.5 2xl:gap-2 text-base rounded-md lg:rounded-lg !border-primary-500 font-medium"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </RightModal>
  );
};

export default Filter;
