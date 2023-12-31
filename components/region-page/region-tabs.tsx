"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../custom-tab-panel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TOC from "../article-page/toc";
import RegionContent from "./region-content";
import { RegionEntity } from "@/entities/region.entity";
import RegionArticles from "@/components/all-regions-page/region-articles";
import RegionDestinations from "./region-destinations";
import RegionGalleries from "./region-galleries";
import CountryRegions from "../country-page/country-regions";
import RegionTickets from "../ticket-page/region-tickets";

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
  region: RegionEntity | undefined;
}

export default function RegionTabs({ region }: Props) {
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
            indicatorColor="secondary"
            variant="scrollable"
            textColor="secondary"
            scrollButtons="auto"
            aria-label="primary scrollable auto tabs example"
          >
            <Tab
              label={`Tổng quan về ${region?.name}`}
              {...a11yProps(0)}
              className="tab-heading "
            />
            <Tab label="Địa danh" {...a11yProps(1)} className="tab-heading " />
            <Tab label="Bài viết" {...a11yProps(2)} className="tab-heading " />
            <Tab
              label="Thư viện ảnh"
              {...a11yProps(3)}
              className="tab-heading "
            />
            <Tab
              label="Tỉnh / Thành khác"
              {...a11yProps(4)}
              className="tab-heading "
            />
            <Tab
              label="Vé / Tour du lịch"
              {...a11yProps(5)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="content flex gap-10 max-[1000px]:flex-col-reverse">
            <RegionContent content={region?.content} />
            <div className="flex-1 mt-4">
              <TOC selector=".content" />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RegionDestinations
            destinationId=""
            regionId={region?._id.toString()}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <RegionArticles regionId={region?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <RegionGalleries regionId={region?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <CountryRegions
            countryId={region?.countryId?.toString()}
            regionId={region?._id?.toString()}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <RegionTickets regionId={region?._id?.toString()} ticketId="" />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
