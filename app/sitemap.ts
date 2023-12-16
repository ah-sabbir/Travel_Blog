import slugify from "slugify";
import { path } from "@/constant";
import dbConnect from "@/lib/db";
import { getAllArticles } from "@/lib/fetch-article-data";
import { getAllBrands } from "@/lib/fetch-brand-data";
import { getAllBrandTypes } from "@/lib/fetch-brand-type-data";
import { getAllCategories } from "@/lib/fetch-category-data";
import { getAllCountries } from "@/lib/fetch-country-data";
import { getAllDestinations } from "@/lib/fetch-destination-data";
import { getAllGalleries } from "@/lib/fetch-gallery-data";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { getAllRegions } from "@/lib/fetch-region-data";
import { getAllTickets } from "@/lib/fetch-ticket-data";
import { getAllTicketTypes } from "@/lib/fetch-ticket-type-data";
import { getAllUsers } from "@/lib/fetch-user-data";
import { MetadataRoute } from "next";
import Article from "@/models/Article";

type ObjectArr = { url: string; lastModified: Date }[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

  dbConnect();

  const articles = await Article.find().select("slug updatedAt");
  const articleLinks = articles?.map((article) => ({
    url: `${baseURL}${path.article}${article.slug}`,
    lastModified: new Date(article.updatedAt),
  })) as ObjectArr;

  // const categories = await getAllCategories("slug");
  // const categoryLinks = categories?.map((category) => ({
  //   url: `${baseURL}${path.category}${category.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const countries = await getAllCountries("slug updatedAt");
  // const countryLinks = countries?.map((country) => ({
  //   url: `${baseURL}${path.country}${country.slug}`,
  //   lastModified: new Date(country?.updatedAt),
  // })) as ObjectArr;

  // const destinations = await getAllDestinations("slug");
  // const destinationLinks = destinations?.map((destination) => ({
  //   url: `${baseURL}${path.destination}${destination.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const brandTypes = await getAllBrandTypes("slug");
  // const brandTypeLinks = brandTypes?.map((brandType) => ({
  //   url: `${baseURL}${path.brandType}${brandType.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const ticketTypes = await getAllTicketTypes("slug");
  // const ticketTypeLinks = ticketTypes?.map((ticketType) => ({
  //   url: `${baseURL}${path.ticketType}${ticketType.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const interests = await getAllInterests("slug");
  // const interestLinks = interests?.map((interest) => ({
  //   url: `${baseURL}${path.interest}${interest.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const galleries = await getAllGalleries("slug updatedAt");
  // const galleryLinks = galleries?.map((gallery) => ({
  //   url: `${baseURL}${path.gallery}${gallery.slug}`,
  //   lastModified: new Date(gallery.updatedAt),
  // })) as ObjectArr;

  // const brands = await getAllBrands("slug");
  // const brandLinks = brands?.map((brand) => ({
  //   url: `${baseURL}${path.brand}${brand.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const regions = await getAllRegions("slug");
  // const regionLinks = regions?.map((region) => ({
  //   url: `${baseURL}${path.region}${region.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const tickets = await getAllTickets("slug updatedAt");
  // const ticketLinks = tickets?.map((ticket) => ({
  //   url: `${baseURL}${path.ticket}${ticket.slug}`,
  //   lastModified: new Date(),
  // })) as ObjectArr;

  // const users = await getAllUsers();
  // const authorLinks = users?.map((user) => ({
  //   url: `${baseURL}${path.author}${slugify(user.name, { lower: true })}`,
  //   lastModified: new Date(user.updatedAt),
  // })) as ObjectArr;

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allArticles}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allCountries}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allDestinations}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allBrandTypes}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allTicketTypes}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allInterests}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allGalleries}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allBrands}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allRegions}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allTickets}`,
      lastModified: new Date(),
    },
    ...articleLinks,
    // ...categoryLinks,
    // ...countryLinks,
    // ...destinationLinks,
    // ...brandTypeLinks,
    // ...ticketTypeLinks,
    // ...interestLinks,
    // ...galleryLinks,
    // ...brandLinks,
    // ...regionLinks,
    // ...ticketLinks,
    // ...authorLinks,
  ];
}
