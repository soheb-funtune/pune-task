import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../auth-context/auth-context";

const ErrorContainer = styled.div`
  display: flex;
  background-color: rgba(243, 243, 243, 0.5);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 99999999999;
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
  color: red;
`;

const ErrorPage = ({ errorText }) => {
  const { setError } = useAuthContext();
  return (
    <ErrorContainer>
      <ErrorMessage>
        {errorText}
        <button onClick={() => setError("")}>OK</button>
      </ErrorMessage>
    </ErrorContainer>
  );
};

export default ErrorPage;
