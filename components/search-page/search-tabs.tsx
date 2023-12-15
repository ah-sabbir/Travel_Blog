"use client";

import { Box, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import ArticleResults from "./article-results";
import GalleryResults from "./gallery-results";
import TicketResults from "./ticket-results";

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
      <Box sx={{ width: "100%" }} className="container">
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
            <Tab
              label="Vé / Tour du lịch"
              {...a11yProps(2)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ArticleResults query={query} setTotalResults={setTotalResults} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <GalleryResults query={query} setTotalResults={setTotalResults} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TicketResults query={query} setTotalResults={setTotalResults} />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default SearchTabs;
