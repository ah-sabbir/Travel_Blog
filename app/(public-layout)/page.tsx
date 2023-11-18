import BigArticleCard from "@/components/home-page/big-article-card";
import IntroSection from "@/components/home-page/intro-section";
import RegionsSwiper from "@/components/home-page/regions-swiper";
import NextImage from "@/components/next-image";
import { getAllArticles } from "@/lib/fetch-article-data";
import { getAllRegions } from "@/lib/fetch-region-data";

export default async function page() {
  const threeLatestArticles = await getAllArticles(
    "thumbnail name slug",
    "3",
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
          {threeLatestArticles?.map((article, index) => (
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
    </>
  );
}
