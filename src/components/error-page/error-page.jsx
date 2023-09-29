import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
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
  return (
    <ErrorContainer>
      <ErrorMessage>{errorText}</ErrorMessage>
    </ErrorContainer>
  );
};

export default ErrorPage;
