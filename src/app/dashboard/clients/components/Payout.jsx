import { Button, Form, Input, InputNumber, Select, Switch } from "antd";

const Payout = ({ selectedClient }) => {
  const [payoutForm] = Form.useForm();
  return (
    <Form
      layout="vertical"
      autoComplete="off"
      form={payoutForm}
      className="px-4 lg:px-5 2xl:px-6 text-left"
    >
      <div className=" flex flex-col gap-3 md:grid md:grid-cols-12 py-2 lg:py-3 2xl:py-4 border-b border-b-[#EAECF0]">
        <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
          <p className="font-medium text-sm lg:text-base">
            Payout Configuration
          </p>
          <p className="text-xs lg:text-sm text-[#475467]">
            Set payout configuration here.
          </p>
        </div>
        <div className="md:col-span-7 2xl:col-span-6 ">
          <Form.Item
            label="Maximum Payout"
            name={"max_payout"}
            rules={
              [
                //   {
                //     required: true,
                //     message: "Please select payin rate!",
                //   },
              ]
            }
            className="col-span-full"
          >
            <InputNumber
              size="large"
              placeholder="₦5,000,000"
              className="w-full"
              controls={false}
            />
          </Form.Item>
          <div className="flex justify-between">
            <p className="font-medium text-xs lg:text-sm">Enable Payout</p>
            <Form.Item name={"payout"} className="">
              <Switch />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-3 md:grid md:grid-cols-12 py-2 lg:py-3 2xl:py-4 border-b border-b-[#EAECF0]">
        <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
          <p className="font-medium text-sm lg:text-base">Payout Fee</p>
          <p className="text-xs lg:text-sm text-[#475467]">
            Set the fee for payout here.
          </p>
        </div>
        <div className="md:col-span-7 2xl:col-span-6 grid grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5">
          <Form.Item
            label="Payout Rate"
            name={"payout_rate"}
            rules={
              [
                //   {
                //     required: true,
                //     message: "Please select payin rate!",
                //   },
              ]
            }
            className="col-span-full"
          >
            <Select size="large" placeholder="Naira (₦)" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Minimum Payout"
            name={"minimum_payout"}
            rules={[
              //   {
              //     required: true,
              //     message: "Please enter minimum payin!",
              //   },
              { type: "number" },
            ]}
          >
            <InputNumber
              size="large"
              controls={false}
              placeholder="₦ 0.00"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Maximum Payout"
            name={"maximum_payout"}
            rules={[
              //   {
              //     required: true,
              //     message: "Please enter maximum payin!",
              //   },
              { type: "number" },
            ]}
          >
            <InputNumber
              size="large"
              controls={false}
              placeholder="₦ 0.00"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Fixed Payout"
            name={"fixed_payout"}
            rules={[
              //   {
              //     required: true,
              //     message: "Please enter maximum payin!",
              //   },
              { type: "number" },
            ]}
            className="col-span-full"
          >
            <InputNumber
              size="large"
              controls={false}
              placeholder="₦ 0.00"
              className="w-full"
            />
          </Form.Item>
        </div>
      </div>
      <div className=" flex flex-col gap-3 md:grid md:grid-cols-12 py-2 lg:py-3 2xl:py-4 border-b border-b-[#EAECF0]">
        <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
          <p className="font-medium text-sm lg:text-base">Reset Payout PIN</p>
          <p className="text-xs lg:text-sm text-[#475467]">
            Rest payout PIN here.
          </p>
        </div>
        <div className="md:col-span-7 2xl:col-span-6 flex gap-3 lg:gap-4 2xl:gap-5">
          <Button className="w-full" type="primary">Reset</Button>
          <Button className="w-fit">Copy</Button>
        </div>
      </div>
      <div className=" flex flex-col gap-3 md:grid md:grid-cols-12 py-2 lg:py-3 2xl:py-4 border-b border-b-[#EAECF0]">
        <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
          <p className="font-medium text-sm lg:text-base">Recharge Account</p>
          <p className="text-xs lg:text-sm text-[#475467]">
            Configure bank account for recharge here.
          </p>
        </div>
        <div className="md:col-span-7 2xl:col-span-6 ">
          <Form.Item
            label="Account Number"
            name={"account_number"}
            rules={
              [
                //   {
                //     required: true,
                //     message: "Please select payin rate!",
                //   },
              ]
            }
            className="col-span-full"
          >
            <InputNumber
              size="large"
              placeholder="Enter account number"
              className="w-full"
              controls={false}
            />
          </Form.Item>
          <Form.Item
            label="Account Name"
            name={"account_name"}
            rules={
              [
                //   {
                //     required: true,
                //     message: "Please select payin rate!",
                //   },
              ]
            }
            className="col-span-full"
          >
            <Input
              size="large"
              placeholder="Enter account name"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name={"bank_name"}
            rules={
              [
                //   {
                //     required: true,
                //     message: "Please select payin rate!",
                //   },
              ]
            }
            className="col-span-full"
          >
            <Select size="large" placeholder="Select Bank" className="w-full" />
          </Form.Item>
        </div>
      </div>
      <div className=" flex flex-col gap-3 md:grid md:grid-cols-12 pt-2 lg:pt-3 2xl:pt-4">
        <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
          <p className="font-medium text-sm lg:text-base">Recharge Fee</p>
          <p className="text-xs lg:text-sm text-[#475467]">
            Configure recharge fee here.
          </p>
        </div>
        <div className="md:col-span-7 2xl:col-span-6 grid grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5">
          <Form.Item
            label="Recharge Rate"
            name={"recharge_rate"}
            rules={
              [
                //   {
                //     required: true,
                //     message: "Please select payin rate!",
                //   },
              ]
            }
            className="col-span-full"
          >
            <Select size="large" placeholder="Naira (₦)" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Minimum Recharge"
            name={"minimum_recharge"}
            rules={[
              //   {
              //     required: true,
              //     message: "Please enter minimum payin!",
              //   },
              { type: "number" },
            ]}
          >
            <InputNumber
              size="large"
              controls={false}
              placeholder="₦ 0.00"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Maximum Recharge"
            name={"maximum_recharge"}
            rules={[
              //   {
              //     required: true,
              //     message: "Please enter maximum payin!",
              //   },
              { type: "number" },
            ]}
          >
            <InputNumber
              size="large"
              controls={false}
              placeholder="₦ 0.00"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Fixed Recharge"
            name={"fixed_recharge"}
            rules={[
              //   {
              //     required: true,
              //     message: "Please enter maximum payin!",
              //   },
              { type: "number" },
            ]}
            className="col-span-full"
          >
            <InputNumber
              size="large"
              controls={false}
              placeholder="₦ 0.00"
              className="w-full"
            />
          </Form.Item>
          <Form.Item className="col-span-full">
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button size="large">Cancel</Button>
              <Button size="large" type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Payout;
