import Footer from "@/components/layout/footer";
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
      <Footer />
    </>
  );
};

export default PublicPageLayout;
