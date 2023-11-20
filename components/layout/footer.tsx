import { FC } from "react";
import NextImage from "../next-image";
import SubscribeForm from "./subscribe-form";
import { footerColumns } from "@/data/menu";
import Link from "next/link";
import { ownerEmail } from "@/constant";
import SocialItems from "../social-items";
import Logo from "../logo";

interface Props {}

const Footer: FC<Props> = (props): JSX.Element => {
  return (
    <footer>
      <div className="footer-wave"></div>
      <div className="bg-black_text">
        <div className="small-container">
          <div className="flex justify-between">
            <div className="-mt-16 relative z-1 text-white">
              <p className="font-extrabold text-3xl">Đăng ký nhận bản tin</p>
              <p className="font-monserrat mt-2 mb-4">
                Tôi sẽ gửi đến bạn những trải nghiệm du lịch một cách chân thực
                nhất.
              </p>

              <SubscribeForm />
            </div>

            <div className="footer-image-wrapper border">
              <NextImage
                src="/assets/images/footer/du-lich-blog-footer-image.jpg"
                alt="Du lịch 4 phương"
                className="circle-radius"
              />
            </div>
          </div>

          <div className="flex gap-6 font-monserrat my-6 text-sm text-white">
            <div className="flex-1 grid grid-cols-4">
              {footerColumns.map((column, index) => (
                <div key={index}>
                  <h5 className="font-extrabold mb-2">{column.heading}</h5>
                  <ul>
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="my-[10px] hover:underline">
                        <Link href={`/${item.link}`}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="w-fit">
              <h5 className="font-extrabold mb-2">Liên hệ</h5>
              <ul className="mb-3">
                <li>
                  <a
                    href={`mailto:${ownerEmail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ownerEmail}
                  </a>
                </li>
              </ul>
              <SocialItems />
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="small-container flex items-center justify-center gap-4 py-2">
            <Logo wrapperClasses="w-[90px] h-[20px]" />

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
