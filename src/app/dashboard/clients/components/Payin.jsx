import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";

const Payin = ({ selectedClient, setSelectedClient }) => {
  const [payinForm] = Form.useForm();

  useEffect(() => {
    if (selectedClient) {
      payinForm.setFieldsValue({
        rate: selectedClient?.rate,
        min: selectedClient?.min,
        max: selectedClient?.max,
        fix: selectedClient?.fix,
        prefergw: selectedClient?.prefergw,
        settle_period: selectedClient?.settle_period ?? "T1",
      });
    }
  }, [selectedClient]);
  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-12">
      <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
        <p className="font-medium text-sm lg:text-base">Payin Configuration</p>
        <p className="text-xs lg:text-sm text-[#475467]">
          Set the configuration for payin here.
        </p>
      </div>
      <div className="md:col-span-7 2xl:col-span-6">
        <Form
          layout="vertical"
          autoComplete="off"
          form={payinForm}
          initialValues={{
            rate: selectedClient?.rate,
            min: selectedClient?.min,
            max: selectedClient?.max,
            fix: selectedClient?.fix,
            prefergw: selectedClient?.prefergw,
            settle_period: selectedClient?.settle_period ?? "T1",
          }}
          className="px-4 lg:px-5 2xl:px-6 pt-6 lg:pt-8 2xl:pt-10 text-left grid grid-cols-1 md:grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5"
        >
          <Form.Item
            label="Payin Rate"
            name={"rate"}
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
            label="Minimum Payin"
            name={"min"}
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
            label="Maximum Payin"
            name={"max"}
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
            label="Fixed Payin"
            name={"fix"}
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
          <Form.Item
            label="Payment Gateway"
            name={"prefergw"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please select payment gateway!",
            //   },
            // ]}
            className="col-span-full"
          >
            <Input
              size="large"
              placeholder="Enter payment gateway"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Settled Period"
            name={"settle_period"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please select settled period!",
            //   },
            // ]}
            className="col-span-full"
          >
            <Select
              size="large"
              placeholder="Select settled period"
              className="w-full"
              options={[
                { value: "T1", label: "T1" },
                { value: "D1", label: "D1" },
                { value: "D0", label: "D0" },
              ]}
            />
          </Form.Item>
          <Form.Item className="col-span-full">
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button
                onClick={() => {
                  payinForm.resetFields();
                }}
                size="large"
              >
                Cancel
              </Button>
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

export default Payin;
