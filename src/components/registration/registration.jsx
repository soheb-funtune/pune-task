import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../auth-context/auth-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Enter valid email!"),
  password: yup
    .string()
    .required("Password is required!")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
      "Password should be strong!"
    )
    .min(8)
    .max(20, "Password should be less than 20"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { auth, ApiCall, setError } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  console.log("reg errors:", errors);

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      ApiCall(data, "register");
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Wrap>
      <h2>Registration Page</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputWrapter>
            <StyledLabel htmlFor="name">Name</StyledLabel>
            <>
              <StyledInput type="text" id="name" {...register("name")} />{" "}
              <ErrorEle
                style={{ visibility: errors?.name ? "visible" : "hidden" }}
              >
                {errors?.name?.message || ` Name is Required!`}
              </ErrorEle>
            </>
          </InputWrapter>
          <InputWrapter>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <>
              <StyledInput type="email" id="email" {...register("email")} />{" "}
              <ErrorEle
                style={{ visibility: errors?.email ? "visible" : "hidden" }}
              >
                {errors?.email?.message || ` Email is Required!`}
              </ErrorEle>
            </>
          </InputWrapter>
          <InputWrapter>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <>
              <StyledInput
                type="password"
                id="password"
                {...register("password")}
              />{" "}
              <ErrorEle
                style={{ visibility: errors?.password ? "visible" : "hidden" }}
              >
                {errors?.password?.message || ` Password is Required!`}
              </ErrorEle>
            </>
          </InputWrapter>
        </div>
        <InputWrapter>
          <StyledButton type="submit">Register</StyledButton>

          <Link to={"/login"}>
            <small>Already have account</small>
          </Link>
        </InputWrapter>
      </StyledForm>
    </Wrap>
  );
};

export default RegistrationForm;

const Wrap = styled.div`
  padding: 40px 30px;
  box-shadow: 1px 5px 5px gray;
  border-radius: 20px;
  width: 350px;
  margin: auto;
  @media (max-width: 767px) {
    box-shadow: none;
  }
  @media (max-width: 410px) {
    width: 100%;
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 0px 20%;
  box-sizing: border-box;
  @media (max-width: 410px) {
    padding: 0px 20px;
  }
`;
const InputWrapter = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
  a:hover,
  :active {
    color: var(--button-color);
  }
`;
const StyledLabel = styled.label`
  text-align: left;
`;
const StyledInput = styled.input`
  padding: 5px 10px;
  /* border: 2px solid black; */
  &:active,
  :focus {
    border: 2px solid red !important;
  }
`;
const StyledButton = styled.button`
  margin-top: 20px;
  color: white;
  background: var(--button-color);
  border-color: var(--button-color);
  &:active,
  :hover,
  :focus {
    color: var(--button-color);
    border-color: var(--button-color);
    background: white;
  }
`;
const ErrorEle = styled.small`
  text-align: left;
  color: red;
  font-size: 12px;
`;
