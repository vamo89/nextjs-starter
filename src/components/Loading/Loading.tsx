import React from "react";
import { CenteredDiv, FadedOutLogo, TransitionLogo } from "./loading.styles";

export const Loading = () => {
  return (
    <CenteredDiv>
      <div>
        <FadedOutLogo size={320} />
        <TransitionLogo size={320} />
      </div>
    </CenteredDiv>
  );
};
