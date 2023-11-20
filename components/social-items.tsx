import { headerSocialItems } from "@/data/menu";
import { link } from "fs";
import { FC } from "react";

interface Props {}

const SocialItems: FC<Props> = (props): JSX.Element => {
  return (
    <ul className="flex items-center gap-3">
      {headerSocialItems.map((item, index) => (
        <li
          key={index}
          className="bg-light_gray circle-radius w-[32px] h-[32px] grid place-items-center hover:scale-110 transition"
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={item.link}
            className="text-black_text"
          >
            {item.icon({ size: item.size || 18 })}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialItems;
