import React, { useState } from "react";
import { Input, DatePicker, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import moment, { updateLocale } from "moment";
import "./SearchBar.css"; // Create a CSS file for custom styles if needed
import { search } from "../../services/accommodationService";
import dayjs from "dayjs";
import axios from "axios";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function SearchBar({ updateHotels }) {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState([]);
  const [guests, setGuests] = useState(1);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleGuestChange = (value) => {
    setGuests(value);
  };

  const handleSearch = () => {
    const apiClient = axios.create({
      baseURL: "http://172.28.225.22.nip.io",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });

    apiClient
      .get(`/accommodation/search`, {
        params: {
          location: location,
          numberOfGuests: guests,
          startDate: dayjs(dates[0], "DD-MM-YYYY"),
          endDate: dayjs(dates[1], "DD-MM-YYYY"),
        },
      })
      .then((response) => {
        updateHotels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <Input
          placeholder="Location"
          value={location}
          onChange={handleLocationChange}
          style={{ width: 200, marginRight: 10 }}
        />
        <RangePicker
          value={dates}
          onChange={handleDateChange}
          style={{ marginRight: 10 }}
          disabledDate={(current) => current && current < moment().endOf("day")}
        />
        <Select
          defaultValue={1}
          onChange={handleGuestChange}
          style={{ width: 100, marginRight: 10 }}
        >
          <Option value={1}>1 Guest</Option>
          <Option value={2}>2 Guests</Option>
          <Option value={3}>3 Guests</Option>
          <Option value={4}>4 Guests</Option>
          <Option value={5}>5 Guests</Option>
          <Option value={6}>6 Guests</Option>
          {/* Add more options as needed */}
        </Select>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
