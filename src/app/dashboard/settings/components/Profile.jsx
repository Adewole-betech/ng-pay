import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const Profile = ({ userProfile }) => {
  const [profileForm] = Form.useForm();
  console.log(userProfile);

  useEffect(() => {
    if (userProfile) {
      profileForm.setFieldsValue({
        username: userProfile?.username,
        status: userProfile?.status,
        roles: userProfile?.roles,
        createtime: userProfile?.createtime
          ? dayjs(userProfile?.createtime)
          : "",
      });
    }
  }, [userProfile]);
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
          form={profileForm}
          className="px-4 lg:px-5 2xl:px-6 text-left grid grid-cols-1 md:grid-cols-2 gap-x-3 lg:gap-x-4 2xl:gap-x-5"
        >
          <Form.Item
            label="Username"
            name={"username"}
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
              placeholder="Enter full name"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Email Address"
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
              placeholder="Enter email address"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
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
            <Input size="large" placeholder="₦ 0.00" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Status"
            name={"status"}
            rules={[
              {
                required: true,
                message: "Please select status!",
              },
            ]}
            className="col-span-full"
          >
            <Select
              size="large"
              placeholder="Select status"
              className="w-full"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "disabled", label: "Disabled" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name={"roles"}
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
              placeholder="Select client role"
              className="w-full"
              options={[
                { value: "admin", label: "Admin" },
                { value: "client", label: "Client" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Note" name={"notes"} className="col-span-full">
            <Input.TextArea
              placeholder="Enter a note"
              className="w-full"
              autoSize={{ maxRows: 3, minRows: 3 }}
              maxLength={200}
              size="large"
              showCount={(val, count, maxLength) => {
                console.log(maxLength, count, val);
                return (
                  <span className="text-neutral-500 font-medium text-xs lg:text-sm">
                    {maxLength} Characters Max.
                  </span>
                );
              }}
            />
          </Form.Item>
          <Form.Item
            label="Create Time"
            name={"createtime"}
            className="col-span-full"
          >
            <DatePicker
              placeholder="Enter a note"
              className="w-full"
              size="large"
              format={"DD/MM/YYYY"}
              disabled
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
  );
};

export default Profile;
