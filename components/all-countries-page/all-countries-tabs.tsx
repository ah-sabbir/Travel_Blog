"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import { CountryEntity } from "@/entities/country.entity";
import CountryArticles from "./country-articles";

interface Props {
  countries: CountryEntity[] | undefined;
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

const AllCountriesTabs: FC<Props> = ({ countries }): JSX.Element => {
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
            {countries?.map((country, index) => (
              <Tab
                label={country?.name || ""}
                {...a11yProps(index)}
                className="tab-heading "
                key={country._id.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {countries?.map((country, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            key={country._id.toString()}
          >
            <CountryArticles countryId={country._id.toString()} />
          </CustomTabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default AllCountriesTabs;
