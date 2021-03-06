import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import { connect } from "react-redux";
import { deleteBuzz } from "../../redux/actions/dataActions";
//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: '10%'
  }
};

class DeleteBuzz extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleDelete = () => {
    this.props.deleteBuzz(this.props.buzzId);
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete buzz"
          onClick={this.handleOpen}
          btnClass={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm">
          <DialogTitle>Are your sure want to delete this buzz?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteBuzz.propTypes = {
  deleteBuzz: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  buzzId: PropTypes.string.isRequired
};

export default connect(null, { deleteBuzz })(withStyles(styles)(DeleteBuzz));
