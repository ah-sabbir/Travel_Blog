import { Dispatch, FC, SetStateAction } from "react";
import BtnWithIcon from "./btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  addBtnContent: string;
  addBtnLink: string;
  editBtnLink: string;
  name: string;
  isLoading: boolean;
  dataArr: any[];
  setShowDeleteHandler: Dispatch<SetStateAction<boolean>>;
  setDeletedItem: Dispatch<SetStateAction<any>>;
}

const AdminDataTable: FC<Props> = ({
  addBtnContent,
  addBtnLink,
  name,
  isLoading,
  dataArr,
  setShowDeleteHandler,
  setDeletedItem,
  editBtnLink,
}): JSX.Element => {
  return (
    <div className="admin-card-body">
      <div className="text-right">
        <BtnWithIcon
          content={addBtnContent}
          icon={BiPlusCircle}
          iconSize={22}
          to={addBtnLink}
          customClasses="block w-fit ml-auto"
        />
      </div>

      <table className="w-full admin-table mt-4">
        <thead>
          <tr>
            <th>Tên {name}</th>
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
            {dataArr.map((item) => (
              <tr key={item._id.toString()}>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.slug}</td>
                <td className="text-center">{item.articles.length}</td>
                <td className="text-center">{item.galleries.length}</td>
                <td className="flex items-center justify-center gap-4">
                  <Link href={`${editBtnLink}?slug=${item.slug}`}>
                    <MdEditSquare
                      className="mt-1 cursor-pointer text-blue-900"
                      size={18}
                    />
                  </Link>
                  <AiFillDelete
                    className="mt-1 cursor-pointer text-red-700"
                    size={18}
                    onClick={() => {
                      setShowDeleteHandler(true);
                      setDeletedItem(item);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AdminDataTable;
