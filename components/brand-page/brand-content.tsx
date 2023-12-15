import { FC } from "react";
import parse from "html-react-parser";

interface Props {
  content: string | undefined;
}

const BrandContent: FC<Props> = ({ content }): JSX.Element => {
  return <div className="prose page-content">{parse(content as string)}</div>;
};

export default BrandContent;
