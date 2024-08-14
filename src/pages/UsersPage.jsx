import React from "react";
import { useEffect, useState } from "react";

import { Table } from "antd";
import axios from 'axios';

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

function UsersPage() {
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(0)
  const [sortParams, setSortParams] = useState('email,asc')
  const [sizeOfPage, setsizeOfPage] = useState(10)

  useEffect(() => {
    console.log('State: sizeOfPage, SortParams => ', sizeOfPage, sortParams)
  }, [sizeOfPage, sortParams])

  const getUsers = async () => {
    await axios
      .get('http://localhost:6100/users', { params: { page: page, sort: sortParams, size: sizeOfPage } })
      .then(data => {
        setDataSource(data.data);
      })
  };

  useEffect(() => {
    getUsers();
  }, [sortParams, page, sizeOfPage]);

  return (
    <div className="App">

      <Table
        onChange={(pagination, filters, sorter, extra) => {
          console.log("LOG -> ~ MainPage ~ pagination:", pagination)
          setsizeOfPage(pagination.pageSize)
          setPage(pagination.current - 1)
          setSortParams(`${sorter.field},${sorter.order?.slice(0, -3) ?? 'asc'}`)
        }}
        dataSource={dataSource.content}
        columns={columns}
        pagination={{
          total: dataSource.totalElements
        }}
      />
    </div>
  );
}
export default UsersPage;