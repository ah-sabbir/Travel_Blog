import { GetAllTicketTypesOutput } from "@/dtos/ticketType/get-all-ticket-types.dto";
import axiosInstance from "./axios";

export const getAllTicketTypes = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllTicketTypesOutput } = await axiosInstance(
      "/api/public/ticket-types",
      { params: { specifiedProps } }
    );

    return data.ticketTypes;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};
