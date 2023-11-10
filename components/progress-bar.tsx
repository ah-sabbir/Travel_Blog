"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const StyledProgressBar = () => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#c3224a"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default StyledProgressBar;
