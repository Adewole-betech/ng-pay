import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

const Passwords = () => {
  const [passwordForm] = Form.useForm();
  const [pinForm] = Form.useForm();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 md:grid md:grid-cols-12 pb-2 lg:pb-3 2xl:pb-4 border-b border-b-[#EAECF0]">
        <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
          <p className="font-medium text-sm lg:text-base">Password Details</p>
          <p className="text-xs lg:text-sm text-[#475467]">
            Please enter your current password to change your password.
          </p>
        </div>
        <div className="md:col-span-7 2xl:col-span-6">
          <Form
            layout="vertical"
            autoComplete="off"
            form={passwordForm}
            className="px-4 lg:px-5 2xl:px-6 text-left grid grid-cols-1 md:grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5"
          >
            <Form.Item
              label="Current Password"
              name={"current_password"}
              rules={[
                {
                  required: true,
                  message: "Please enter current password!",
                },
              ]}
              className="col-span-full"
            >
              <Input.Password
                size="large"
                placeholder="Enter current password"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name={"new_password"}
              rules={[
                {
                  required: true,
                  message: "Please enter new password!",
                },
                { min: 8 },
              ]}
              className="col-span-full"
            >
              <Input.Password
                size="large"
                placeholder="Enter new password"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name={"confirm_password"}
              rules={[
                {
                  required: true,
                  message: "Please Confirm password!",
                },
                { min: 8 },
              ]}
              className="col-span-full"
            >
              <Input.Password
                size="large"
                placeholder="Confirm password"
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
          </Form>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-12 pt-2 lg:pt-3 2xl:pt-4">
        <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
          <p className="font-medium text-sm lg:text-base">Change PIN</p>
          <p className="text-xs lg:text-sm text-[#475467]">
            Please enter your current PIN to change your PIN.
          </p>
        </div>
        <div className="md:col-span-7 2xl:col-span-6">
          <Form
            layout="vertical"
            autoComplete="off"
            form={pinForm}
            className="px-4 lg:px-5 2xl:px-6 text-left grid grid-cols-1 md:grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5"
          >
            <Form.Item
              label="Current PIN"
              name={"current_ppin"}
              rules={[
                {
                  required: true,
                  message: "Please enter current pin!",
                },
              ]}
              className="col-span-full"
            >
              <Input.Password
                size="large"
                placeholder="Enter current pin"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="New PIN"
              name={"new_pin"}
              rules={[
                {
                  required: true,
                  message: "Please enter new pin!",
                },
                { min: 8 },
              ]}
              className="col-span-full"
            >
              <Input.Password
                size="large"
                placeholder="Enter new pin"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Confirm PIN"
              name={"confirm_pin"}
              rules={[
                {
                  required: true,
                  message: "Please confirm pin!",
                },
                { min: 8 },
              ]}
              className="col-span-full"
            >
              <Input.Password
                size="large"
                placeholder="Confirm pin"
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Passwords;
