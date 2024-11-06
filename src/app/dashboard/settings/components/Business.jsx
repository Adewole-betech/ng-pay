import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

const BusinessInformation = ({ clientData }) => {
  const [businessForm] = Form.useForm();
  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-12">
      <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
        <p className="font-medium text-sm lg:text-base">My Details</p>
        <p className="text-xs lg:text-sm text-[#475467]">
          Update your personal details here.
        </p>
      </div>
      <div className="md:col-span-7 2xl:col-span-6">
        <Form
          layout="vertical"
          autoComplete="off"
          form={businessForm}
          className="px-4 lg:px-5 2xl:px-6 text-left grid grid-cols-1 md:grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5"
        >
          <Form.Item
            label="Business Name"
            name={"business_name"}
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
              placeholder="Enter business name"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Business Type"
            name={"business_type"}
            rules={[
              {
                required: true,
                message: "Please select business type!",
              },
            ]}
            className="col-span-full"
          >
            <Select
              size="large"
              placeholder="Select business type"
              className="w-full"
              options={[
                { value: "e-commerce", label: "E-commerce" },
                { value: "payin", label: "Payin" },
                { value: "payout", label: "Payout" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Business Email Address"
            name={"email"}
            rules={[
              //   {
              //     required: true,
              //     message: "Please enter minimum payin!",
              //   },
              { type: "email" },
            ]}
            className="col-span-full"
          >
            <Input
              size="large"
              placeholder="Enter business email address"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Business Phone Number"
            name={"phone_number"}
            rules={
              [
                //   {
                //     required: true,
                //     message: "Please enter maximum payin!",
                //   },
              ]
            }
            className="col-span-full"
          >
            <Input
              size="large"
              placeholder="Enter business phone number"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Merchant Type"
            name={"merchant_type"}
            rules={[
              {
                required: true,
                message: "Please select merchant type!",
              },
            ]}
            className="col-span-full"
          >
            <Select
              size="large"
              placeholder="Select merchant type"
              className="w-full"
              options={[
                { value: "payin_payout", label: "Payin & Payout" },
                { value: "payin", label: "Payin" },
                { value: "payout", label: "Payout" },
              ]}
            />
          </Form.Item>
          <Form.Item label={"API Key"} className="col-span-full">
            <div className="md:col-span-7 2xl:col-span-6 flex gap-3 lg:gap-4 2xl:gap-5">
              <Button className="w-full" type="primary">
                Reset
              </Button>
              <Button className="w-fit">Copy</Button>
            </div>
          </Form.Item>
          <Form.Item className="col-span-full">
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button size="large">Cancel</Button>
              <Button size="large" type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BusinessInformation;
