import React from 'react';
import Header from "./Components/Header/Header";
import LinkInput from "./Components/LinkIpnut/LinkInput";
import ListOfSongs from "./Components/ListOfSongs/ListOfSongs";
import MusicPlayer from "./Components/MusicPlayer/MusicPlayer";
import Grid from "@material-ui/core/Grid";
import {useMediaQuery} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import songReducer from "./reducer";
import './index.css';


export const SongContext = React.createContext({
    song: {
        id: 'fd404e5d-ff64-4185-ad41-65a8e789efbc',
        title: 'Klingande & Bright Sparks - Messiah',
        artist: 'Klingande',
        url: 'https://soundcloud.com/klingande/klingande-messiah',
        duration: 184.283,
        thumbnail: 'https://i1.sndcdn.com/artworks-000493591659-o4jzay-t500x500.jpg'
    },
    isPlaying: false
})

function App() {
    const initialSongState = React.useContext(SongContext);
    const [state, dispatch] = React.useReducer(songReducer, initialSongState);
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

    return (
        <SongContext.Provider value={{state, dispatch}}>
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
                </Grid>
            </Grid>
        </SongContext.Provider>
    );
}

export default App;
