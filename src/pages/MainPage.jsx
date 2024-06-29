import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Pagination, message } from "antd";
import { Header } from "antd/es/layout/layout";
import { Table } from "antd";
import axios from 'axios';
import Column from "antd/es/table/Column";
import e from "cors";

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select value={value}
      onChange={event => onChange(event.target.value)}
      
    >
      <option  disabled={true} value=''>{defaultValue}</option>
      {options?.map(option =>
        <option  key={option.name} value={option.name}>
          {option.value}
        </option>
      )}

    </select>
  );
};

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    filterDropdown: true,
    sorter: true,
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: true, 
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: true,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    sorter: true,
  },
];
// const array=(extra)=>{console.log(array)}





function MainPage() {

  const onChange = (pagination, sorter, extra) => { 
    // return extra === objec;

    // const objec= { toString: function() { return this.field + ", " + this.order; } };
  };
  

  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(0)
  const [selectedSort, setSelectedSort] = useState('')
  const [sortParams, setSortParams] = useState('email,asc')

  useEffect(() => {
    console.log('StateSortParams => ', sortParams)
  }, [sortParams])
  
  const getUsers = async () => {
    await axios
      .get('http://localhost:6100/users', { params: { page: page, sort: sortParams, size: 10 } })
      .then(data => {
        setDataSource(data.data);
      })
  };

  useEffect(() => {
    getUsers();
  }, [sortParams, page]);

  return (
    <div className="App">
      <div>
        <MySelect
          
          value={selectedSort}
          onChange={setSelectedSort}
          defaultValue='Сортировка'
          options={[
            { value: 'Username', name: 'username' },
            { value: 'Email', name: 'email, desc' },
            { value: 'Firstname', name: 'firstname' },
            { value: 'Lastname', name: 'lastname' },
            { value: 'Role', name: 'role' },

          ]}
        />
      </div>

      <Header />
      <Table
        onChange={(pagination, filters, sorter, extra) => {
          console.log("LOG -> ~ MainPage ~ pagination:", pagination)
          setPage(pagination.current - 1)
          setSortParams(`${sorter.field},${sorter.order?.slice(0, -3) ?? 'asc'}`)
        }}
        dataSource={dataSource.content}
        columns={columns}
        pagination={{
          total: dataSource.totalElements
        }}
        filterDropdown={true}
      />
      {/* <Pagination
        total={111}
        onChange={(data) => {
          setPage(data - 1)
        }}
      /> */}
    </div>
  );

}
export default MainPage;