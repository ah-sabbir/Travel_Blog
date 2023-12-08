"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import { BrandEntity } from "@/entities/brand.entity";
import BrandTickets from "../ticket-page/brand-tickets";

interface Props {
  brands: BrandEntity[] | undefined;
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

const AllBrandsTabs: FC<Props> = ({ brands }): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mx: "16px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            variant="scrollable"
            textColor="secondary"
            scrollButtons="auto"
            aria-label="primary scrollable auto tabs example"
          >
            {brands?.map((brand, index) => (
              <Tab
                label={brand?.name || ""}
                {...a11yProps(index)}
                className="tab-heading "
                key={brand._id.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {brands?.map((brand, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            key={brand._id.toString()}
          >
            <BrandTickets brandId={brand._id.toString()} ticketId="" />
          </CustomTabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default AllBrandsTabs;
