import NextImage from "@/components/next-image";
import { ownerEmail, ownerTel, websiteName } from "@/constant";
import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const page: NextPage<Props> = () => {
  return (
    <div className="mt-[130px] container">
      <div className="text-center mx-auto w-[700px] max-[750px]:w-full">
        <h1 className="font-bold text-5xl text-admin_primary">
          Đây là {websiteName}!
        </h1>
        <p className="italic leading-8 mt-4">
          {websiteName} là nơi tôi chia sẻ những hành trình đầy phấn khích và
          những trải nghiệm tuyệt vời từ các điểm đến trên khắp Việt Nam và thế
          giới. Qua những chuyến phiêu lưu, tôi có cơ hội khám phá những vùng
          đất mới, đắm chìm trong văn hóa độc đáo, và tận hưởng những phong cảnh
          tuyệt vời nhất.
        </p>
      </div>

      <div className="profile-bg h-auto px-6 pb-8 pt-36 text-center mt-36 mb-20 relative">
        <div className="circle-radius border w-[200px] h-[200px] absolute -top-[100px] left-1/2 -translate-x-1/2">
          <NextImage
            src="/assets/images/footer/du-lich-blog-footer-image.jpg"
            alt="Du lịch 4 phương"
            className="circle-radius"
          />
        </div>
        <h2 className="font-bold text-2xl mb-3">Du Lịch 4 Phương là ai?</h2>
        <p className="leading-8">
          Du lịch không chỉ là việc di chuyển từ một địa điểm này đến địa điểm
          khác, mà còn là hành trình khám phá, trải nghiệm và tận hưởng những vẻ
          đẹp độc đáo của thế giới xung quanh chúng ta. Để chia sẻ niềm đam mê
          khám phá và mang lại những thông tin hữu ích cho những người yêu thích
          du lịch, {websiteName} ra đời, nơi gặp gỡ những chuyến phiêu lưu,
          những câu chuyện hấp dẫn và những góc nhìn đặc biệt về các điểm đến.
        </p>
      </div>

      <div className="prose w-[700px] max-[750px]:w-full mx-auto prose-h2:text-admin_primary prose-h2:font-extrabold prose-h3:font-extrabold text-justify">
        <h2>1. Khám Phá Những Điểm Đến Độc Đáo</h2>
        <p>
          {websiteName} không chỉ đơn thuần là một danh sách các địa điểm du
          lịch phổ biến. Đây là nơi bạn có thể khám phá những ngóc ngách ẩn sau
          vẻ ngoại hình truyền thống. Từ những ngôi làng cổ kính đến những thành
          phố hiện đại đầy màu sắc, từ những bãi biển huyền bí đến những ngọn
          núi cao ngất, {websiteName} là cầu nối đưa bạn đến những địa điểm độc
          đáo và không ngừng kì quan.
        </p>
        <h2>2. Hành Trình Trải Nghiệm Thực Tế</h2>
        <p>
          Chẳng ai muốn một kỳ nghỉ rơi vào kiểu chụp hình “lấy về để ngắm” mà
          thiếu đi những trải nghiệm thực tế. {websiteName} sẽ chia sẻ những
          hành trình thú vị, từ việc thử nghiệm ẩm thực địa phương đến việc tham
          gia các hoạt động văn hóa độc đáo. Bạn sẽ được dẫn dắt qua những con
          phố nhỏ, thăm những chợ truyền thống, và hòa mình vào lối sống của
          cộng đồng địa phương.
        </p>
        <h2>3. Gặp Gỡ Những Nhân Vật Độc Đáo</h2>
        <p>
          Mỗi địa điểm đều mang đến những câu chuyện riêng, và {websiteName} sẽ
          giới thiệu bạn đến những nhân vật độc đáo đang sống và làm việc tại
          đó. Những cuộc phỏng vấn, những câu chuyện cá nhân sẽ giúp bạn hiểu rõ
          hơn về văn hóa, lịch sử và những người dân tại những địa điểm bạn sắp
          đặt chân đến.
        </p>
        <h2>4. Tips Du Lịch Hữu Dụng Nhất Cho Chuyến Đi Của Bạn</h2>
        <p>
          {websiteName} không chỉ là nguồn cảm hứng mà còn là nguồn thông tin
          hữu ích. Từ cách lên kế hoạch chuyến đi, chọn lựa phương tiện di
          chuyển, đến những gợi ý về chỗ ở và ẩm thực, bạn sẽ tìm thấy mọi thứ
          bạn cần để kế hoạch hóa chuyến phiêu lưu của mình một cách thông minh
          nhất.
        </p>
        <h2>5. Sự Giao Thoa Văn Hóa và Nghệ Thuật</h2>
        <p>
          Du lịch không chỉ là việc đi lại giữa các địa điểm, mà còn là cơ hội
          để hiểu biết về sự đa dạng văn hóa và nghệ thuật trên thế giới. Blog
          Du Lịch sẽ giới thiệu bạn đến những triển lãm nghệ thuật, lễ hội văn
          hóa, và những di sản lịch sử nổi tiếng. Bạn sẽ được đắm chìm trong
          những trải nghiệm văn hóa không giới hạn.
        </p>
        <h2>6. Đọc Những Đánh Giá Thực Tế</h2>
        <p>
          Trước khi quyết định đặt vé máy bay hay đặt phòng khách sạn, đôi khi
          bạn muốn biết ý kiến của những người đã trải qua trước đó. Blog Du
          Lịch sẽ cung cấp những đánh giá chân thực từ những người đã trải
          nghiệm. Từ đánh giá nhà hàng đến nhận xét về dịch vụ vận chuyển, bạn
          sẽ có mọi thông tin để đảm bảo một chuyến đi suôn sẻ.
        </p>

        <h2>
          7. Du Lịch 4 Phương - Cánh Cửa Sổ Mới Cho Cuộc Phiêu Lưu Của Bạn
        </h2>
        <p>
          Với sứ mệnh làm nổi bật vẻ đẹp và độc đáo của thế giới, {websiteName}
          không chỉ là nguồn thông tin, mà còn là nguồn cảm hứng để bạn mở cửa
          sổ mới cho cuộc phiêu lưu của mình. Hãy cùng chúng tôi bắt đầu hành
          trình khám phá và trải nghiệm những điều tuyệt vời nhất mà thế giới có
          thể mang lại.
        </p>

        <h2>8. Thông Tin Liên Hệ</h2>
        <ul>
          <li>
            Website:{" "}
            <Link href="/">
              <strong>https://dulich4phuong.com</strong>
            </Link>
          </li>
          <li>
            <a href={`tel:${ownerTel}`}></a> SĐT: <strong>{ownerTel}</strong>
          </li>
          <li>
            <a href={`mailto:${ownerEmail}`}></a> Email:{" "}
            <strong>{ownerEmail}</strong>
          </li>
          <li>
            Địa chỉ:{" "}
            <strong>
              16 Má Hai, phường Tân Hòa, TP. Buôn Ma Thuột, Đăk Lăk
            </strong>
          </li>
          <li>
            Ngày thành lập: <strong>17/12/2023</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
