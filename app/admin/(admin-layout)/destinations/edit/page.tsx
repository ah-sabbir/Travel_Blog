import AdminCardTitle from "@/components/admin-card-title";
import EditDestinationForm from "@/components/admin-destinations-page/edit-destination-form";
import { getDestinationBySlug } from "@/lib/fetch-destination-data";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditDestinationPage: NextPage<Props> = async ({ searchParams }) => {
  const destination = await getDestinationBySlug(searchParams.slug);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật điểm đến"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditDestinationForm destination={destination} />
      </div>
    </div>
  );
};

export default EditDestinationPage;
