import EditArticleForm from "@/components/admin-articles-page/edit-article-form";
import AdminCardTitle from "@/components/admin-card-title";
import { getArticleBySlug } from "@/lib/fetch-article-data";
import { authOptions } from "@/utils/authOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditArticlePage: NextPage<Props> = async ({ searchParams }) => {
  const article = await getArticleBySlug(searchParams.slug);
  const session = await getServerSession(authOptions);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật bài viết"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditArticleForm
          authorId={session?.user._id.toString()}
          article={article}
        />
      </div>
    </div>
  );
};

export default EditArticlePage;
