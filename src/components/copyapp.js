// import React from "react";
// import { Row, Col } from "antd";
// import { Header } from "antd/es/layout/layout";
// // import Table from'./components/UI/Table';
// import { Table } from "antd";

// function App() {
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     },
//   ];

//   const dataSource = [
//     {
//       key: '1',
//       name: 'Mike',
//       age: 32,
//       address: '10 Downing Street',
//     },
//     {
//       key: '2',
//       name: 'John',
//       age: 42,
//       address: '10 Downing Street',
//     },
//   ];
//   return (
//     <div className="App">
//       <Header />
//       <Row>
//         <Col xs={24} md={{ span: 12, offset: 6 }}>
//           <Table
//             dataSource={dataSource}
//             columns={columns}
//           />
//         </Col>
//       </Row>
//     </div>
//   );

// }

// export default App;


  // const[articles, setArticles] = useState([]);

  // useEffect(()=>{
  //   axios
  //   .get(src)
  //   .then(data =>{
  //     setArticles(data.data.content);
  //   })
  // }, []);