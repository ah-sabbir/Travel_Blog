import axiosInstance from "./axios";
import { GetAllTicketsOutput } from "@/dtos/ticket/get-all-tickets.dto";
import { GetTicketBySlugOutput } from "@/dtos/ticket/get-ticket-by-slug.dto";

export const getAllTickets = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllTicketsOutput } = await axiosInstance(
      "/api/public/tickets",
      { params: { specifiedProps } }
    );

    return data.tickets;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};

export const getTicketBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetTicketBySlugOutput } = await axiosInstance(
      `/api/public/ticket?slug=${slug}`
    );

    return data.ticket;
  } catch (err: any) {
    console.log(err.response.statusText);
    return;
  }
};
