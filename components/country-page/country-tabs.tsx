"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../custom-tab-panel";
import { CountryEntity } from "@/entities/country.entity";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountryContent from "./country-content";
import TOC from "../article-page/toc";
import CountryDestinations from "./country-destinations";
import CountryArticles from "@/components/all-countries-page/country-articles";
import CountryGalleries from "../all-countries-page/country-galleries";
import CountryRegions from "./country-regions";
import CountryTickets from "../ticket-page/country-tickets";

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
  country: CountryEntity | undefined;
}

export default function CountryTabs({ country }: Props) {
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
              label={`Tổng quan về đất nước ${country?.name}`}
              {...a11yProps(0)}
              className="tab-heading "
            />
            <Tab
              label="Tỉnh thành"
              {...a11yProps(1)}
              className="tab-heading "
            />
            <Tab label="Địa danh" {...a11yProps(2)} className="tab-heading " />
            <Tab label="Bài viết" {...a11yProps(3)} className="tab-heading " />
            <Tab
              label="Thư viện ảnh"
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
            <CountryContent content={country?.content} />
            <div className="flex-1 mt-4">
              <TOC selector=".content" />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CountryRegions countryId={country?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CountryDestinations countryId={country?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <CountryArticles countryId={country?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <CountryGalleries countryId={country?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <CountryTickets ticketId="" countryId={country?._id.toString()} />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
