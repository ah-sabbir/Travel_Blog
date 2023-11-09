import AdminCardTitle from "@/components/admin-card-title";
import CreateCountryForm from "@/components/admin-countries-page/create-country-form";
import { NextPage } from "next";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const CreateCountryPage: NextPage<Props> = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo quốc gia"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateCountryForm />
      </div>
    </div>
  );
};

export default CreateCountryPage;
