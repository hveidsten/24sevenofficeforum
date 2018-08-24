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

export const AnswerWrapper = styled.section`
display: flex;
flex-direction: row;
align-items: left;
margin: 3rem 2rem 2rem 2rem;
overflow-wrap: break-word;
p{width:100%};
a{height:1rem; margin:0.2rem;}

border-top:solid 0.1px gray;
`;

export const PostSubtext = styled.span`
    font-size: 0.8em;
    color:#404040;
`;

export const InputWrapper = styled.div`
width:50vw;
align-items: right;
`;
