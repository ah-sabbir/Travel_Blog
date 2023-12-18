import Link from "next/link";
import { FC } from "react";
import ContainNextImage from "./contain-next-image";

interface Props {
  wrapperClasses: string;
  isBlack?: boolean;
}

const Logo: FC<Props> = ({ wrapperClasses, isBlack }): JSX.Element => {
  return (
    <Link href="/" className={`relative block ${wrapperClasses}`}>
      <ContainNextImage
        src={
          isBlack
            ? "/assets/images/du-lich-4-phuong-logo.png"
            : "/assets/images/du-lich-4-phuong-logo-text-white.png"
        }
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
