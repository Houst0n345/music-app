import React from 'react';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {Delete} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useMutation} from "@apollo/react-hooks";
import {ADD_OR_REMOVE_FROM_QUEUE} from "../../graphql/mutations";
    

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
    const {thumbnail, artist, title} = song;
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue))
        }
    })

    let handleAddOrRemoveFromQueue = () => {
        // обработка добавления нужна или нет?
        addOrRemoveFromQueue({
                variables: {input: {...song, __typename: 'Song'}}
            }
        )
    }

    return (
         (<div className={s.container}>
            <Avatar src={thumbnail} alt={'Song thumbnail'} className={s.avatar}/>
            <div className={s.songInfoContainer}>
                <Typography variant={'subtitle2'} className={s.text}>
                    {title}
                </Typography>
                <Typography variant={'body2'} color={'textSecondary'}  className={s.text}>
                    {artist}
                </Typography>
            </div>
            <IconButton>
                <Delete color={'error'} onClick={handleAddOrRemoveFromQueue}/>
            </IconButton>
        </div>
        )
    );
}

export default QueuedSong;
