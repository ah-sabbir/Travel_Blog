import { FC } from "react";
import NextImage from "../next-image";
import SubscribeForm from "./subscribe-form";
import { footerColumns } from "@/data/menu";
import Link from "next/link";
import { ownerEmail, ownerTel, socialLinks, webCreatedDate } from "@/constant";
import SocialItems from "../social-items";
import Logo from "../logo";
import { FaInstagram } from "react-icons/fa";

interface Props {}

const Footer: FC<Props> = (props): JSX.Element => {
  return (
    <footer>
      <div className="footer-wave"></div>
      <div className="bg-black_text">
        <div className="container">
          <div className="flex justify-between max-[965px]:block">
            <div className="max-[1800px]:-mt-16 relative z-1 text-white">
              <p className="font-extrabold text-3xl">Đăng ký nhận bản tin</p>
              <p className="mt-2 mb-4">
                Tôi sẽ gửi đến bạn những trải nghiệm du lịch một cách chân thực
                nhất.
              </p>

              <SubscribeForm />
            </div>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={socialLinks.igLink}
              className="block footer-image-wrapper border relative"
            >
              <NextImage
                src="/assets/images/footer/du-lich-blog-footer-image.jpg"
                alt="Du lịch 4 phương"
                className="circle-radius"
              />

              <div className="absolute right-0 left-0 bottom-[45%]">
                <div className="relative z-[5] w-[80%] mx-auto flex gap-3 text-white text-lg font-semibold leading-8">
                  <FaInstagram size={35} /> Theo dõi Du Lịch 4 Phương trên
                  Instagram cùng những người khác
                </div>
              </div>
            </a>
          </div>

          <div className="flex gap-6 my-6 text-sm text-white max-[545px]:block">
            <div className="flex-1 grid grid-cols-4 max-[800px]:grid-cols-3 max-[650px]:grid-cols-2 max-[545px]:grid-cols-1 gap-y-6">
              {footerColumns.map((column, index) => (
                <div key={index}>
                  <h5 className="font-extrabold mb-2">{column.heading}</h5>
                  <ul>
                    {column.items.map((item, itemIndex: number) => (
                      <li key={itemIndex} className="my-[10px] hover:underline">
                        <Link href={item.link}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="w-fit max-[545px]:mt-6">
              <h5 className="font-extrabold mb-2">Liên hệ</h5>
              <ul className="mb-3 space-y-3">
                <li>
                  <a href={`mailto:${ownerTel}`}>Tel: {ownerTel}</a>
                </li>
                <li>
                  <a
                    href={`mailto:${ownerEmail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email: {ownerEmail}
                  </a>
                </li>
                <li>Ngày thành lập: {webCreatedDate}</li>
              </ul>
              <SocialItems />
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="container flex items-center justify-center gap-4 py-2 max-[685px]:block max-[685px]:text-center">
            <Logo wrapperClasses="w-[90px] h-[20px] max-[685px]:mx-auto max-[685px]:mt-2 max-[685px]:mb-3" />

            <div className="text-xs text-white">
              ©2023 Bản quyền thuộc về DU LỊCH 4 PHƯƠNG - Website được thiết kế
              & xây dựng với ♥ bởi&nbsp;
              <a
                href="https://github.com/GiangLe1999"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline"
              >
                RiverLee
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
