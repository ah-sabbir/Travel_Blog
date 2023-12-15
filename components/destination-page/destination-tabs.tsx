"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../custom-tab-panel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TOC from "../article-page/toc";
import { DestinationEntity } from "@/entities/destination.entity";
import DestinationContent from "./destination-content";
import DestinationImages from "./destination-images";
import DestinationArticles from "@/components/all-destinations-page/destination-articles";
import DestinationGalleries from "./destination-galleries";
import RegionDestinations from "../region-page/region-destinations";

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
  destination: DestinationEntity | undefined;
}

export default function DestinationTabs({ destination }: Props) {
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
              label={`Tổng quan về ${destination?.name}`}
              {...a11yProps(0)}
              className="tab-heading "
            />
            <Tab label="Hình ảnh" {...a11yProps(1)} className="tab-heading " />
            <Tab label="Bài viết" {...a11yProps(2)} className="tab-heading " />
            <Tab label="Galleries" {...a11yProps(3)} className="tab-heading " />
            <Tab
              label="Địa danh khác"
              {...a11yProps(4)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="content flex gap-10 max-[1000px]:flex-col-reverse">
            <DestinationContent destination={destination} />
            <div className="flex-1 mt-4">
              <TOC selector=".content" />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DestinationImages images={destination?.images} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <DestinationArticles destinationId={destination?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <DestinationGalleries destinationId={destination?._id.toString()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <RegionDestinations
            destinationId={destination?._id.toString()}
            regionId={destination?.region?._id.toString()}
          />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
