import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = theme => ({
  button: {
    // color: "red"
  }
});

class Timestamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowTime: ""
    };
    this._getTime = this._getTime.bind(this);
  }

  _getTime() {
    const n = new Date();
    const nowHourMinute = n.getHours() + ` : ` + n.getMinutes() + ` : `;
    const seconds = n.getSeconds() < 10 ? "0" + n.getSeconds() : n.getSeconds();
    const nowTime = nowHourMinute + seconds;
    this.setState({
      nowTime: nowTime
    });
  }

  componentDidMount() {
    this._getTime();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" className={classes.button}>
          {this.state.nowTime} 기록하기
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this._getTime}
        >
          <RefreshIcon className={classes.icon} />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Timestamp);
