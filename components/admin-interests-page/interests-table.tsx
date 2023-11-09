"use client";

import { FC, useEffect, useState } from "react";
import { path } from "@/constant";
import { CountryEntity } from "@/entities/country.entity";
import CustomModal from "../custom-modal";
import AdminDataTable from "../admin-data-table";
import DeleteCountryForm from "../admin-countries-page/delete-country-form";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { InterestEntity } from "@/entities/interest.entity";
import DeleteInterestForm from "./delete-interest-form";

interface Props {}

const InterestsTable: FC<Props> = (): JSX.Element => {
  const [interests, setInterests] = useState<InterestEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletedInterest, setDeletedInterest] = useState<InterestEntity>();

  const fetchInterests = async () => {
    setIsLoading(true);
    const fetchedInterests = await getAllInterests();
    setInterests(fetchedInterests as InterestEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  return (
    <>
      <AdminDataTable
        addBtnContent="Thêm sở thích"
        addBtnLink={path.createInterest}
        dataArr={interests || []}
        editBtnLink={path.editInterest}
        isLoading={isLoading}
        name="sở thích"
        setDeletedItem={setDeletedInterest}
        setShowDeleteHandler={setShowDeleteForm}
      />

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteInterestForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchInterests}
          deletedInterest={deletedInterest as InterestEntity}
        />
      </CustomModal>
    </>
  );
};

export default InterestsTable;
