import Modal from "@/app/components/Modal";
import { Button, Form, Input, InputNumber } from "antd";
import { HiMiniXMark } from "react-icons/hi2";

const NewClient = ({ show, setShow, selectedClient, setSelectedClient }) => {
  const [clientForm] = Form.useForm();
  return (
    <Modal show={show}>
      <div className="flex flex-col w-96 md:w-[28rem] lg:w-[30.5rem]">
        <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-3 lg:py-4 px-4 lg:px-5 2xl:px-6">
          <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize">
            Add New Client
          </p>
          <HiMiniXMark
            onClick={() => setShow(!show)}
            className="text-neutral-500 stroke-2 size-3 lg:size-4 hover:text-primary-main hover:cursor-pointer"
          />
        </div>
        <Form
          layout="vertical"
          autoComplete="off"
          form={clientForm}
          className="px-4 lg:px-5 2xl:px-6 pt-6 lg:pt-8 2xl:pt-10 text-left"
        >
          <Form.Item
            label="Client ID"
            name={"client_id"}
            rules={[
              {
                required: true,
                message: "Please enter client id!",
              },
            ]}
          >
            <Input placeholder="NG12345" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Client Name"
            name={"client_name"}
            rules={[
              {
                required: true,
                message: "Please enter client name!",
              },
            ]}
          >
            <Input placeholder="Enter name" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please enter email address!",
              },
              {
                type: "email",
                message: "Please enter valid email address",
              },
            ]}
          >
            <Input placeholder="Enter email address" className="w-full" />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button onClick={() => setShow(!show)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Client
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default NewClient;
