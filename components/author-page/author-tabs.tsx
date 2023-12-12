"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { FC, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import AuthorArticles from "./author-articles";
import AuthorGalleries from "./author-galleries";

interface Props {
  authorId: string | undefined;
  numberOfArticles: number | undefined;
  numberOfGalleries: number | undefined;
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

const AuthorTabs: FC<Props> = ({
  authorId,
  numberOfArticles,
  numberOfGalleries,
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
            centered
          >
            <Tab
              label={`Bài viết (${numberOfArticles})`}
              {...a11yProps(0)}
              className="tab-heading "
            />
            <Tab
              label={`Thư viện ảnh (${numberOfGalleries})`}
              {...a11yProps(1)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AuthorArticles userId={authorId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AuthorGalleries userId={authorId} />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default AuthorTabs;
