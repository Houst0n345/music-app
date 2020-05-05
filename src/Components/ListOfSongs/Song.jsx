import React, {useEffect, useState} from 'react';
import {Card} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';
import {makeStyles} from "@material-ui/core/styles";
import {SongContext} from "../../App";
import StopIcon from "@material-ui/icons/Stop";
import {useMutation} from "@apollo/react-hooks";
import {ADD_OR_REMOVE_FROM_QUEUE} from "../../graphql/mutations";


const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(3)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}))

function Song({song}) {
    const [songPlaying, setSongPlaying] = useState(false);
    const {thumbnail, title, artist, id} = song;
    const {state, dispatch} = React.useContext(SongContext);
    const s = useStyle();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue))
        }
    })

    useEffect(() => {
        const playing = state.isPlaying && id === state.song.id;
        setSongPlaying(playing)
    }, [id, state.song.id, state.isPlaying])

    let changeToggle = () => {
        dispatch({type: "SET_SONG", song})
        dispatch(songPlaying ? {type: "STOP_SONG"} : {type: "PLAY_SONG"})
    }

    let handleAddOrRemoveFromQueue = () => {
        // обработка добавления нужна или нет?
        addOrRemoveFromQueue({
                variables: {input: {...song, __typename: 'Song'}}
            }
        )
    }

    return (
        <Card className={s.container}>
            <div className={s.songInfoContainer}>
                <CardMedia image={thumbnail} className={s.thumbnail}/>
                <div className={s.songInfo}>
                    <CardContent>
                        <Typography gutterBottom variant={'h5'} component={'h2'}>
                            {title}
                        </Typography>
                        <Typography gutterBottom variant={'body1'} component={'p'} color={'textSecondary'}>
                            {artist}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {songPlaying
                            ? <IconButton onClick={changeToggle} size={'small'} color={'primary'}>
                                <StopIcon/>
                            </IconButton>
                            : <IconButton onClick={changeToggle} size={'small'} color={'primary'}>
                                <PlayArrowIcon/>
                            </IconButton>}
                        <IconButton size={'small'} color={'secondary'} onClick={handleAddOrRemoveFromQueue}>
                            <SaveAltTwoToneIcon/>
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    );
}

export default Song;
