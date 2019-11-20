import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getBuzzes } from '../redux/actions/dataActions';

import Buzz from '../components/buzzes/Buzz';
import Profile from '../components/profile/Profile';

class Home extends Component {
    componentDidMount(){
        this.props.getBuzzes();
    }
    render() {
        const { buzzes, loading } = this.props.data;
        let recentBuzzesMarkup = !loading ? (
            buzzes.map(buzz => <Buzz key={buzz.buzzId} buzz={buzz}/>)
        ): <p>Loading...</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentBuzzesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

Home.propTypes = {
    getBuzzes: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getBuzzes })(Home);