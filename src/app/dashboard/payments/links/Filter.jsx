import RightModal from "@/app/components/RightModal";
import { HiMiniXMark } from "react-icons/hi2";
import { Button, DatePicker, Input, Select } from "antd";
import { CalendarSearch } from "iconsax-react";
import dayjs from "dayjs";

const Filter = ({
  show,
  setShow,
  merchantId,
  setMerchantId,
  status,
  setStatus,
  account,
  setAccount,
  paidDate,
  setPaidDate,
  createdDate,
  setCreatedDate,
}) => {
  function clearFilters() {
    setPaidDate();
    setCreatedDate();
    setStatus("");
    setMerchantId("");
    setAccount("");
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
              Create Date
            </label>
            <DatePicker.RangePicker
              value={createdDate}
              onChange={(e) => setCreatedDate(e)}
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
            <label htmlFor="date" className="w-fit font-medium">
              Last Paid Date
            </label>
            <DatePicker.RangePicker
              value={paidDate}
              onChange={(e) => setPaidDate(e)}
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
            <label htmlFor="merchantId" className="w-fit font-medium">
              Merchant ID
            </label>
            <Input
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              id="merchantId"
              placeholder="Enter ID"
              size="large"
              allowClear
              showSearch
            />
          </div>
          <div className="flex flex-col gap-1 2xl:gap-2">
            <label htmlFor="account" className="w-fit font-medium">
              Account NUmber
            </label>
            <Select
              value={account}
              onSearch={(e) => setAccount(e)}
              id="account"
              placeholder="Enter ID"
              size="large"
              allowClear
              showSearch
              options={[
                { label: "Cash Deposit", value: "cash deposit" },
                { label: "Bank Transfer", value: "bank transfer" },
                { label: "Card Payment", value: "card payment" },
              ]}
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
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "disabled", value: "disabled" },
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
