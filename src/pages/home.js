import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Buzz from '../components/Buzz';
import Profile from '../components/Profile';

export default class Home extends Component {
    state = {
        buzzes: null
    }
    componentDidMount(){
        axios.get('/buzzes')
        .then(res =>{
            this.setState({
                buzzes: res.data
            })
        })
        .catch(err => console.log(err))
    }
    render() {
        let recentBuzzesMarkup = this.state.buzzes ? (
            this.state.buzzes.map(buzz => <Buzz key={buzz.buzzId} buzz={buzz}/>)
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
        )
    }
}
