"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import { CategoryEntity } from "@/entities/category.entity";
import CategoryArticles from "./category-articles";

interface Props {
  categories: CategoryEntity[] | undefined;
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

const AllCategoriesTabs: FC<Props> = ({ categories }): JSX.Element => {
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
            scrollButtons="auto"
            variant="scrollable"
            aria-label="primary scrollable auto tabs example"
          >
            {categories?.map((category, index) => (
              <Tab
                label={category?.name || ""}
                {...a11yProps(index)}
                className="tab-heading "
                key={category._id.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {categories?.map((category, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            key={category._id.toString()}
          >
            <CategoryArticles categoryId={category._id.toString()} />
          </CustomTabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default AllCategoriesTabs;
