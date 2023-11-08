import { FC, ReactNode } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

interface Props {
  open: boolean;
  onClose: () => void;
  heading: string;
  children: ReactNode;
}

const CustomModal: FC<Props> = ({
  open,
  onClose,
  heading,
  children,
}): JSX.Element => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{
        modal: "customModal",
      }}
    >
      <h3 className="admin-main-gradient text-white px-5 py-3 font-bold text-xl">
        {heading}
      </h3>
      {children}
    </Modal>
  );
};

export default CustomModal;
