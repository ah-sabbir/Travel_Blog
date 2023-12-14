"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import { ArticleEntity } from "@/entities/article.entity";
import { GalleryEntity } from "@/entities/gallery.entity";
import ArticleCard from "../article-card";
import OtherCategories from "./other-categories";
import CategoryArticles from "../all-categories-page/category-articles";
import CategoryGalleries from "./category-galleries";

interface Props {
  categoryId: string | undefined;
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

const CategoryTabs: FC<Props> = ({ categoryId }): JSX.Element => {
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
            <Tab label="Bài viết" {...a11yProps(0)} className="tab-heading " />
            <Tab
              label="Thư viện ảnh"
              {...a11yProps(1)}
              className="tab-heading "
            />
            <Tab
              label="Danh mục khác"
              {...a11yProps(2)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <CategoryArticles categoryId={categoryId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CategoryGalleries categoryId={categoryId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <OtherCategories currentId={categoryId} />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default CategoryTabs;
