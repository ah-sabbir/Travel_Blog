import AdminCardTitle from "@/components/admin-card-title";
import EditCountryForm from "@/components/admin-countries-page/edit-country-form";
import EditInterestForm from "@/components/admin-interests-page/edit-interest-form";
import { getCountryBySlug } from "@/lib/fetch-country-data";
import { getInterestBySlug } from "@/lib/fetch-interest-data";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditInterestPage: NextPage<Props> = async ({ searchParams }) => {
  const interest = await getInterestBySlug(searchParams.slug);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật thông tin sở thích"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditInterestForm interest={interest} />
      </div>
    </div>
  );
};

export default EditInterestPage;
