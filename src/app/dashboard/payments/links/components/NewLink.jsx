import Modal from "@/app/components/Modal";
import { Button, Form, Input, InputNumber } from "antd";
import { HiMiniXMark } from "react-icons/hi2";

const NewLink = ({ show, setShow }) => {
  return (
    <Modal show={show}>
      <div className="flex flex-col w-96 md:w-[28rem] lg:w-[30.5rem]">
        <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-3 lg:py-4 px-4 lg:px-5 2xl:px-6">
          <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize">
            New Payment Link
          </p>
          <HiMiniXMark
            onClick={() => setShow(!show)}
            className="text-neutral-500 stroke-2 size-3 lg:size-4 hover:text-primary-main hover:cursor-pointer"
          />
        </div>
        <Form
          layout="vertical"
          autoComplete="off"
          className="px-4 lg:px-5 2xl:px-6 pt-6 lg:pt-8 2xl:pt-10 text-left"
        >
          <Form.Item
            label="Amount"
            name={"amount"}
            rules={[
              {
                required: true,
                message: "Please enter amount!",
              },
            ]}
          >
            <InputNumber
              controls={false}
              placeholder="Enter amount"
              className="w-full"
            />
          </Form.Item>
          <Form.Item label="Add Narration (Optional)" name={"narration"}>
            <Input.TextArea
              placeholder="Enter narration"
              autoSize={{ minRows: 4, maxRows: 4 }}
              className="no-scrollbar"
              maxLength={200}
              showCount={(val, count, maxLength) => (
                <span className="text-neutral-500 font-medium text-xs lg:text-sm">
                  {maxLength} Characters Max.
                </span>
              )}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button onClick={() => setShow(!show)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create Payment Link
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default NewLink;
