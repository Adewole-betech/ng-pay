import Modal from "@/app/components/Modal";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { HiMiniXMark } from "react-icons/hi2";

const NewMember = ({ show, setShow }) => {
  const [memberForm] = Form.useForm();
  return (
    <Modal show={show}>
      <div className="flex flex-col w-96 md:w-[28rem] lg:w-[30.5rem]">
        <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-3 lg:py-4 px-4 lg:px-5 2xl:px-6">
          <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize">
            Invite New Member
          </p>
          <HiMiniXMark
            onClick={() => setShow(!show)}
            className="text-neutral-500 stroke-2 size-3 lg:size-4 hover:text-primary-main hover:cursor-pointer"
          />
        </div>
        <Form
          layout="vertical"
          autoComplete="off"
          form={memberForm}
          className="px-4 lg:px-5 2xl:px-6 pt-6 lg:pt-8 2xl:pt-10 text-left"
        >
          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please enter name!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter name" className="w-full" />
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
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter email address"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name={"role"}
            rules={[
              {
                required: true,
                message: "Please select client role!",
              },
            ]}
            className="col-span-full"
          >
            <Select
              size="large"
              placeholder="Select role"
              className="w-full"
              options={[
                { value: "admin", label: "Admin" },
                { value: "client", label: "Client" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button onClick={() => setShow(!show)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Invite
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default NewMember;
