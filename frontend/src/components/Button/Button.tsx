import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: crimson;
  font-weight: 900;
  font-size: 22px;
  box-sizing: border-box;
  color: white;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 14px;
  outline: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 7%;
  min-width: 100%;
  max-height: 64px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  disabled?: boolean;
  cursor?: string;
  type?: string;
  marginTop?: string;
}

const Button = ({ children, onClick, disabled, cursor, type, marginTop }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} style={{ cursor: cursor, marginTop: marginTop }}>
      {children}
    </StyledButton>
  );
};

export { Button };
export type { ButtonProps };
