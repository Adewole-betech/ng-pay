import { Button, Form, Input, InputNumber } from "antd";

const Amount = ({ setCurrentStep }) => {
  const [amountForm] = Form.useForm();

  const onFinish = (values) => {
    setCurrentStep(2);
  };
  return (
    <Form
      name="amountForm"
      autoComplete="off"
      form={amountForm}
      layout="vertical"
      className="w-3/5 text-left"
      onFinish={onFinish}
    >
      <div className="w-full py-2 lg:py-3 px-3 lg:px-4 2xl:px-5 bg-primary-50 border border-primary-200 rounded-md text-primary-800 mb-3 lg:mb-4 2xl:mb-5 font-medium text-xs lg:text-sm 2xl:text-base">
        Maximum Payout is ₦5,000,000.00
      </div>
      <Form.Item
        label="Enter Amount to Send"
        name={"amount"}
        rules={[
          {
            required: true,
            message: "Please enter amount to send!",
          },
        ]}
      >
        <InputNumber
          controls={false}
          className="w-full"
          placeholder="Enter amount to send"
          size="large"
        />
      </Form.Item>
        <p className="text-neutral-500 font-medium text-xs lg:text-sm">
          Available Balance:{" "}
          <span className="text-primary-main">₦3,000,000.00</span>
        </p>

      <Form.Item label="Add Narration (Optional)" name={"narration"}>
        <Input.TextArea
          autoSize={{ minRows: 4, maxRows: 4 }}
          className="no-scrollbar"
          placeholder="Enter narration"
          maxLength={100}
          count={{
            max: 100,
            show: true,
          }}
        />
      </Form.Item>
      <Form.Item>
        <div className="flex w-full justify-end gap-2 lg:gap-3">
          <Button onClick={() => setCurrentStep(0)} className="">
            Back
          </Button>
          <Button htmlType="submit" type="primary">
            Next
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Amount;
