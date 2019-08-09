import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogAction from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
});

const databaseURL = "https://word-cloud-736df.firebaseio.com";

class Words extends React.Component {
  constructor() {
    super();
    this.state = {
      words: {},
      dialog: false,
      word: "",
      weight: ""
    };
  }
  _get() {
    fetch(`${databaseURL}/words.json`)
      .then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(words => this.setState({ words: words }));
  }
  _post(word) {
    return fetch(`${databaseURL}/words.json`, {
      method: "POST",
      body: JSON.stringify(word)
    })
      .then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        let nextState = this.state.words;
        nextState[data.name] = words;
        this.setState({ words: nextState });
      });
  }
  _delete(id) {
    return fetch(`${databaseURL}/words/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.state.words;
        delete nextState[id];
        this.setState({ words: nextState });
      });
  }

  componentDidMount() {
    this._get();
  }
  handleDialogToggle = () =>
    this.setState({
      dialog: !this.state.dialog
    });
  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  handleSubmit = () => {
    const word = {
      word: this.state.word,
      weight: this.state.weight
    };
    this.handleDialogToggle();
    if (!word.word && !word.weight) {
      return;
    }
    this._post(word);
  };
  handleDelete = id => {
    this._delete(id);
  };
  render() {
    return (
      <div>
        {Object.keys(this.state.words).map(id => {
          const word = this.state.words[id];
          return (
            <div key={id}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    가중치 : {word.weight}
                  </Typography>
                  <Grid container>
                    <Grid item xs={9}>
                      <Typography varient="h5" component="h2">
                        {word.word}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleDelete(id)}
                      >
                        삭제
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Words;
