import Header from "@/components/layout/header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PublicPageLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicPageLayout;
