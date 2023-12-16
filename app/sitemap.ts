import slugify from "slugify";
import { path } from "@/constant";
import dbConnect from "@/lib/db";
import { MetadataRoute } from "next";
import Article from "@/models/Article";
import Category from "@/models/Category";
import Country from "@/models/Country";
import Destination from "@/models/Destination";
import BrandType from "@/models/BrandType";
import TicketType from "@/models/TicketType";
import Interest from "@/models/Interest";
import Gallery from "@/models/Gallery";
import Brand from "@/models/Brand";
import Region from "@/models/Region";
import Ticket from "@/models/Ticket";
import User from "@/models/User";

type ObjectArr = { url: string; lastModified: Date }[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

  dbConnect();

  const articles = await Article.find().select("slug updatedAt");
  const articleLinks = articles?.map((article) => ({
    url: `${baseURL}${path.article}${article.slug}`,
    lastModified: new Date(article.updatedAt),
  })) as ObjectArr;

  const categories = await Category.find().select("slug");
  const categoryLinks = categories?.map((category) => ({
    url: `${baseURL}${path.category}${category.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const countries = await Country.find().select("slug updatedAt");
  const countryLinks = countries?.map((country) => ({
    url: `${baseURL}${path.country}${country.slug}`,
    lastModified: new Date(country?.updatedAt),
  })) as ObjectArr;

  const destinations = await Destination.find().select("slug");
  const destinationLinks = destinations?.map((destination) => ({
    url: `${baseURL}${path.destination}${destination.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const brandTypes = await BrandType.find().select("slug");
  const brandTypeLinks = brandTypes?.map((brandType) => ({
    url: `${baseURL}${path.brandType}${brandType.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const ticketTypes = await TicketType.find().select("slug");
  const ticketTypeLinks = ticketTypes?.map((ticketType) => ({
    url: `${baseURL}${path.ticketType}${ticketType.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const interests = await Interest.find().select("slug");
  const interestLinks = interests?.map((interest) => ({
    url: `${baseURL}${path.interest}${interest.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const galleries = await Gallery.find().select("slug updatedAt");
  const galleryLinks = galleries?.map((gallery) => ({
    url: `${baseURL}${path.gallery}${gallery.slug}`,
    lastModified: new Date(gallery.updatedAt),
  })) as ObjectArr;

  const brands = await Brand.find().select("slug");
  const brandLinks = brands?.map((brand) => ({
    url: `${baseURL}${path.brand}${brand.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const regions = await Region.find().select("slug");
  const regionLinks = regions?.map((region) => ({
    url: `${baseURL}${path.region}${region.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const tickets = await Ticket.find().select("slug");
  const ticketLinks = tickets?.map((ticket) => ({
    url: `${baseURL}${path.ticket}${ticket.slug}`,
    lastModified: new Date(),
  })) as ObjectArr;

  const users = await User.find().select("name updatedAt");
  const authorLinks = users?.map((user) => ({
    url: `${baseURL}${path.author}${slugify(user.name, { lower: true })}`,
    lastModified: new Date(user.updatedAt),
  })) as ObjectArr;

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
    ...categoryLinks,
    ...countryLinks,
    ...destinationLinks,
    ...brandTypeLinks,
    ...ticketTypeLinks,
    ...interestLinks,
    ...galleryLinks,
    ...brandLinks,
    ...regionLinks,
    ...ticketLinks,
    ...authorLinks,
  ];
}
