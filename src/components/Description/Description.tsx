import styled from "styled-components";

const StyledDescription = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`;

export const Description = ({ text }: { text: string }) => (
  <StyledDescription>{text}</StyledDescription>
);
