"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../custom-tab-panel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TicketEntity } from "@/entities/ticket.entity";
import TicketContent from "./ticket-content";
import TicketCTA from "./ticket-cta";
import BrandTickets from "./brand-tickets";
import CountryTickets from "./country-tickets";
import RegionTickets from "./region-tickets";
import SameTypeTickets from "./same-type-tickets";

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

interface Props {
  ticket: TicketEntity | undefined;
}

export default function TicketTabs({ ticket }: Props) {
  const [value, setValue] = React.useState(0);

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
            <Tab
              label={`Giới thiệu tổng quan`}
              {...a11yProps(0)}
              className="tab-heading "
            />
            <Tab
              label="Cùng thương hiệu"
              {...a11yProps(1)}
              className="tab-heading "
            />
            <Tab
              label="Cùng quốc gia"
              {...a11yProps(2)}
              className="tab-heading "
            />
            <Tab
              label="Cùng khu vực"
              {...a11yProps(3)}
              className="tab-heading "
            />
            <Tab
              label="Cùng danh mục vé"
              {...a11yProps(4)}
              className="tab-heading "
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="content flex gap-10 max-[1000px]:flex-col-reverse">
            <TicketContent content={ticket?.content} />
            <div className="flex-1 mt-4">
              <TicketCTA ticket={ticket} />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <BrandTickets
            ticketId={ticket?._id.toString()}
            brandId={ticket?.brand._id.toString()}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CountryTickets
            ticketId={ticket?._id.toString()}
            countryId={ticket?.country._id.toString()}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <RegionTickets
            ticketId={ticket?._id.toString()}
            regionId={ticket?.region._id.toString()}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <SameTypeTickets
            ticketId={ticket?._id.toString()}
            ticketTypeId={ticket?.ticketType._id.toString()}
          />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
