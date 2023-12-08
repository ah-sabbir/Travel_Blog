"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import ArticleResults from "./article-results";

interface Props {
  query: string | null;
  setTotalResults: Dispatch<SetStateAction<number>>;
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

const SearchTabs: FC<Props> = ({ query, setTotalResults }): JSX.Element => {
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
            <Tab label="Bài viết" {...a11yProps(0)} className="tab-heading " />
            <Tab
              label="Thư viện ảnh"
              {...a11yProps(1)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ArticleResults query={query} setTotalResults={setTotalResults} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
        <CustomTabPanel value={value} index={2}></CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default SearchTabs;