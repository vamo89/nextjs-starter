import styled from "styled-components";
import { Logo } from "../Logo";

export const FadedOutLogo = styled(Logo)`
  opacity: 0.3;
  transform: translateY(160px);
`;

export const TransitionLogo = styled(Logo)`
  transform: translateY(-160px);
  animation: loadingMove 5s infinite;
  clip-path: inset(0% 100% 0% 0%);
  display: block;

  @keyframes loadingMove {
    100% {
      clip-path: inset(0% 0% 0% 0%);
    }
  }
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
