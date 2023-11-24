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
import { getAllArticles } from "@/lib/fetch-article-data";
import moment from "moment";
import Link from "next/link";
import DeleteArticleForm from "./delete-article-form";
import { FaExternalLinkAlt, FaExternalLinkSquareAlt } from "react-icons/fa";

interface Props {}

const ArticlesTable: FC<Props> = (): JSX.Element => {
  const [articles, setArticles] = useState<ArticleEntity[]>([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedArticle, setDeletedArticle] = useState<ArticleEntity>();

  const fetchArticles = async () => {
    setIsLoading(true);
    const fetchedArticles = await getAllArticles("name slug views updatedAt");
    setArticles(fetchedArticles as ArticleEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm bài viết"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createArticle}
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
              {articles.map((article) => (
                <tr key={article._id.toString()}>
                  <td className="text-center">{article.name}</td>
                  <td className="text-center">{article.slug}</td>
                  <td className="text-center">{article.views}</td>
                  <td className="text-center">
                    {moment(article.updatedAt).format("L")}
                  </td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editArticle}?slug=${article.slug}`}>
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
                        setDeletedArticle(article);
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <a
                      href={`${path.article}${article.slug}`}
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
        <DeleteArticleForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchArticles}
          deletedArticle={deletedArticle as ArticleEntity}
        />
      </CustomModal>
    </>
  );
};

export default ArticlesTable;
