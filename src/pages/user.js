import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Buzz from "../components/buzzes/Buzz";
import StaticProfile from "../components/profile/StaticProfile";
import BuzzSkeleton from "../utils/BuzzSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";
//mui
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    buzzIdParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const buzzId = this.props.match.params.buzzId;

    if (buzzId) this.setState({ buzzIdParam: buzzId });
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { buzzes, loading } = this.props.data;
    const { buzzIdParam } = this.state;
    const buzzesMarkup = loading ? (
      <BuzzSkeleton />
    ) : buzzes === null ? (
      <p> No buzzes for this user</p>
    ) : !buzzIdParam ? (
      buzzes.map(buzz => <Buzz key={buzz.buzzId} buzz={buzz} />)
    ) : (
      buzzes.map(buzz => {
        if (buzz.buzzId !== buzzIdParam)
          return <Buzz key={buzz.buzzId} buzz={buzz} />;
        else return <Buzz key={buzz.buzzId} buzz={buzz} openDialog />;
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {buzzesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
