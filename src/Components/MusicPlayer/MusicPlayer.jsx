import React, {useState} from 'react';
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


const useStyles = makeStyles(theme=>({
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
    const [playToggle, setPlayToggle] = useState(false)

    let s = useStyles();
    const changeToggle = () => {
        setPlayToggle(!playToggle)
    }
    return (
        <>
            <Card variant={'outlined'} className={s.container}>
                <div className={s.details}>
                    <CardContent className={s.content}>
                        <Typography variant={'h5'} component={'h3'}>
                            Title
                        </Typography>
                        <Typography variant={'subtitle1'} component={'p'} color={'textSecondary'}>
                            Artist
                        </Typography>
                    </CardContent>
                    <div className={s.controls}>
                        <IconButton>
                            <SkipPreviousTwoToneIcon/>
                        </IconButton>

                        {playToggle
                            ? <IconButton onClick={changeToggle}>
                                <PlayArrowIcon className={s.playIcon}/>
                            </IconButton>
                            : <IconButton onClick={changeToggle}>
                                <StopIcon className={s.playIcon}/>
                            </IconButton>}

                        <IconButton>
                            <SkipNextIcon/>
                        </IconButton>

                        <Typography variant={'subtitle1'} component={'p'} color={'textSecondary'}>
                            00:01:30
                        </Typography>
                    </div>
                    <Slider type={'range'} min={0} max={1} step={0.01}/>
                </div>
                <CardMedia className={s.thumbnail} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZ81CMNbvEiAaErKt5Z1hY2muA8yhMib67qQ8hpRGKqdMkgq1y&usqp=CAU"}/>
            </Card>
        </>
    );
}

export default MusicPlayer;
