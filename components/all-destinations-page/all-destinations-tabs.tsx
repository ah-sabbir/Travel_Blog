"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import DestinationArticles from "./destination-articles";

interface Props {
  destinations: any[] | undefined;
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

const AllDestinationsTabs: FC<Props> = ({ destinations }): JSX.Element => {
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
            {destinations?.map((destination, index) => (
              <Tab
                label={destination?.name || ""}
                {...a11yProps(index)}
                className="tab-heading "
                key={destination._id.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {destinations?.map((destination, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            key={destination._id.toString()}
          >
            <DestinationArticles destinationId={destination._id.toString()} />
          </CustomTabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default AllDestinationsTabs;
