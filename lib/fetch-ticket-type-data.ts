import { GetAllTicketTypesOutput } from "@/dtos/ticketType/get-all-ticket-types.dto";
import axiosInstance from "./axios";
import { GetTicketTypeBySlugOutput } from "@/dtos/ticketType/get-ticket-type-by-slug.dto";

export const getAllTicketTypes = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllTicketTypesOutput } = await axiosInstance(
      "/api/public/ticket-types",
      { params: { specifiedProps } }
    );

    return data.ticketTypes;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getTicketTypeBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetTicketTypeBySlugOutput } = await axiosInstance(
      `/api/public/ticket-type?slug=${slug}`
    );

    return data.ticketType;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
