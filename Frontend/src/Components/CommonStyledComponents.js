import styled from 'styled-components';


export const Button = styled.span`
  background-color: ${props => props.primary? 'green':'red'};
  background-color:green;
  color:white;
  padding:0.5rem;
  border: 25%;
`;