"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import OtherInterests from "./other-interests";
import InterestDestinations from "./interest-destinations";
import InterestArticles from "../all-interests-page/interest-articles";
import InterestGalleries from "./interest-galleries";

interface Props {
  interestId: string | undefined;
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

const InterestTabs: FC<Props> = ({ interestId }): JSX.Element => {
  const [value, setValue] = useState(0);

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
            <Tab label="Bài viết" {...a11yProps(0)} className="tab-heading " />
            <Tab
              label="Thư viện ảnh"
              {...a11yProps(1)}
              className="tab-heading "
            />
            <Tab label="Địa danh" {...a11yProps(2)} className="tab-heading " />
            <Tab
              label="Sở thích khác"
              {...a11yProps(3)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <InterestArticles interestId={interestId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <InterestGalleries interestId={interestId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <InterestDestinations destinationId="" interestId={interestId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <OtherInterests currentId={interestId} />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default InterestTabs;
