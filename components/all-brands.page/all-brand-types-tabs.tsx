"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import { BrandTypeEntity } from "@/entities/brandType.entity";
import SameTypeBrands from "../brand-page/same-type-brands";

interface Props {
  brandTypes: BrandTypeEntity[] | undefined;
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

const AllBrandTypesTabs: FC<Props> = ({ brandTypes }): JSX.Element => {
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
            {brandTypes?.map((brandType, index) => (
              <Tab
                label={brandType?.name || ""}
                {...a11yProps(index)}
                className="tab-heading "
                key={brandType._id.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {brandTypes?.map((brandType, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            key={brandType._id.toString()}
          >
            <SameTypeBrands brandId="" brandTypeId={brandType._id.toString()} />
          </CustomTabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default AllBrandTypesTabs;
