import { path } from "@/constant";
import { IconType } from "react-icons";
import {
  FaInstagram,
  FaPinterestP,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { IoLogoYoutube, IoMdPricetags } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import {
  MdAccountCircle,
  MdAddLocationAlt,
  MdAirplaneTicket,
  MdCategory,
  MdDashboard,
  MdEditSquare,
  MdHome,
  MdImage,
  MdInterests,
  MdOutlineGpsFixed,
  MdOutlinePublic,
} from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";

export const adminSidebarItems: {
  link: string;
  title: string;
  icon: IconType;
}[] = [
  { link: "/", title: "Đến Blog", icon: MdHome },
  { link: path.dashboard, title: "Dashboard", icon: MdDashboard },
  { link: path.profile, title: "Profile", icon: MdAccountCircle },
  { link: path.adminCountries, title: "Quốc gia", icon: MdOutlinePublic },
  {
    link: path.adminRegions,
    title: "Tỉnh - Vùng miền",
    icon: MdOutlineGpsFixed,
  },
  { link: path.adminCategories, title: "Danh mục", icon: MdCategory },
  { link: path.adminInterests, title: "Sở thích", icon: MdInterests },
  { link: path.adminDestinations, title: "Địa danh", icon: MdAddLocationAlt },
  { link: path.adminArticles, title: "Bài viết", icon: MdEditSquare },
  { link: path.adminGalleries, title: "Gallery", icon: MdImage },
  {
    link: path.adminBrandTypes,
    title: "Loại hãng vé",
    icon: TbCategoryFilled,
  },
  { link: path.adminBrands, title: "Hãng vé", icon: IoMdPricetags },
  { link: path.adminTicketTypes, title: "Danh mục vé", icon: IoTicket },
  { link: path.adminTickets, title: "Vé du lịch", icon: MdAirplaneTicket },
];

export const headerServiceItems = [
  {
    title: "Tìm khách sạn",
    link: "",
    via: "via Booking.com",
    position: "1% 36.8421052632%",
  },
  {
    title: "Thuê xe",
    link: "",
    via: "via Sunny Cars",
    position: "0 89.4736842105%",
  },
  {
    title: "Tìm chuyến bay giá rẻ",
    link: "",
    via: "via Skyscanner",
    position: "0 26.3157894737%",
  },
  {
    title: "Tìm bảo hiểm du lịch",
    link: "",
    via: "via Heymondo",
    position: "0 42.1052631579%",
  },
  {
    title: "Book Tours",
    link: "",
    via: "via Viator",
    position: "0 84.2105263158%",
  },
  {
    title: "Book phương tiện di chuyển",
    link: "",
    via: "via 12Go",
    position: "0 0",
  },
];

export const headerSocialItems = [
  { link: "", icon: FaInstagram },
  { link: "", icon: FaYoutube },
  { link: "", icon: FaPinterestP },
  { link: "", icon: FaFacebookF, size: 16 },
];
