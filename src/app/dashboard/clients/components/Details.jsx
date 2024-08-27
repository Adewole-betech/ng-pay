import { Button, Form, Input, Select } from "antd";

const Details = ({ selectedClient }) => {
  const [detailsForm] = Form.useForm();
  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-12">
      <div className="md:col-span-4 2xl:col-span-5 flex flex-col gap-0.5 md:gap-1">
        <p className="font-medium text-sm lg:text-base">Client Details</p>
        <p className="text-xs lg:text-sm text-[#475467]">
          Update Client information here.
        </p>
      </div>
      <div className="md:col-span-7 2xl:col-span-6">
        <Form
          layout="vertical"
          autoComplete="off"
          form={detailsForm}
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
            label="Role"
            name={"role"}
            rules={[
              {
                required: true,
                message: "Please select client role!",
              },
            ]}
          >
            <Select
              placeholder="Select client role"
              className="w-full"
              options={[
                { value: "admin", label: "Admin" },
                { value: "client", label: "Client" },
              ]}
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
          >
            <Select
              placeholder="Select merchant type"
              className="w-full"
              options={[
                { value: "payin_payout", label: "Payin & Payout" },
                { value: "payin", label: "Payin" },
                { value: "payout", label: "Payout" },
              ]}
            />
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
          >
            <Select
              placeholder="Select status"
              className="w-full"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "disabled", label: "Disabled" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Add a Note" name={"notes"}>
            <Input.TextArea
              placeholder="Enter a note"
              className="w-full"
              autoSize={{ maxRows: 3, minRows: 3 }}
              maxLength={200}
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
          <Form.Item>
            <div className="flex items-center justify-end gap-2 lg:gap-3">
              <Button>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Details;
