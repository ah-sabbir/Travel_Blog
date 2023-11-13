"use client";

import { FC, useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import CustomModal from "../custom-modal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiFillDelete } from "react-icons/ai";
import { TicketTypeEntity } from "@/entities/ticketType.entity";
import { getAllTicketTypes } from "@/lib/fetch-ticket-type-data";
import CreateTicketTypeForm from "./create-ticket-type-form";
import EditTicketTypeForm from "./edit-ticket-type-form";
import DeleteTicketTypeForm from "./delete-ticket-type-form";

interface Props {}

const TicketTypesTable: FC<Props> = (): JSX.Element => {
  const [ticketTypes, setTicketTypes] = useState<TicketTypeEntity[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedTicketType, setEditedTicketType] = useState<TicketTypeEntity>();
  const [deletedTicketType, setDeletedTicketType] =
    useState<TicketTypeEntity>();

  const fetchTickeTypes = async () => {
    setIsLoading(true);
    const fetchedTicketTypes = await getAllTicketTypes("name slug");
    setTicketTypes(fetchedTicketTypes as TicketTypeEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTickeTypes();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm danh mục vé"
            icon={BiPlusCircle}
            iconSize={18}
            onClick={() => setShowCreateForm(true)}
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên danh mục vé</th>
              <th>Đường dẫn (Slug)</th>
              <th>Sửa / Xóa</th>
              <th>Live link</th>
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
              {ticketTypes?.map((ticketType) => (
                <tr key={ticketType._id.toString()}>
                  <td className="text-center">{ticketType.name}</td>
                  <td className="text-center">{ticketType.slug}</td>

                  <td className="flex items-center justify-center gap-4">
                    <MdEditSquare
                      className="mt-1 cursor-pointer text-blue-900"
                      size={18}
                      onClick={() => {
                        setShowEditForm(true);
                        setEditedTicketType(ticketType);
                      }}
                    />
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedTicketType(ticketType);
                      }}
                    />
                  </td>

                  <td className="text-center">
                    <a
                      href={`/test/${ticketType.slug}`}
                      target="_blank"
                      className="underline text-sm font-bold text-blue-600"
                    >
                      Xem
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <CustomModal
        heading="Tạo danh mục vé mới"
        onClose={() => setShowCreateForm(false)}
        open={showCreateForm}
      >
        <CreateTicketTypeForm
          setShowCreateForm={setShowCreateForm}
          refetch={fetchTickeTypes}
        />
      </CustomModal>

      <CustomModal
        heading="Sửa danh mục vé"
        onClose={() => setShowEditForm(false)}
        open={showEditForm}
      >
        <EditTicketTypeForm
          setShowEditForm={setShowEditForm}
          refetch={fetchTickeTypes}
          editedTicketType={editedTicketType as TicketTypeEntity}
        />
      </CustomModal>

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteTicketTypeForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchTickeTypes}
          deletedTicketType={deletedTicketType as TicketTypeEntity}
        />
      </CustomModal>
    </>
  );
};

export default TicketTypesTable;
