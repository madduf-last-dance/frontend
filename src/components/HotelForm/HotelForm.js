import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Upload,
  Checkbox,
  Select,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { getBenefits } from "../../services/accommodationService";
const { Option } = Select;
const HotelForm = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [base64, setBase64] = useState("");
  const [baseImages64, setBaseImages64] = useState([]);
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        availability: initialValues.availability.map((a) => ({
          ...a,
          startDate: dayjs(a.startDate, "YYYY-MM-DD"),
          endDate: dayjs(a.endDate, "YYYY-MM-DD"),
        })),
        photos: initialValues.photos.map((url, index) => ({
          uid: index,
          name: `photo_${index}`,
          status: "done",
          url,
        })),
      });
    } else {
      form.resetFields(); // Reset form fields when initialValues is null or undefined
    }
  }, [form, initialValues]);

  useEffect(() => {
    getBenefits()
      .then((data) => {
        console.log(data);
        setBenefits(data);
      })
      .catch((error) => {
        console.error("Failed to fetch accommodation:", error);
      });
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList) {
      return e.fileList;
    }
    return [];
  };

  const onFinishHandler = async (values) => {
    const reader = new FileReader();

    // reader.onload = () => {
    //   const base64String = reader.result.replace("data:", "")
    //   .replace(/^.+,/, "");
    //   let storedBase64String = base64String;
    //   setBase64(storedBase64String);
    // };
    // console.log(values.photos);
    const formattedValues = {
      ...values,
      availability: values.availability.map((a) => ({
        ...a,
        startDate: a.startDate.format("YYYY-MM-DD"),
        endDate: a.endDate.format("YYYY-MM-DD"),
      })),
      photos: values.photos?.map((file) => {
        return base64;

        // if(file.originFileObj) {
        //   reader.readAsDataURL(file.originFileObj);
        //   return base64;
        // } else {
        //   return file.url;
        // }
      }),
    };
    onFinish(formattedValues);
  };

  const handleUploadChange = async (info) => {
    const files = info.fileList
      .map((file) => file.originFileObj)
      .filter(Boolean); // Get all files from fileList
    const base64Array = await Promise.all(
      files.map((file) => convertToBase64(file)),
    ); // Convert all files to base64
    console.log(base64Array);
    if (info.file.status === "done" || info.file.status === "uploading") {
      const base64 = await convertToBase64(info.file.originFileObj);
      setBase64(base64);
    }
  };

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinishHandler}>
        <Form.Item
          label="ID"
          name="id"
          value={form.id}
          style={{ display: "none" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the hotel name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: false, message: "Please input the description!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input the location!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Benefits"
          name="benefits"
          rules={[{ required: true, message: "Please input the benefits!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select a benefit"
            style={{ width: "100%" }}
            // onChange={onChange}
          >
            {benefits.map((benefit) => (
              <Option key={benefit.id} value={benefit.id}>
                {benefit.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Photos"
          name="photos"
          rules={[{ required: false, message: "Please upload photos!" }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture"
            multiple
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Minimum Guests"
          name="minimumGuests"
          rules={[
            {
              required: true,
              message: "Please input the minimum number of guests!",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Maximum Guests"
          name="maximumGuests"
          rules={[
            {
              required: true,
              message: "Please input the maximum number of guests!",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Price per Guest"
          name="isPerGuest"
          valuePropName="checked"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          label="Accept automatically"
          name="isAutomatic"
          valuePropName="checked"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Checkbox />
        </Form.Item>
        <Form.List
          name="availability"
          rules={[
            {
              validator: async (_, availabilities) => {
                if (!availabilities || availabilities.length < 1) {
                  return Promise.reject(
                    new Error("At least one availability is required"),
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                  <Form.Item
                    {...restField}
                    name={[name, "startDate"]}
                    fieldKey={[fieldKey, "startDate"]}
                    rules={[{ required: true, message: "Missing start date" }]}
                    style={{ flex: 1 }}
                  >
                    <DatePicker placeholder="Start Date" format="DD-MM-YYYY" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "endDate"]}
                    fieldKey={[fieldKey, "endDate"]}
                    rules={[{ required: true, message: "Missing end date" }]}
                    style={{ flex: 1, marginLeft: 8 }}
                  >
                    <DatePicker placeholder="End Date" format="DD-MM-YYYY" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    fieldKey={[fieldKey, "price"]}
                    rules={[{ required: true, message: "Missing price" }]}
                    style={{ flex: 1, marginLeft: 8 }}
                  >
                    <InputNumber placeholder="Price" />
                  </Form.Item>
                  <MinusCircleOutlined
                    style={{ margin: "0 8px", alignSelf: "center" }}
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: "100%" }}
                >
                  Add Availability
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Hotel" : "Add Hotel"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default HotelForm;
