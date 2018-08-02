import styled from 'styled-components';

export const Button = styled.span`
  background-color: ${props => props.color};
  color:white;
  padding:0.5rem;
  border: 25%;
  &:hover {
    opacity: 0.9;
  }
`;

export const QuestionWrapper = styled.section`
display: flex;
flex-direction: row;
align-items: center;
margin: 1rem;
overflow-wrap: break-word;
`;

export const PostSubtext = styled.span`
    font-size: 0.8em;
    color:#404040;
`;