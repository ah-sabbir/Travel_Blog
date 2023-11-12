import EditBrandForm from "@/components/admin-brands-page/edit-brand-form";
import AdminCardTitle from "@/components/admin-card-title";
import EditCountryForm from "@/components/admin-countries-page/edit-country-form";
import { getBrandBySlug } from "@/lib/fetch-brand-data";
import { getCountryBySlug } from "@/lib/fetch-country-data";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const EditBrandPage: NextPage<Props> = async ({ searchParams }) => {
  const brand = await getBrandBySlug(searchParams.slug);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật thông tin thương hiệu"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditBrandForm brand={brand} />
      </div>
    </div>
  );
};

export default EditBrandPage;
