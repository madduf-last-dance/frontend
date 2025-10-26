import React, { useState, useEffect } from "react";
import { Input, DatePicker, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import './SearchBar.css'

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function SearchBar({ updateHotels }) {
  const today = dayjs();
  const tenDaysLater = today.add(10, "day");

  const [location, setLocation] = useState("");
  const [dates, setDates] = useState([today, tenDaysLater]);
  const [guests, setGuests] = useState(1);

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDateChange = (dates) => setDates(dates);
  const handleGuestChange = (value) => setGuests(value);

  const handleSearch = () => {
    const apiClient = axios.create({
      //baseURL: "http://172.28.225.22.nip.io",
      baseURL: "http://localhost:8080",
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
    });

    apiClient
      .get(`/accommodation/search`, {
        params: {
          location,
          numberOfGuests: guests,
          startDate: dates[0].format("YYYY-MM-DD"),
          endDate: dates[1].format("YYYY-MM-DD"),
        },
      })
      .then((response) => updateHotels(response.data))
      .catch((error) => console.error(error));
  };

  // 🔹 Trigger search automatically when component mounts
  useEffect(() => {
    handleSearch();
  }, []); // empty dependency array → runs once

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <Input
          placeholder="Location"
          value={location}
          onChange={handleLocationChange}
          style={{ width: 200 }}
        />
        <RangePicker
          value={dates}
          onChange={handleDateChange}
          style={{ }}
          disabledDate={(current) => current && current < dayjs().startOf("day")}
        />
        <Select
          defaultValue={1}
          onChange={handleGuestChange}
          style={{ width: 100}}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Option key={num} value={num}>
              {num} Guest{num > 1 ? "s" : ""}
            </Option>
          ))}
        </Select>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
