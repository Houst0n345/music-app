import React from 'react';
import Header from "./Components/Header/Header";
import LinkInput from "./Components/LinkIpnut/LinkInput";
import ListOfSongs from "./Components/ListOfSongs/ListOfSongs";
import MusicPlayer from "./Components/MusicPlayer/MusicPlayer";
import QueList from "./Components/QueList/QueList";
import Grid from "@material-ui/core/Grid";
import {useMediaQuery} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";


function App() {
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

    return (
        <>
            <Hidden only={'xs'}>
                <Header/>
            </Hidden>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7} style={{
                    paddingTop: greaterThanSm ? 80 : 10
                }}>
                    <LinkInput/>
                    <ListOfSongs/>
                </Grid>
                <Grid item xs={12} md={5} style={
                    greaterThanMd ? {
                        position: 'fixed',
                        width: '100%',
                        right: 0,
                        top: 70
                    } : {
                        position: 'fixed',
                        width: '100%',
                        left: 0,
                        bottom: 0
                    }}>
                    <MusicPlayer/>
                    <QueList/>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
