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
            aria-label="primary tabs example"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              label={`Tổng quan về đất nước ${country?.name}`}
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
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="content grid grid-cols-1 lg:grid-cols-[1fr,0.35fr] gap-10">
            <CountryContent content={country?.content} />
            <TOC selector=".content" />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CountryDestinations
            slug={country?.slug}
            countryName={country?.name}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Item Three
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
