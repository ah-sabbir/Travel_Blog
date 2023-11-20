import { FC } from "react";
import NextImage from "../next-image";

interface Props {}

const Footer: FC<Props> = (props): JSX.Element => {
  return (
    <footer>
      <div className="footer-wave"></div>
      <div className="bg-light_pink">
        <div className="small-container">
          <div className="flex justify-between">
            <div>
              <span className="font-extrabold text-3xl">
                Đăng ký nhận bản tin
              </span>
            </div>

            <div className="w-[400px] h-[400px] circle-radius relative -mt-[240px]">
              <NextImage
                src="/assets/images/footer/du-lich-blog-footer-image.jpg"
                alt="Du lịch 4 phương"
                className="circle-radius"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
