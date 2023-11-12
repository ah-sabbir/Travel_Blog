"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import CustomModal from "../custom-modal";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { DestinationEntity } from "@/entities/destination.entity";
import { getAllDestinations } from "@/lib/fetch-destination-data";
import DeleteDestinationForm from "./delete-destination-form";

interface Props {}

const DestinationsTable: FC<Props> = (): JSX.Element => {
  const [destinations, setDestinations] = useState<DestinationEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletedDestination, setDeletedDestination] =
    useState<DestinationEntity>();

  const fetchDestinations = async () => {
    setIsLoading(true);
    const fetchedDestinations = await getAllDestinations(
      "name slug galleries articles"
    );
    setDestinations(fetchedDestinations as DestinationEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm địa danh"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createDestination}
            customClasses="w-fit ml-auto block"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên địa danh</th>
              <th>Đường dẫn (Slug)</th>
              <th>Số bài viết</th>
              <th>Số galleries</th>
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
              {destinations?.map((destination) => (
                <tr key={destination._id.toString()}>
                  <td className="text-center">{destination.name}</td>
                  <td className="text-center">{destination.slug}</td>
                  <td className="text-center">{destination.articles.length}</td>
                  <td className="text-center">
                    {destination.galleries.length}
                  </td>
                  <td className="flex items-center justify-center gap-4">
                    <Link
                      href={`${path.editDestination}?slug=${destination.slug}`}
                    >
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
                        setDeletedDestination(destination);
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
        <DeleteDestinationForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchDestinations}
          deletedDestination={deletedDestination as DestinationEntity}
        />
      </CustomModal>
    </>
  );
};

export default DestinationsTable;
