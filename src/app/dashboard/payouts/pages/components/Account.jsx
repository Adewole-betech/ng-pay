import { Avatar, Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { SearchNormal } from "iconsax-react";

const beneficiaries = [
  {
    recipient_account: "3000412789",
    customer: "Temitope Famuyiwa",
    bank_name: "GTBank",
  },
  {
    recipient_account: "3000412789",
    customer: "Adelaide Swanson",
    bank_name: "GTBank",
  },
  {
    recipient_account: "3000412789",
    customer: "Kenneth Fletcher",
    bank_name: "GTBank",
  },
  {
    recipient_account: "3000412789",
    customer: "Alan Carroll",
    bank_name: "GTBank",
  },
  {
    recipient_account: "3000412789",
    customer: "Alice Newton",
    bank_name: "GTBank",
  },
];

const Account = ({ setCurrentStep, setCurrentPage }) => {
  const [accountForm] = Form.useForm();

  const onFinish = (values) => {
    setCurrentStep(1);
  };
  return (
    <Form
      name="accountForm"
      autoComplete="off"
      form={accountForm}
      layout="vertical"
      className="w-3/5 text-left"
      onFinish={onFinish}
    >
      <Form.Item
        label="Account Number"
        name={"accountNumber"}
        rules={[
          {
            required: true,
            message: "Please enter account number!",
          },
        ]}
      >
        <InputNumber
          controls={false}
          className="w-full"
          placeholder="Enter account number"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label="Select Bank"
        name={"bank"}
        rules={[
          {
            required: true,
            message: "Please select a bank!",
          },
        ]}
      >
        <Select
          allowClear
          showSearch
          size="large"
          options={[{ label: "Access Bank", value: "GT" }]}
        />
      </Form.Item>

      <div className="my-3 lg:my-4 2xl:my-5 w-full flex items-center justify-end gap-2 lg:gap-3 2xl:gap-4">
        <p className="text-primary-600 font-medium text-sm lg:text-base">
          Add To Beneficiary
        </p>
        <Switch size="large" />
      </div>
      <div className="border-t border-t-[#EAECF0] py-3 lg:py-4 2xl:py-5 flex flex-col gap-3 lg:gap-4">
        <div className="flex justify-between">
          <p className="font-medium text-sm lg:text-base">Beneficiaries</p>
          <Input
            prefix={<SearchNormal />}
            size="large"
            className="h-8 lg:h-10 py-1.5 lg:py-2.5 md:w-3/5"
          />
        </div>
        <div className="flex flex-col px-3 lg:px-4 2xl:px-5 border 2xl:border-2 border-neutral-200 rounded-lg">
          {beneficiaries.map((ben, ind) => (
            <div
              key={ind}
              className="flex items-center gap-2 lg:gap-3 py-3 lg:py-4 border-b 2xl:border-b-2 border-b-neutral-200 last:border-b-0"
            >
              <Avatar src="">
                {ben?.customer[0]}
                {ben?.customer.split(" ")[1][0]}
              </Avatar>
              <div className="flex flex-col xl:gap-1">
                <p className="font-medium text-xs lg:text-sm">
                  {ben?.recipient_account}
                </p>
                <p className="text-xs lg:text-sm text-neutral-500">
                  {ben?.customer} - {ben?.bank_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Form.Item>
        <div className="flex w-full justify-end gap-2 lg:gap-3">
          <Button onClick={() => setCurrentPage("payout")} className="">
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Next
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Account;
