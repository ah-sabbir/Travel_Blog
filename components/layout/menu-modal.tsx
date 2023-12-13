"use client";

import { FC, SyntheticEvent, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import CustomTabPanel from "../custom-tab-panel";
import MobileDestinationsMenu from "./mobile-destinations-menu";
import { IoClose } from "react-icons/io5";
import MobileCategoriesMenu from "./mobile-categories-menu";
import MobileServiceMenu from "./mobile-service-menu";
import SearchBar from "./search-bar";
import MobileReadMoreMenu from "./mobile-read-more-menu";
const theme = createTheme({
  palette: {
    primary: {
      main: "#353535",
    },
    secondary: {
      main: "#c3224a",
    },
  },
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const MenuModal: FC<Props> = ({ open, onClose }): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      showCloseIcon={false}
      classNames={{
        modal: "headerModal",
      }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              variant="scrollable"
              textColor="secondary"
              scrollButtons="auto"
              aria-label="primary scrollable auto tabs example"
            >
              <Tab
                label="Điểm đến"
                {...a11yProps(0)}
                className="tab-heading "
              />
              <Tab
                label="Danh mục"
                {...a11yProps(1)}
                className="tab-heading "
              />
              <Tab label="Dịch vụ" {...a11yProps(2)} className="tab-heading " />
              <Tab
                label="Tìm đọc theo"
                {...a11yProps(3)}
                className="tab-heading "
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <MobileDestinationsMenu />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MobileCategoriesMenu />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MobileServiceMenu />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <MobileReadMoreMenu />
          </CustomTabPanel>
        </Box>
      </ThemeProvider>

      <div className="absolute top-[5.6px] right-16 max-[790px]:left-4 max-[790px]:top-3">
        <SearchBar isMobile />
      </div>

      <button
        onClick={onClose}
        className="absolute top-1 max-[790px]:top-3 right-4 w-10 h-10 circle-radius bg-black_text text-white grid place-items-center"
      >
        <IoClose size={22} />
      </button>
    </Modal>
  );
};

export default MenuModal;
