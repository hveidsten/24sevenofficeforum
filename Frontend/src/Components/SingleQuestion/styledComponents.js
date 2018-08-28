import styled from 'styled-components';

export const AddAnswerModal = styled.div`

@keyframes slideUp {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0;
    }
  }

  animation: 0.2s ease-out 0s 1 slideUp;
position: fixed;
right: 35vw;
bottom: 15vh;
color: black;
text-align: center;
z-index: 9999;
`;

