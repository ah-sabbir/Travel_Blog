"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import RegionArticles from "./region-articles";
import { RegionEntity } from "@/entities/region.entity";

interface Props {
  regions: RegionEntity[] | undefined;
}

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

const AllRegionsTabs: FC<Props> = ({ regions }): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }} className="container">
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
            {regions?.map((region, index) => (
              <Tab
                label={region?.name || ""}
                {...a11yProps(index)}
                className="tab-heading "
                key={region._id.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {regions?.map((region, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            key={region._id.toString()}
          >
            <RegionArticles regionId={region._id.toString()} />
          </CustomTabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default AllRegionsTabs;
