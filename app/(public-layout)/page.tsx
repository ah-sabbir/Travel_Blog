import NextImage from "@/components/next-image";

export default function Home() {
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

      <div className="container flex h-[2000px]">
        <div className="w-[550px]"></div>

        {/* <div className="bg-black flex-1 h-5"></div> */}
      </div>
    </>
  );
}
