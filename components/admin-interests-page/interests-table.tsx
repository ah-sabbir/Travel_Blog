"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import CustomModal from "../custom-modal";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { InterestEntity } from "@/entities/interest.entity";
import DeleteInterestForm from "./delete-interest-form";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdEditSquare } from "react-icons/md";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";

interface Props {}

const InterestsTable: FC<Props> = (): JSX.Element => {
  const [interests, setInterests] = useState<InterestEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletedInterest, setDeletedInterest] = useState<InterestEntity>();

  const fetchInterests = async () => {
    setIsLoading(true);
    const fetchedInterests = await getAllInterests();
    setInterests(fetchedInterests as InterestEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm sở thích"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createInterest}
            customClasses="w-fit ml-auto block"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên sở thích</th>
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
              {interests.map((interest) => (
                <tr key={interest._id.toString()}>
                  <td className="text-center">{interest.name}</td>
                  <td className="text-center">{interest.slug}</td>
                  <td className="text-center">{interest.articles.length}</td>
                  <td className="text-center">{interest.galleries.length}</td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editInterest}?slug=${interest.slug}`}>
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
                        setDeletedInterest(interest);
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
        <DeleteInterestForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchInterests}
          deletedInterest={deletedInterest as InterestEntity}
        />
      </CustomModal>
    </>
  );
};

export default InterestsTable;
