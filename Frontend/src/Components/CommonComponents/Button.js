import React from 'react';
import styled from 'styled-components';

export const Button = ({onclick, text,  color}) => {
    return(<StyledButton color={color} onClick={onclick}>
    {text}
    </StyledButton>);
}

 const StyledButton = styled.span`
  background-color: ${props => props.color};
  color:white;
  padding:0.5rem;
  margin-right: 0.5rem;
  border: 25%;
  &:hover {
    opacity: 0.9;
  }
`;

export default Button;