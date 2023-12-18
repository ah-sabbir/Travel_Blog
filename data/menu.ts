import { iconPosition, path, socialLinks } from "@/constant";
import { IconType } from "react-icons";
import {
  FaInstagram,
  FaPinterestP,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
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
    position: iconPosition.bed,
  },
  {
    title: "Thuê xe",
    link: "",
    via: "via Chungxe",
    position: iconPosition.car,
  },
  {
    title: "Tìm chuyến bay giá rẻ",
    link: "",
    via: "via Traveloka",
    position: iconPosition.plane,
  },
  {
    title: "Tìm bảo hiểm du lịch",
    link: "",
    via: "via Heymondo",
    position: iconPosition.shield,
  },
  {
    title: "Book Tours",
    link: "",
    via: "via Viator",
    position: iconPosition.foot,
  },
  {
    title: "Book phương tiện di chuyển",
    link: "",
    via: "via 12Go",
    position: iconPosition.ticket,
  },
];

export const headerSocialItems = [
  { link: socialLinks.igLink, icon: FaInstagram },
  { link: socialLinks.ytLink, icon: FaYoutube },
  { link: socialLinks.pinLink, icon: FaPinterestP },
  { link: socialLinks.fbLink, icon: FaFacebookF, size: 16 },
];

export const footerColumns = [
  {
    heading: "Điểm đến nổi bật",
    items: [
      { title: "Việt Nam", link: `${path.country}viet-nam` },
      { title: "Thái Lan", link: `${path.country}thai-lan` },
      { title: "Singarpore", link: `${path.country}singapore` },
      { title: "Trung Quốc", link: `${path.country}trung-quoc` },
      { title: "Nhật Bản", link: `${path.country}nhat-ban` },
    ],
  },
  {
    heading: "Danh mục nổi bật",
    items: [
      { title: "Nhật ký", link: `${path.category}nhat-ky` },
      { title: "Khám phá", link: `${path.category}kham-pha` },
      { title: "Mẹo vặt", link: `${path.category}meo-vat` },
      { title: "Bộ sưu tập", link: `${path.category}bo-suu-tap` },
      { title: "Đặc sản", link: `${path.category}dac-san` },
    ],
  },
  {
    heading: "Tìm đọc theo",
    items: [
      { title: "Địa danh", link: `${path.allDestinations}` },
      { title: "Sở thích", link: `${path.allInterests}` },
      { title: "Du lịch qua ảnh", link: "galleries" },
      { title: "Vé giá rẻ", link: "ve-gia-re" },
      { title: "Các hãng vé", link: "hang-ve-gia-re" },
    ],
  },

  {
    heading: "Tips & Tricks",
    items: [
      { title: "Trở thành Travel Blogger", link: "" },
      { title: "Hạn chế rác thải nhựa", link: "" },
      { title: "Thiết bị quay chụp của tôi", link: "" },
    ],
  },
];

export const destinationMenu = [
  {
    name: "Việt Nam",
    slug: "viet-nam",
    regions: [
      {
        name: "Phan Thiết",
        slug: "phan-thiet",
      },
      {
        name: "Nha Trang",
        slug: "nha-trang",
      },
      {
        name: "Vũng Tàu",
        slug: "vung-tau",
      },
      {
        name: "Đà Nẵng",
        slug: "da-nang",
      },
      {
        name: "Quy Nhơn",
        slug: "quy-nhon",
      },
      {
        name: "Hà Nội",
        slug: "ha-noi",
      },
      {
        name: "Huế",
        slug: "hue",
      },
      {
        name: "Hạ Long",
        slug: "ha-long",
      },
      {
        name: "Bình Thuận",
        slug: "binh-thuan",
      },
      {
        name: "An Giang",
        slug: "an-giang",
      },
      {
        name: "Sapa",
        slug: "sapa",
      },
      {
        name: "Mộc Châu",
        slug: "moc-chau",
      },
      {
        name: "Thanh Hóa",
        slug: "thanh-hoa",
      },
      {
        name: "Ninh Bình",
        slug: "ninh-binh",
      },
      {
        name: "Quảng Nam",
        slug: "quang-nam",
      },
      {
        name: "Kiên Giang",
        slug: "kien-giang",
      },
    ],
  },
  {
    name: "Thái Lan",
    slug: "thai-lan",
    regions: [
      {
        name: "Bangkok",
        slug: "bangkok",
      },
      {
        name: "Chiang Mai",
        slug: "chiang-mai",
      },
      {
        name: " Ayutthaya",
        slug: "ayutthaya",
      },
      {
        name: "Chiang Rai",
        slug: "chiang Rai",
      },
      {
        name: "Kanchanaburi",
        slug: "kanchanaburi",
      },
      {
        name: "Pattaya",
        slug: "pattaya",
      },
      {
        name: "Nakhon Ratchasima",
        slug: "nakhon-ratchasima",
      },
      {
        name: "sukhothai",
        slug: "sukhothai",
      },
      {
        name: "Surat Thani",
        slug: "surat-thani",
      },
      {
        name: "Hua Hin",
        slug: "hua-hin",
      },
    ],
  },
  {
    name: "Trung Quốc",
    slug: "trung-quoc",
    regions: [
      {
        name: "Bắc Kinh",
        slug: "bac-kinh",
      },
      {
        name: "Tây An",
        slug: "tay-an",
      },
      {
        name: "Hàng Châu",
        slug: "hang-chau",
      },
      {
        name: "Lệ Giang",
        slug: "le-giang",
      },
      {
        name: "Côn Minh",
        slug: "con-minh",
      },
      {
        name: "Thành Đô",
        slug: "thanh-do",
      },
      {
        name: "Lạc Dương",
        slug: "lac-duong",
      },
      {
        name: "Lahasa",
        slug: "lahasa",
      },
    ],
  },
  {
    name: "Nhật Bản",
    slug: "nhat-ban",
    regions: [
      {
        name: "Okinawa",
        slug: "okinawa",
      },
      {
        name: "Kyoto",
        slug: "kyoto",
      },
      {
        name: "Hokkaido",
        slug: "hokkaido",
      },
      {
        name: "Osaka",
        slug: "osaka",
      },
    ],
  },
  {
    name: "Singapore",
    slug: "singapore",
    regions: [
      {
        name: "Singapore",
        slug: "singapore",
      },
    ],
  },
];

export const categoryMenu = [
  {
    name: "Khám phá",
    slug: "kham-pha",
  },
  {
    name: "Cẩm nang du lịch",
    slug: "cam-nang-du-lich",
  },
  {
    name: "Đặc sản",
    slug: "dac-san",
  },
  {
    name: "Cẩm nang bỏ túi",
    slug: "cam-nang-bo-tui",
  },
  {
    name: "Kỹ năng sinh tồn",
    slug: "ky-nang-sinh-ton",
  },
  {
    name: "Mẹo vặt",
    slug: "meo-vat",
  },
  {
    name: "Nhật ký",
    slug: "nhat-ky",
  },
  {
    name: "Bộ sưu tập",
    slug: "bo-suu-tap",
  },
];
