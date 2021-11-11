import styled from "styled-components";

const StyledTitle = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  padding: 1em 0 0 0;
  text-align: center;

  & a {
    color: #0070f3;
    text-decoration: none;
  }

  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: underline;
  }
`;

export const Title = ({ text }: { text: string }) => (
  <StyledTitle>{text}</StyledTitle>
);
