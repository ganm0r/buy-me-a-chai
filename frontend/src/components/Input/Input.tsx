import React from 'react';
import styled from 'styled-components';

const StyledInputTitle = styled.p`
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: crimson;
  margin: 2%;
  margin-left: 0%;
  user-select: none;
`;

const StyledInputField = styled.input`
  border-style: solid;
  border-radius: 10px;
  border-width: 2px;
  min-width: 400px;
  padding: 12px;
  box-sizing: border-box;
  border-color: lightpink;
  background-color: lightyellow;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-size: 20px;
  color: black;
  margin-bottom: 2%;

  &:focus {
    outline: none;
    border-color: crimson;
  }

  ::placeholder {
    color: pink;
  }
`;

interface InputProps {
  title: string;
  type: string;
  placeholder: string;
  required?: boolean;
  name: string;
  value: string;
  onChange: (event: any) => void;
}

const Input = ({ title, type, placeholder, required = false, name, value, onChange }: InputProps) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '0.5fr 1fr',
          alignItems: 'flex-start',
        }}
      >
        <StyledInputTitle>{title}</StyledInputTitle>
        <StyledInputField
          type={type}
          placeholder={placeholder}
          spellCheck="false"
          autoComplete="off"
          required={required}
          name={name}
          value={value}
          onChange={onChange}
        ></StyledInputField>
      </div>
    </React.Fragment>
  );
};

export { Input };
export type { InputProps };
