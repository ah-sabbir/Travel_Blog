import parse from "html-react-parser";
import { FC } from "react";

interface Props {
  content: string | undefined;
}

const GalleryContent: FC<Props> = ({ content }): JSX.Element => {
  return <>{parse(content as string)}</>;
};

export default GalleryContent;
