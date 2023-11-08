"use client";

import { FC, useState } from "react";
import AdminCardTitle from "../admin-card-title";
import { MdCategory } from "react-icons/md";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import { CategoryEntity } from "@/entities/category.entity";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

interface Props {}

const CategoriesTable: FC<Props> = (props): JSX.Element => {
  const [categories, setCategories] = useState<CategoryEntity[]>();
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <>
      <AdminCardTitle
        cardTitle="Danh mục"
        cardIconClasses="admin-main-gradient"
        icon={MdCategory}
        iconSize={18}
      />
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm danh mục"
            icon={BiPlusCircle}
            iconSize={18}
            onClick={() => setShowCreateForm(true)}
          />
        </div>

        <table className="w-full admin-table mt-10">
          <thead>
            <th>Tên danh mục</th>
            <th>Đường dẫn (Slug)</th>
            <th>Số bài viết</th>
            <th>Số galleries</th>
            <th>Edit / Xóa</th>
          </thead>

          <tbody>
            <tr>
              <td>Hello</td>
              <td>Hello</td>
              <td>Hello</td>
              <td>Hello</td>
              <td>Hello</td>
            </tr>

            <tr>
              <td>Hello</td>
              <td>Hello</td>
              <td>Hello</td>
              <td>Hello</td>
              <td>Hello</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <h2 className="admin-main-gradient text-white">
          Simple centered modal
        </h2>
      </Modal>
    </>
  );
};

export default CategoriesTable;
