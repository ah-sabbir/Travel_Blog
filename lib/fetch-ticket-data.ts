import axiosInstance from "./axios";
import { GetAllTicketsOutput } from "@/dtos/ticket/get-all-tickets.dto";
import { GetTicketBySlugOutput } from "@/dtos/ticket/get-ticket-by-slug.dto";
import { GetTicketResultsOutput } from "@/dtos/ticket/get-ticket-results";

export const getAllTickets = async (specifiedProps: string = "") => {
  try {
    const { data }: { data: GetAllTicketsOutput } = await axiosInstance(
      "/api/public/tickets",
      { params: { specifiedProps } }
    );

    return data.tickets;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getTicketBySlug = async (
  slug: string,
  populate: boolean = false
) => {
  try {
    const { data }: { data: GetTicketBySlugOutput } = await axiosInstance(
      `/api/public/ticket?slug=${slug}&populate=${populate}`
    );

    return data.ticket;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameBrandTickets = async (
  ticketId: string = "",
  brandId: string = "",
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetTicketResultsOutput } = await axiosInstance(
      `/api/public/tickets/same-brand`,
      {
        params: { ticketId, brandId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameCountryTickets = async (
  ticketId: string = "",
  countryId: string = "",
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetTicketResultsOutput } = await axiosInstance(
      `/api/public/tickets/same-country`,
      {
        params: { ticketId, countryId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameRegionTickets = async (
  ticketId: string = "",
  regionId: string = "",
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetTicketResultsOutput } = await axiosInstance(
      `/api/public/tickets/same-region`,
      {
        params: { ticketId, regionId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameTypeTickets = async (
  ticketId: string = "",
  ticketTypeId: string = "",
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetTicketResultsOutput } = await axiosInstance(
      `/api/public/tickets/same-type`,
      {
        params: { ticketId, ticketTypeId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
