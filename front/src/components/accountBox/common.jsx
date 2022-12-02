import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MutedLink = styled.a`
  font-size: 15px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 15px;
  color: rgb(2, 0, 36);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 2);
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  font-size: 15px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgb(2, 0, 36);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(2, 0, 36);
  }
`;

export const SubmitButton = styled.button`
  width: 90%;
  padding: 10px 20%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    50deg,
    rgba(27, 46, 53, 21) 0%,
    rgba(0, 102, 213, 84) 50%,
    rgba(5, 131, 242, 95) 70%,
    rgba(34, 136, 255, 95) 100%
  );
  &:hover {
    filter: brightness(1.03);
  }
`;
