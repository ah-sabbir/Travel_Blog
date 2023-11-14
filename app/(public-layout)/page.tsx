import NextImage from "@/components/next-image";

export default function Home() {
  return (
    <div className="home-page-cover bubble-mask">
      <div className="relative w-full h-full">
        <NextImage
          src="/assets/images/home-page/home-cover.jpg"
          alt="Ảnh bìa trang chủ"
          priority
        />
      </div>
    </div>
  );
}
