import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

// const theme = {background: "1D8549"};

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    ></Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      // backgroundColor: theme.palette.background.paper
    },
  };
});

export default function ProductListTab({ changeView, toggleMenu }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const theme = {
    background: "#1D8549",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    changeView(value);
  }, [value]);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          style={{
            root: {
              diplay: "inline",
            },
          }}
        >
          <Toolbar>
            <Button onClick={toggleMenu} variant="outlined">
              <MenuIcon />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="PRODUCT LIST" {...a11yProps(0)} />
              <Tab label="STORED" {...a11yProps(1)} />
              <Tab label="OVERVIEW" {...a11yProps(2)} />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
}

ProductListTab.propTypes = {
  changeView: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func,
};
