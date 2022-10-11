import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: grid;
  background-color: white;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 22px;
  margin-bottom: 16px;
  border: 1px solid crimson;
  box-shadow: 0 0 20px crimson;
  outline: none;
`;

interface CardProps {
  children?: React.ReactNode | React.ReactNode[];
  gridTemplateRows?: string;
  bgColor: string;
}

const Card = ({ children, gridTemplateRows, bgColor }) => {
  return (
    <React.Fragment>
      <StyledCard
        style={{
          gridTemplateRows: gridTemplateRows,
          backgroundColor: bgColor,
        }}
      >
        {children}
      </StyledCard>
    </React.Fragment>
  );
};

export { Card };
export type { CardProps };
