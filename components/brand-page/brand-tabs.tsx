"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../custom-tab-panel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TicketContent from "./brand-content";
import BrandContent from "./brand-content";
import { BrandEntity } from "@/entities/brand.entity";
import TOC from "../article-page/toc";
import BrandTickets from "../ticket-page/brand-tickets";
import SameTypeBrands from "./same-type-brands";

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
  brand: BrandEntity | undefined;
}

export default function BrandTabs({ brand }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="primary tabs example"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              label={`Giới thiệu tổng quan`}
              {...a11yProps(0)}
              className="tab-heading "
            />
            <Tab label="Vé giá rẻ" {...a11yProps(1)} className="tab-heading " />
            <Tab
              label="Hãng vé cạnh tranh"
              {...a11yProps(2)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="content grid grid-cols-1 lg:grid-cols-[1fr,0.35fr] gap-10">
            <BrandContent content={brand?.content} />
            <TOC selector=".content" />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <BrandTickets brandId={brand?._id.toString()} ticketId="" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SameTypeBrands
            brandId={brand?._id.toString()}
            brandTypeId={brand?.brandType._id.toString()}
          />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
