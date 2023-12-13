import BtnWithIcon from "@/components/btn-with-icon";
import BigArticleCard from "@/components/home-page/big-article-card";
import DestinationsSwiper from "@/components/home-page/destinations-swiper";
import HomeArticles from "@/components/home-page/home-articles";
import HomeGalleries from "@/components/home-page/home-galleries";
import IntroSection from "@/components/home-page/intro-section";
import MobileIntroSection from "@/components/home-page/mobile-intro-section";
import SmallInterestCard from "@/components/home-page/small-interest-card";
import NextImage from "@/components/next-image";
import SmallItemSwiper from "@/components/smaill-item-swiper";
import SmallArticleCard from "@/components/small-article-card";
import { path } from "@/constant";
import { GetDestinationsForHomepage } from "@/dtos/destination/get-all-destinations.dto";
import {
  getAllArticles,
  getArticlesByCategory,
} from "@/lib/fetch-article-data";
import { getAllDestinations } from "@/lib/fetch-destination-data";
import { getAllInterests } from "@/lib/fetch-interest-data";
import { getAllRegions } from "@/lib/fetch-region-data";

export default async function page() {
  const articles = await getAllArticles(
    "thumbnail name slug",
    "7",
    "country",
    "name"
  );

  const regions = await getAllRegions("thumbnail name slug", "16");

  const tipsArticles = await getArticlesByCategory(
    "meo-vat",
    "thumbnail slug name",
    "4"
  );

  const destinations = await getAllDestinations(
    "thumbnail name slug",
    "6",
    "country",
    "name"
  );

  const interests = await getAllInterests("thumbnail name slug", "8");

  return (
    <>
      <div className="home-page-cover bubble-mask">
        <div className="relative w-full h-full">
          <NextImage
            src="/assets/images/home-page/home-cover.jpg"
            alt="Ảnh bìa trang chủ"
            priority
          />

          <div className="hidden max-[1250px]:block absolute top-1/2 -translate-y-1/2 z-10 right-0 left-0">
            <MobileIntroSection />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex gap-6 mt-[88px] max-[1250px]:hidden">
          <div className="w-[56%]"></div>

          <div className="flex-1">
            <div className="">
              <IntroSection />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 max-[955px]:grid-cols-1 max-[955px]:max-w-[550px] max-[955px]:mx-auto max-[745px]:max-w-full gap-8 max-[1250px]:mt-[530px]">
          {articles?.slice(0, 3)?.map((article, index) => (
            <BigArticleCard
              key={article._id.toString()}
              article={article}
              order={index}
            />
          ))}
        </div>

        <div className="mt-12 mb-6">
          <SmallItemSwiper items={regions} coreSlug={path.region} isHomepage />
        </div>
      </div>

      <div className="home-page-cover-2">
        <div className="container max-[1000px]:block flex items-center justify-between gap-24 py-[70px] relative z-[1]">
          <div className="max-w-[550px] text-white flex flex-col justify-center">
            <p className="font-extrabold text-2xl max-[550px]:text-xl">
              Không phải ai cũng biết
            </p>
            <h3 className="text-6xl font-black my-4 max-[550px]:text-5xl">
              Mẹo nhỏ du lịch
            </h3>
            <p className="font-normal text-sm max-w-[350px] max-[1000px]:max-w-full leading-6">
              Có rất nhiều mẹo nhỏ để giúp bạn có được một chuyến đi đáng nhớ và
              thú vị. Tham khảo ngay để có thêm kinh nghiệm cho chuyến du lịch
              giá rẻ!
            </p>
            <BtnWithIcon
              customClasses="w-fit !rounded-[40px] mt-4 before:rounded-[40px]"
              content="Xem ngay!"
              to={`${path.category}meo-vat`}
            />
          </div>
          <div className="max-w-[450px] max-[1000px]:max-w-full max-[1000px]:mt-6 rounded-md p-2 bg-white">
            {tipsArticles?.map((article, index) => (
              <SmallArticleCard
                image={article?.thumbnail?.url}
                slug={article?.slug}
                title={article?.name}
                key={article?._id?.toString()}
                isLastItem={index === tipsArticles.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container !pr-0 flex max-[1250px]:block gap-4 my-16">
        <div className="w-[40%] max-[1250px]:w-full">
          {articles?.slice(3)?.map((article, index) => (
            <SmallArticleCard
              image={article?.thumbnail?.url}
              slug={article?.slug}
              title={article?.name}
              key={article?._id?.toString()}
              isLastItem={index === articles?.slice(3)?.length - 1}
              isMedium
            />
          ))}
        </div>

        <div className="flex-1 max-w-[62%] max-[1250px]:w-full max-[1250px]:max-w-full max-[1250px]:mt-6">
          <DestinationsSwiper
            destinations={
              destinations as GetDestinationsForHomepage["destinations"]
            }
          />
        </div>
      </div>

      <div className="home-page-cover-3">
        <div className="container flex max-[1000px]:block items-center gap-24 py-[70px] relative z-[1]">
          <div className="max-w-[550px] max-[1000px]:max-w-full text-white flex flex-col justify-center">
            <p className="font-extrabold text-2xl max-[550px]:text-xl">
              Chuyên mục
            </p>
            <h3 className="text-6xl font-black my-4 max-[550px]:text-5xl">
              Đọc theo sở thích
            </h3>
            <p className="font-normal text-sm max-w-[350px] leading-6">
              Rất nhiều lọai địa điểm độc đáo đang chờ bạn khám phá đấy. Đón đọc
              ngay để xem những nơi tôi từng đi qua có gì hay nào!
            </p>
            <BtnWithIcon
              customClasses="w-fit !rounded-[40px] mt-4 before:rounded-[40px]"
              content="Xem tất cả!"
              to={path.allInterests}
            />
          </div>
          <div className="flex-1 grid grid-cols-2 max-[550px]:grid-cols-1 gap-4 max-[1000px]:mt-6">
            <div className="rounded-md p-2 bg-white">
              {interests?.slice(0, 4)?.map((interest, index) => (
                <SmallInterestCard
                  image={interest?.thumbnail?.url}
                  slug={interest?.slug}
                  title={interest?.name}
                  key={interest?._id?.toString()}
                  isLastItem={index === interests?.slice(0, 4)?.length - 1}
                />
              ))}
            </div>

            <div className="rounded-md p-2 bg-white">
              {interests?.slice(4)?.map((interest, index) => (
                <SmallInterestCard
                  image={interest?.thumbnail?.url}
                  slug={interest?.slug}
                  title={interest?.name}
                  key={interest?._id?.toString()}
                  isLastItem={index === interests?.slice(4)?.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-10">
        <HomeArticles />
      </div>

      <div className="container mt-14">
        <HomeGalleries />
      </div>
    </>
  );
}
