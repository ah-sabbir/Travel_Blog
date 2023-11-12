"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import CustomModal from "../custom-modal";
import { RegionEntity } from "@/entities/region.entity";
import { getAllRegions } from "@/lib/fetch-region-data";
import DeleteRegionForm from "./delete-region-form";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

interface Props {}

const RegionsTable: FC<Props> = (): JSX.Element => {
  const [regions, setRegions] = useState<RegionEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletedRegion, setDeletedRegion] = useState<RegionEntity>();

  const fetchRegions = async () => {
    setIsLoading(true);
    const fetchedRegions = await getAllRegions("name slug galleries articles");
    setRegions(fetchedRegions as RegionEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm tỉnh / vùng miền"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createRegion}
            customClasses="w-fit ml-auto block"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên tỉnh / vùng miền</th>
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
              {regions.map((region) => (
                <tr key={region._id.toString()}>
                  <td className="text-center">{region.name}</td>
                  <td className="text-center">{region.slug}</td>
                  <td className="text-center">{region.articles.length}</td>
                  <td className="text-center">{region.galleries.length}</td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editRegion}?slug=${region.slug}`}>
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
                        setDeletedRegion(region);
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
        <DeleteRegionForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchRegions}
          deletedRegion={deletedRegion as RegionEntity}
        />
      </CustomModal>
    </>
  );
};

export default RegionsTable;
