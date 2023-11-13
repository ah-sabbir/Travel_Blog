import AdminCardTitle from "@/components/admin-card-title";
import EditGalleryForm from "@/components/admin-galleries-page/edit-gallery-form";
import { getGalleryBySlug } from "@/lib/fetch-gallery-data";
import { authOptions } from "@/utils/authOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditArticlePage: NextPage<Props> = async ({ searchParams }) => {
  const gallery = await getGalleryBySlug(searchParams.slug);
  const session = await getServerSession(authOptions);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật gallery"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditGalleryForm
          authorId={session?.user._id.toString()}
          gallery={gallery}
        />
      </div>
    </div>
  );
};

export default EditArticlePage;
