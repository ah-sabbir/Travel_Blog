"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import CategoryArticles from "./interest-articles";
import { InterestEntity } from "@/entities/interest.entity";
import InterestArticles from "./interest-articles";

interface Props {
  interests: InterestEntity[] | undefined;
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

const AllInterestsTabs: FC<Props> = ({ interests }): JSX.Element => {
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
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="primary scrollable auto tabs example"
          >
            {interests?.map((interest, index) => (
              <Tab
                label={interest?.name || ""}
                {...a11yProps(index)}
                className="tab-heading "
                key={interest._id.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {interests?.map((interest, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            key={interest._id.toString()}
          >
            <InterestArticles interestId={interest._id.toString()} />
          </CustomTabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default AllInterestsTabs;
