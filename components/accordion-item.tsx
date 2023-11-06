"use client";

import { FC, ReactNode } from "react";
import { AccordionItem as Item } from "@szhsin/react-accordion";
import { AiOutlineCaretDown } from "react-icons/ai";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */

interface ItemsProps {
  header: ReactNode;
  children: JSX.Element | JSX.Element[] | ReactNode;
}

export const AccordionItem: FC<ItemsProps> = ({ header, ...rest }) => {
  return (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <div className="flex items-center justify-between w-full mr-[7px]">
          <span className="block text-white text-xs transition">{header}</span>
          <AiOutlineCaretDown
            className={`ml-auto transition-transform duration-[250] ease-out w-[10px] h-[10px] text-white ${
              isEnter && "rotate-180"
            }`}
          />
        </div>
      )}
      buttonProps={{
        className: ({ isEnter }) => `flex w-full pb-3 ${isEnter && ""}`,
      }}
      contentProps={{
        className: "transition-height duration-[250ms]",
      }}
      panelProps={{ className: "pb-4 text-xs" }}
    />
  );
};
