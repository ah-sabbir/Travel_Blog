import AdminCardTitle from "@/components/admin-card-title";
import EditCountryForm from "@/components/admin-countries-page/edit-country-form";
import { getCountryBySlug } from "@/lib/fetch-country-data";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditCountryPage: NextPage<Props> = async ({ searchParams }) => {
  const country = await getCountryBySlug(searchParams.slug);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật thông tin quốc gia"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditCountryForm country={country} />
      </div>
    </div>
  );
};

export default EditCountryPage;
