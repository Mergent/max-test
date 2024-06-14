import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "antd";
import { Header } from "antd/es/layout/layout";
// import Table from './components/UI/Table';
import { Table } from "antd";
import axios from 'axios';
import { noop } from "antd/es/_util/warning";


function MainPage() {
const [columns, setColumns]= useState([
  {
      title: 'Username',
      dataIndex: 'username',
      key:'username',
  },
  {
      title: 'E-mail',
      dataIndex: 'email',
      key:'email',
  },
  {
      title: 'First name',
      dataIndex: 'firstName',
      key:'firstName',
  },
  {
      title: 'Last name',
      dataIndex: 'lastName',
      key:'lastName',
  },
  {
      title: 'Role',
      dataIndex: 'role',
      key:'role',
  },
]);

const[dataSource, setDataSource] = useState([]);

useEffect(()=>{
  axios
  .get('http://localhost:6100/users', {params:{page: 0, sort:'lastName'}})
  .then(data =>{
    setDataSource(data.data.content);
  })
}, []);
// const [dataSource, setDataSource] = useState ([]);
// useEffect(()=>{
//   fetch('http://localhost:6100/users', {
//     method:'GET',
//   })
//   .then(res => res.json())
//   .then((result) =>{
//     setDataSource(result.component);
//   });
// },[]);


  return (
    <div className="App">
      <Header />
      <Row>
      <Col xs={24} md={{ span: 12, offset: 6 }}>
        <Table
        dataSource={dataSource}
        columns={columns}
      />
        </Col>
      </Row>
    </div>
  );

}
export default MainPage;