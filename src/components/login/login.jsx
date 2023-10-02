import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../auth-context/auth-context";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
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

const Login = () => {
  const navigate = useNavigate();
  const { auth, provider, setToken, ApiCall, setError } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const res = await signInWithEmailAndPassword(auth, email, password);
      ApiCall({ email, password }, "/login");
      console.log("res login:", res);
      if (res) {
        setToken(res.user.accessToken);
        navigate("/");
      }
    } catch (err) {
      setError(err);
    }
  };
  // console.log({ errors });
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log({ res });
      if (res == null) alert("wrong Credentials");
      if (res) {
        setToken(res.user.accessToken);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrap>
      <h2>Login Page</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputWrapter>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <>
              <StyledInput type="email" id="email" {...register("email")} />{" "}
              <ErrorEle
                style={{ visibility: errors?.email ? "visible" : "hidden" }}
              >
                {errors?.email?.message || `Email is Required!`}
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
                {errors?.password?.message || `Password is Required!`}
              </ErrorEle>
            </>
          </InputWrapter>
        </div>
        <InputWrapter>
          <StyledButton type="submit">Login</StyledButton>
          <StyledButton onClick={() => signInWithGoogle()}>
            Login With Google
          </StyledButton>

          <Link to={"/registration"}>
            <small>Register if not have account</small>
          </Link>
        </InputWrapter>
      </StyledForm>
    </Wrap>
  );
};

export default Login;

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
  &:disabled {
    background: gray;
  }
`;
const ErrorEle = styled.small`
  text-align: left;
  color: red;
  font-size: 12px;
`;
