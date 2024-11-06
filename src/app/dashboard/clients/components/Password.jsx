import { Button, Form, Input, InputNumber, Select } from "antd";

const Password = ({ selectedClient, setSelectedClient, setCurrentPage }) => {
  const [passwordForm] = Form.useForm();
  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-12">
      <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
        <p className="font-medium text-sm lg:text-base">Reset Password</p>
        <p className="text-xs lg:text-sm text-[#475467]">
          Reset login password for client here.
        </p>
      </div>
      <div className="md:col-span-7 2xl:col-span-6">
        <Form
          layout="vertical"
          autoComplete="off"
          form={passwordForm}
          className="px-4 lg:px-5 2xl:px-6 pt-6 lg:pt-8 2xl:pt-10 text-left grid grid-cols-1 md:grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5"
        >
          <Form.Item
            label="New Password"
            name={"new_password"}
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
            className="col-span-full"
          >
            <Input.Password
              size="large"
              placeholder="Enter Password"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name={"confirm_password"}
            rules={[
              {
                required: true,
                message: "Please confirm password!",
              },
            ]}
            className="col-span-full"
          >
            <Input.Password
              size="large"
              placeholder="Confirm Password"
              className="w-full"
            />
          </Form.Item>
          <Form.Item className="col-span-full">
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button
                size="large"
                onClick={() => {
                  setSelectedClient(null);
                  setCurrentPage("dashboard");
                }}
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

export default Password;
