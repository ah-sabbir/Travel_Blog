"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import { ArticleEntity } from "@/entities/article.entity";
import { GalleryEntity } from "@/entities/gallery.entity";
import ArticleCard from "../article-card";
import OtherInterests from "./other-interests";
import InterestDestinations from "./interest-destinations";

interface Props {
  articles: ArticleEntity[] | undefined;
  interestId: string | undefined;
  interestSlug: string | undefined;
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

const InterestTabs: FC<Props> = ({
  articles,
  interestId,
  interestSlug,
}): JSX.Element => {
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
            aria-label="primary tabs example"
            indicatorColor="secondary"
            textColor="secondary"
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
          {
            <>
              {articles && articles?.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                  {articles?.map((article) => (
                    <ArticleCard
                      key={article._id.toString()}
                      article={article}
                    />
                  ))}
                </div>
              ) : (
                <p>Chưa có bài viết nào</p>
              )}
            </>
          }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* {
            <>
              {galleries && galleries?.length > 0 ? (
                <div className="grid grid-cols-3 container gap-6">
                  {galleries?.map((article) => (
                    <GalleryCard
                      key={article._id.toString()}
                      gallery={gallery}
                    />
                  ))}
                </div>
              ) : (
                <p>Chưa có bài viết nào</p>
              )}
            </>
          } */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <InterestDestinations slug={interestSlug} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <OtherInterests currentId={interestId} />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default InterestTabs;
