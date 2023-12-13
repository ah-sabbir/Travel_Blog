import { FC } from "react";

interface Props {
  className?: string;
}

const HamburgerIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      id="icon-menu"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 0h18a2 2 0 012 1.9 2 2 0 01-2 1.9H2a2 2 0 01-2-2A2 2 0 012 0zM2 18.8h18a2 2 0 012 2 2 2 0 01-2 1.8H2a2 2 0 01-2-1.9 2 2 0 012-1.9zm0 9.4h28a2 2 0 012 2 2 2 0 01-2 1.8H2a2 2 0 01-2-1.9 2 2 0 012-1.9zM2 9.4h28a2 2 0 012 1.9 2 2 0 01-2 1.9H2a2 2 0 01-2-2 2 2 0 012-1.8z"></path>
    </svg>
  );
};

export default HamburgerIcon;
