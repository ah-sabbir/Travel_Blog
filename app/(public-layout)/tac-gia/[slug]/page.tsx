import AuthorTabs from "@/components/author-page/author-tabs";
import BtnWithIcon from "@/components/btn-with-icon";
import NextImage from "@/components/next-image";
import { domain } from "@/constant";
import { getUserProfileBySlug } from "@/lib/fetch-user-data";
import { NextPage } from "next";
import { FaUserCog, FaUserEdit } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const author = await getUserProfileBySlug(params.slug);

    return {
      title: author?.name,
      description: author?.description,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const author = await getUserProfileBySlug(params.slug);

  return (
    <>
      <div className="pt-24 pb-20 bg-slate-50 border-b">
        <div className="container flex items-center gap-8 max-[880px]:block">
          <div
            className={`w-[220px] h-[220px] rounded-full overflow-hidden relative border shadow max-[880px]:mb-6`}
          >
            <NextImage
              src={author?.avatar?.url || ""}
              alt={author?.name || ""}
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between max-[1250px]:block">
              <div className="flex items-center gap-3 max-[1250px]:mb-4 max-[430px]:block">
                <h1 className="text-black_text font-black text-3xl leading-10 tracking-wide font-arima">
                  {author?.name}
                </h1>

                <div className="flex items-center gap-3 max-[430px]:mt-2">
                  <span className="py-1 px-3 bg-[#eeebfd] text-xs text-[#382c95] font-semibold flex items-center gap-1 rounded-md">
                    <FaUserCog className="-mt-[1px]" /> Admin
                  </span>
                  <span className="py-1 px-3 bg-[#e0f0fc] text-xs text-[#294ca5] font-semibold flex items-center gap-1 rounded-md">
                    <FaUserEdit className="-mt-[1px]" /> Author
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 max-[1250px]:mb-6">
                <a
                  href={author?.facebook || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/facebook.png"
                    alt="Facebook link"
                  />
                </a>
                <a
                  href={author?.twitter || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/twitter.png"
                    alt="Twitter link"
                  />
                </a>
                <a
                  href={author?.linkedin || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/linkedin.png"
                    alt="Linkedin link"
                  />
                </a>
                <a
                  href={author?.youtube || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/youtube.png"
                    alt="Youtube link"
                  />
                </a>
                <a
                  href={""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/instagram.png"
                    alt="Instagram link"
                  />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 max-[610px]:block">
              <h2 className="text-gray-600">
                Quản trị viên và Tác giả tại <strong>{domain}</strong>
              </h2>
              <span className="max-[610px]:hidden">|</span>
              <p className="flex items-center gap-[2px] text-gray-600 max-[610px]:mt-3">
                <MdLocationPin className="-mt-[1px]" /> TP. Hồ Chí Minh, Việt
                Nam
              </p>
            </div>

            <p className="text-gray-600 leading-8">{author?.description}</p>

            <BtnWithIcon
              href={`mailto:${author?.email}`}
              content="Liên hệ qua Email"
              icon={IoMdMail}
              external
              iconCustomClasses="-mt-1"
              customClasses="block !w-fit !mt-3 max-[400px]:!w-full"
            />
          </div>
        </div>
      </div>

      <AuthorTabs
        authorId={author?._id}
        numberOfArticles={author?.articles.length}
        numberOfGalleries={author?.galleries.length}
      />
    </>
  );
};

export default Page;
