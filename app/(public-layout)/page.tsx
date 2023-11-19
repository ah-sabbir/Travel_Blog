import BigArticleCard from "@/components/home-page/big-article-card";
import IntroSection from "@/components/home-page/intro-section";
import RegionsSwiper from "@/components/home-page/regions-swiper";
import NextImage from "@/components/next-image";
import { getAllArticles } from "@/lib/fetch-article-data";
import { getAllRegions } from "@/lib/fetch-region-data";

export default async function page() {
  const articles = await getAllArticles(
    "thumbnail name slug",
    "10",
    "country",
    "name"
  );

  const regions = await getAllRegions("thumbnail name slug", "16");

  return (
    <>
      <div className="home-page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src="/assets/images/home-page/home-cover.jpg"
            alt="Ảnh bìa trang chủ"
            priority
          />
        </div>
      </div>

      <div className="container">
        <div className="flex gap-6 mt-[88px]">
          <div className="w-[calc(100vw_-_(43%_+_40px)_-_(100vw_-_100%)_/_2)]"></div>

          <div className="flex-1">
            <div className="">
              <IntroSection />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8">
          {articles?.slice(0, 3)?.map((article, index) => (
            <BigArticleCard
              key={article._id.toString()}
              article={article}
              order={index}
            />
          ))}
        </div>

        <div className="my-6">
          <RegionsSwiper regions={regions} />
        </div>
      </div>

      <div className="home-page-cover-2">
        <div className="max-w-[1100px] mx-auto flex items-center relative z-[1]">
          <div className="max-w-[550px] text-white flex flex-col justify-center">
            <p className="font-extrabold text-2xl">Không phải ai cũng biết</p>
            <h3 className="text-6xl font-black my-4">Mẹo nhỏ du lịch</h3>
            <p className="font-normal text-sm max-w-[350px] font-monserrat leading-6">
              Có rất nhiều mẹo nhỏ để giúp bạn có được một chuyến đi đáng nhớ và
              thú vị. Tham khảo ngay để có thêm kinh nghiệm cho chuyến du lịch
              giá rẻ!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
