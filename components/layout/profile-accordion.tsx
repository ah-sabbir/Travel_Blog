"use client";

import { FC } from "react";
import { Accordion } from "@szhsin/react-accordion";
import { AccordionItem } from "../accordion-item";
import UserAvatar from "../user-avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { path } from "@/constant";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */

interface Props {}

const ProfileAccordion: FC<Props> = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <div className="my-4 transition text-[#999999] border-y border-[#b4b4b44d] m-4 pt-4 pb-2">
      <Accordion transition transitionTimeout={500}>
        <AccordionItem
          header={
            <div className="flex items-center gap-3 w-full">
              <UserAvatar wrapperClasses="w-[34px] h-[34px] ml-[7px]" />
              <div className="flex items-center justify-between">
                <span className="text-sm">{session?.user?.name}</span>
              </div>
            </div>
          }
        >
          <Link href={path.profile} className="mb-1 gap-4 admin-sidebar-item">
            <span>MP</span> Profile
          </Link>
          <button
            className="w-full admin-sidebar-item gap-[19px]"
            onClick={() => signOut()}
          >
            <span>LO</span> Log Out
          </button>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;
