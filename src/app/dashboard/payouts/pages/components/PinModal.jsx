const { default: Modal } = require("@/app/components/Modal");
const { Form, Input, Button } = require("antd");
const { HiMiniXMark } = require("react-icons/hi2");

const TransactionPin = ({ show, setShow }) => {
  const [pinForm] = Form.useForm();
  return (
    <Modal show={show}>
      <div className="flex flex-col w-96 md:w-[28rem] lg:w-[30.5rem]">
        <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-3 lg:py-4 px-4 lg:px-5 2xl:px-6">
          <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize">
            Transaction Pin
          </p>
          <HiMiniXMark
            onClick={() => setShow(!show)}
            className="text-neutral-500 stroke-2 size-3 lg:size-4 hover:text-primary-main hover:cursor-pointer"
          />
        </div>
        <Form
          layout="vertical"
          autoComplete="off"
          form={pinForm}
          className="py-6 lg:py-8 2xl:py-10 px-4 lg:px-5 2xl:px-6 text-left"
        >
          <Form.Item
            name={"pin"}
            label="Enter your 5-digits transaction PIN to confirm transaction"
            rules={[
              {
                required: true,
                message: "Please enter your transaction PIN!",
              },
            ]}
          >
            <Input.OTP
              size="large"
              length={5}
              className="w-full text-4xl lg:!text-[40px]"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex w-full justify-end gap-2 lg:gap-3">
              <Button size="large" onClick={() => setShow(false)} className="">
                Cancel
              </Button>
              <Button size="large" htmlType="submit" type="primary">
                Send Money
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default TransactionPin;
