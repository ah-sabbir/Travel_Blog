import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="!font-arima"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div className="!font-arima">{children}</div>
        </Box>
      )}
    </div>
  );
}

export default CustomTabPanel;
