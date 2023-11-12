import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminCardTitle from "@/components/admin-card-title";
import CreateGalleryForm from "@/components/admin-galleries-page/create-gallery-form";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const CreateGalleryPage: NextPage<Props> = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo gallery"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateGalleryForm authorId={session?.user._id.toString()} />
      </div>
    </div>
  );
};

export default CreateGalleryPage;
