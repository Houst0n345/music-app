import React from 'react';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {Delete} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
    

const useStyles = makeStyles({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: "hidden"
    },
    container: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "50px auto 50px",
        gridGap: 12,
        alignItems: "center",
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
})

function QueuedSong({song}) {
    const s = useStyles();
    const {url, artist, title} = song;

    return (
         (<div className={s.container}>
            <Avatar src={url} alt={'Song thumbnail'} className={s.avatar}/>
            <div className={s.songInfoContainer}>
                <Typography variant={'subtitle2'} className={s.text}>
                    {title}
                </Typography>
                <Typography variant={'body2'} color={'textSecondary'}  className={s.text}>
                    {artist}
                </Typography>
            </div>
            <IconButton>
                <Delete color={'error'}/>
            </IconButton>
        </div>
        )
    );
}

export default QueuedSong;
