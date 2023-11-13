"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import CustomModal from "../custom-modal";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { TicketEntity } from "@/entities/ticket.entity";
import { getAllTickets } from "@/lib/fetch-ticket-data";
import DeleteTicketForm from "./delete-ticket-form";

interface Props {}

const TicketsTable: FC<Props> = (): JSX.Element => {
  const [tickets, setTickets] = useState<TicketEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletedTicket, setDeletedTicket] = useState<TicketEntity>();

  const fetchTickets = async () => {
    setIsLoading(true);
    const fetchedTickets = await getAllTickets("name slug views price");
    setTickets(fetchedTickets as TicketEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm vé"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createTicket}
            customClasses="w-fit ml-auto block"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Loại vé</th>
              <th>Đường dẫn (Slug)</th>
              <th>Lượt xem</th>
              <th>Giá</th>
              <th>Sửa / Xóa</th>
            </tr>
          </thead>

          {isLoading ? (
            <>
              {[...Array(6).keys()].map((item) => (
                <tr key={item} className="mb-3">
                  <td colSpan={5}>
                    <Skeleton className="w-full h-10" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tbody>
              {tickets?.map((ticket) => (
                <tr key={ticket._id.toString()}>
                  <td className="text-center">{ticket.name}</td>
                  <td className="text-center">{ticket.slug}</td>
                  <td className="text-center">{ticket.views}</td>
                  <td className="text-center">{ticket.price}</td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editTicket}?slug=${ticket.slug}`}>
                      <MdEditSquare
                        className="mt-1 cursor-pointer text-blue-900"
                        size={18}
                      />
                    </Link>
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedTicket(ticket);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteTicketForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchTickets}
          deletedTicket={deletedTicket as TicketEntity}
        />
      </CustomModal>
    </>
  );
};

export default TicketsTable;
