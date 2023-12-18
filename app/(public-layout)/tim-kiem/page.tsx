import SearchPageContent from "@/components/search-page/search-page-content";
import { FC } from "react";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  try {
    return {
      title: `Kết quả tìm kiếm cho ${searchParams["tu-khoa"]}`,
      description: `Kết quả tìm kiếm gồm bài viết, thư viện ảnh và vé giá rẻ cho từ khóa ${searchParams["tu-khoa"]} trên website Dulich4phuong.com`,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {}

const SearchResults: FC<Props> = (props): JSX.Element => {
  return (
    <>
      <SearchPageContent />
    </>
  );
};

export default SearchResults;
