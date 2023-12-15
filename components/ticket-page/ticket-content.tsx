import { FC } from "react";
import parse from "html-react-parser";

interface Props {
  content: string | undefined;
}

const TicketContent: FC<Props> = ({ content }): JSX.Element => {
  return <div className="content page-content">{parse(content as string)}</div>;
};

export default TicketContent;
