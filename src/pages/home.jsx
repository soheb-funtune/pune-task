import React, { useState, useEffect } from "react";
import { useAuthContext } from "../components/auth-context/auth-context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";

const Home = () => {
  const [time, setTime] = useState(60);
  const navigate = useNavigate();
  const { token, auth, setToken } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((pre) => pre - 1);
    }, 1000);
    if (time === 0) {
      signOut(auth);
      navigate("/login");
      setToken(null);
    }
    return () => clearInterval(interval);
  });
  console.log({ token });
  if (!token) {
    return navigate("/login");
  }
  return (
    <div>
      <StyledButton
        onClick={() => {
          signOut(auth);
          navigate("/login");
        }}
      >
        Log-out
      </StyledButton>
      <p>Remaining Seconds to Log out : {time}</p>
    </div>
  );
};

export default Home;

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
