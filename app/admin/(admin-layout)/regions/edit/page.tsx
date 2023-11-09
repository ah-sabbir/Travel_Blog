import AdminCardTitle from "@/components/admin-card-title";
import EditCountryForm from "@/components/admin-countries-page/edit-country-form";
import EditRegionForm from "@/components/admin-regions-page/edit-region-form";
import { getCountryBySlug } from "@/lib/fetch-country-data";
import { getRegionBySlug } from "@/lib/fetch-region-data";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditRegionPage: NextPage<Props> = async ({ searchParams }) => {
  const region = await getRegionBySlug(searchParams.slug);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật thông tin tỉnh / vùng miền"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditRegionForm region={region} />
      </div>
    </div>
  );
};

export default EditRegionPage;
