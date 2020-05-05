import React, {useEffect, useRef, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Slider from "@material-ui/core/Slider";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
import {SongContext} from "../../App";
import QueList from "../QueList/QueList";
import {GET_QUEUE_SONGS} from "../../graphql/queries";
import {useQuery} from "@apollo/react-hooks";
import ReactPlayer from "react-player";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 15px'
    },
    content: {
        flex: '1 0 auto'
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    }
}))


function MusicPlayer() {
    const {state, dispatch} = React.useContext(SongContext)
    const {data} = useQuery(GET_QUEUE_SONGS)
    const [played, setPlayed] = useState(0)
    const [seeking, setSeeking] = useState(false)
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [positionInQueue, setPositionInQueue] = useState(0)
    const reactPlayerRef = useRef();

    useEffect(() => {
        const songIndex =  data.queue.findIndex((song)=> song.id === state.song.id)
        setPositionInQueue(songIndex)
    }, [state.song.id, data.queue])

    useEffect(() => {
        const nextSong =  data.queue[positionInQueue + 1]
        if(played >= 0.99 && nextSong){
            setPlayed(0)
            dispatch({type: "SET_SONG", song: nextSong})
        }
    }, [state.song.id, data.queue, played, dispatch, positionInQueue])

    let s = useStyles();
    const changeToggle = () => {
        dispatch(state.isPlaying ? {type: "STOP_SONG"} : {type: "PLAY_SONG"})
    }

    let handleProgressChange = (event, newValue) => {
        setPlayed(newValue)
    }

    let handleSeekMouseDown = () => {
        setSeeking(true)
    }
    let handleSeekMouseUp = () => {
        setSeeking(false)
        reactPlayerRef.current.seekTo(played)
    }
    let formatDuration = (seconds) => {
        return new Date(seconds * 1000).toISOString().substr(11, 8)
    }
    let handlePlayNextSong = () => {
        const nextSong =  data.queue[positionInQueue + 1]
        if(nextSong){
            dispatch({type: "SET_SONG", song: nextSong})
        }
    }
    let handlePlayPrevSong = () => {
        const prevSong =  data.queue[positionInQueue - 1]
        if(prevSong){
            dispatch({type: "SET_SONG", song: prevSong})
        }
    }


    return (
        <>
            <Card variant={'outlined'} className={s.container}>
                <div className={s.details}>
                    <CardContent className={s.content}>
                        <Typography variant={'h5'} component={'h3'}>
                            {state.song.title}
                        </Typography>
                        <Typography variant={'subtitle1'} component={'p'} color={'textSecondary'}>
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className={s.controls}>
                        <IconButton onClick={handlePlayPrevSong}>
                            <SkipPreviousTwoToneIcon/>
                        </IconButton>

                        {state.isPlaying
                            ? <IconButton onClick={changeToggle}>
                                <StopIcon className={s.playIcon}/>
                            </IconButton>
                            : <IconButton onClick={changeToggle}>
                                <PlayArrowIcon className={s.playIcon}/>
                            </IconButton>}


                        <IconButton onClick={handlePlayNextSong}>
                            <SkipNextIcon/>
                        </IconButton>

                        <Typography variant={'subtitle1'} component={'p'} color={'textSecondary'}>
                            {formatDuration(playedSeconds)}
                        </Typography>
                    </div>
                    <Slider
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        onChange={handleProgressChange}
                        value={played} type={'range'} min={0} max={1} step={0.01}/>
                </div>
                <ReactPlayer
                    hidden url={state.song.url} playing={state.isPlaying} ref={reactPlayerRef}
                    onProgress={({played, playedSeconds}) => {
                        setPlayed(played)
                        if(!seeking){
                            setPlayed(played)
                            setPlayedSeconds(playedSeconds)
                        }
                    }}
                />
                <CardMedia className={s.thumbnail} image={state.song.thumbnail}/>
            </Card>
            <QueList queue={data.queue}/>
        </>
    );
}

export default MusicPlayer;
