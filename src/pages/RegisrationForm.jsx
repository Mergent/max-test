import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useForm, Controller, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    firstName: yup.string()
      .required("This field is required. You can't leave this field blank")
      .matches(/^[a-zA-Z0-9_-]+$/, 'Contains invalid characters'),
    lastName: yup.string()
      .required("This field is required. You can't leave this field blank")
      .matches(/^[a-zA-Z0-9_-]+$/, 'Contains invalid characters'),
    username: yup.string()
      .required("This field is required. You can't leave this field blank"),
    email: yup.string()
      .required("This field is required. You can't leave this field blank")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"),
  })

const RegistrationForm = () => {

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // const [formData, setFormData] = useState([]);

  // useEffect(() => {
  //   console.log('state:formData =>', formData)
  // }, [formData])

  // const PostUsers = async () => {
  //   await axios
  //     .post('http://localhost:6100/register', { formData })
  //     .then(response => { console.log(response.data) })
  //     .catch(error => { console.log(error.data) });
  // };

  // useEffect(() => {
  //   PostUsers();
  // }, [formData]);

  const useRegister = () => {
    const [response, setResponse] = useState([]);

    const registerUser = async (formData) => {
      try {
        const response = await axios.post('http://localhost:6100/register', { ...formData })
        setResponse(response)
      } catch (error) {
        console.log(error)
      }
    }

    return { response, registerUser }
  }

  const { registerUser } = useRegister()

  return (
    <div className="App">
      <h1 style={{ maxWidth: 600, margin: "auto", textAlign: 'center' }}>
        Register
      </h1>

      <form style={{ maxWidth: 600, margin: "auto" }}
        onSubmit={handleSubmit(registerUser)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) =>
            <Form.Item>
              <Input placeholder="Firstname" {...field} />
              <p style={{ color: "red", margin: 0 }}>{errors.firstName?.message} </p>
            </Form.Item>}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) =>
            <Form.Item>
              <Input placeholder="Lastname" {...field} />
              <p style={{ color: "red", margin: 0 }}>{errors.lastName?.message} </p>
            </Form.Item>}
        />

        <Controller
          name="username"
          control={control}
          render={({ field }) =>
            <Form.Item>
              <Input placeholder="Username" {...field} />
              <p style={{ color: "red", margin: 0 }}>{errors.userName?.message} </p>
            </Form.Item>}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) =>
            <Form.Item >
              <Input placeholder="Email" {...field} />
              <p style={{ color: "red", margin: 0 }}>{errors.email?.message} </p>
            </Form.Item>}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) =>
            <Form.Item>
              <Select placeholder="Role"{...field}
                options={[
                  { value: "ADMINISTRATOR", label: "ADMINISTRATOR" },
                  { value: "USER", label: "USER" },
                ]}
              />
            </Form.Item>}
        />

        <Form.Item>
          <Button style={{ width: '100%' }} disabled={!isValid} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </form>


    </div>
  )
};

export default RegistrationForm;

