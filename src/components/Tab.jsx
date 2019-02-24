import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  console.log(props)
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});




class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
    const { value } = this.state 
    const { displayProducts } = this.props;
    console.log(value)
    const sizeObj = {
      0: 'small',
      1: 'big',
      2: 'giant' 
    }
    displayProducts(sizeObj[value])
    }
  }

  handleChange = (event, value) => {
    console.log(event.target)
    this.setState({ value });
  };

  render() {
    const { classes, displayProducts } = this.props;
    const { value } = this.state;
console.log(this.props)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Small Bales" />
            <Tab label="Big Bales" />
            <Tab label="Giant Bales" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer value="small" ></TabContainer>}
        {value === 1 && <TabContainer value="big"  ></TabContainer>}
        {value === 2 && <TabContainer value="giant"  ></TabContainer>}
      </div>
    );
  }


}



export default withStyles(styles)(SimpleTabs)