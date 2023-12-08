"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../custom-tab-panel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrandTypeEntity } from "@/entities/brandType.entity";
import SameTypeTickets from "../ticket-page/same-type-tickets";
import OtherTicketTypes from "./other-brand-types";
import SameTypeBrands from "../brand-page/same-type-brands";
import OtherBrandTypes from "./other-brand-types";

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
  brandType: BrandTypeEntity | undefined;
}

export default function BrandTypeTabs({ brandType }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mx: "16px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="primary tabs example"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              label="Thương hiệu"
              {...a11yProps(0)}
              className="tab-heading "
            />
            <Tab
              label="Các danh mục thương hiệu khác"
              {...a11yProps(1)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <SameTypeBrands brandId="" brandTypeId={brandType?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <OtherBrandTypes currentId={brandType?._id.toString()} />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
