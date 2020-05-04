import React from 'react';
import {Card} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveAltTwoToneIcon from '@material-ui/icons/SaveAltTwoTone';
import {makeStyles} from "@material-ui/core/styles";



const useStyle = makeStyles(theme=>({
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
    const s = useStyle();
    const {thumbnail, title, artist} = song;
    return (
        <Card className={s.container}>
            <div className={s.songInfoContainer}>
                <CardMedia image={thumbnail} className={s.thumbnail} />
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
                        <IconButton size={'small'} color={'primary'}>
                            <PlayArrowIcon/>
                        </IconButton>
                        <IconButton size={'small'} color={'secondary'}>
                            <SaveAltTwoToneIcon/>
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    );
}

export default Song;
