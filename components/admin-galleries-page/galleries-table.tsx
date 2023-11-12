"use client";

import { FC, useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import CustomModal from "../custom-modal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiFillDelete } from "react-icons/ai";
import { path } from "@/constant";
import { ArticleEntity } from "@/entities/article.entity";
import moment from "moment";
import Link from "next/link";
import { FaExternalLinkAlt, FaExternalLinkSquareAlt } from "react-icons/fa";
import { getAllGalleries } from "@/lib/fetch-gallery-data";
import { GalleryEntity } from "@/entities/gallery.entity";
import DeleteGalleryForm from "./delete-gallery-form";

interface Props {}

const GalleriesTable: FC<Props> = (): JSX.Element => {
  const [galleries, setGalleries] = useState<GalleryEntity[]>([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedGallery, setDeletedGallery] = useState<GalleryEntity>();

  const fetchGalleries = async () => {
    setIsLoading(true);
    const fetchedGalleries = await getAllGalleries("name slug views updatedAt");
    setGalleries(fetchedGalleries as GalleryEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm gallery"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createGallery}
            customClasses="block ml-auto w-fit"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Đường dẫn</th>
              <th>Lượt xem</th>
              <th>Ngày sửa</th>
              <th>Sửa / Xóa</th>
              <th>Live link</th>
            </tr>
          </thead>

          {isLoading ? (
            <>
              {[...Array(6).keys()].map((item) => (
                <tr key={item} className="mb-3">
                  <td colSpan={6}>
                    <Skeleton className="w-full h-10" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tbody>
              {galleries?.map((gallery) => (
                <tr key={gallery._id.toString()}>
                  <td className="text-center">{gallery.name}</td>
                  <td className="text-center">{gallery.slug}</td>
                  <td className="text-center">{gallery.views}</td>
                  <td className="text-center">
                    {moment(gallery.updatedAt).format("L")}
                  </td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editGallery}?slug=${gallery.slug}`}>
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
                        setDeletedGallery(gallery as GalleryEntity);
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <a
                      href={`/test/${gallery.slug}`}
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
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteGalleryForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchGalleries}
          deletedGallery={deletedGallery as GalleryEntity}
        />
      </CustomModal>
    </>
  );
};

export default GalleriesTable;
