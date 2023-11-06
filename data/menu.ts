import { path } from "@/constant";
import { IconType } from "react-icons";
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
  MdTravelExplore,
} from "react-icons/md";

export const adminSidebarItems: {
  link: string;
  title: string;
  icon: IconType;
}[] = [
  { link: "/", title: "Đến Blog", icon: MdHome },
  { link: path.dashboard, title: "Dashboard", icon: MdDashboard },
  { link: path.profile, title: "Profile", icon: MdAccountCircle },
  { link: path.adminGalleries, title: "Gallery", icon: MdImage },
  { link: path.adminArticles, title: "Bài viết", icon: MdEditSquare },
  { link: path.adminTickets, title: "Vé du lịch", icon: MdAirplaneTicket },
  { link: path.adminCategories, title: "Danh mục", icon: MdCategory },
  { link: path.adminCountries, title: "Quốc gia", icon: MdOutlineGpsFixed },
  { link: path.adminBrands, title: "Thương hiệu", icon: MdTravelExplore },
  { link: path.adminDestinations, title: "Điểm đến", icon: MdAddLocationAlt },
  { link: path.adminInterests, title: "Sở thích", icon: MdInterests },
  { link: path.adminRegions, title: "Tỉnh - Vùng miền", icon: MdOutlinePublic },
];
