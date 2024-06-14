import React, { useState } from 'react';
import { Input, DatePicker, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import moment from 'moment';
import './SearchBar.css'; // Create a CSS file for custom styles if needed

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function SearchBar() {
  const [location, setLocation] = useState('');
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
    // Handle search logic here, possibly triggering a search request or updating state
    console.log({ location, dates, guests });
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
          disabledDate={(current) => current && current < moment().endOf('day')}
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
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};