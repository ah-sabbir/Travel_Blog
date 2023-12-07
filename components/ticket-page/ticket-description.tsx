"use client";

import { FC } from "react";
import parse from "html-react-parser";

interface Props {
  description: string | undefined;
}

const TicketDescription: FC<Props> = ({ description }): JSX.Element => {
  return <div className="prose">{parse(description || "")}</div>;
};

export default TicketDescription;
