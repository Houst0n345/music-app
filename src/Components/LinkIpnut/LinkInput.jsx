import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import { InputAdornment} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import LinkIcon from '@material-ui/icons/Link';
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {makeStyles} from "@material-ui/styles";
import ReactPlayer from "react-player";
import {useMutation} from "@apollo/react-hooks";
import {ADD_SONG} from "../../graphql/mutations";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAline: 'center'
    },
    thumbnail: {
        width: '90%'
    }
}))

const INTIAL_SONG_VALUE = {
    duration: 0,
    title: '',
    artist: '',
    thumbnail: '',
    url: ''
}

function LinkInput() {
    const [modal, setModal] = useState(false);
    const [url, setUrl] = useState('');
    const [playable, setPlayable] = useState(false);
    const [song, setSong] = useState(INTIAL_SONG_VALUE);
    const [addSong, {error}] = useMutation(ADD_SONG);
    const s = useStyles()

    let setClose =  () => {
        setModal(false)
    }
    let submitSong = async () => {
        try {
            let {duration, title, artist, thumbnail, url} = song
            await addSong({
                variables: {
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    url: url.length > 0 ? url : null
                }
            })
            setSong(INTIAL_SONG_VALUE);
            setClose();
        } catch (e) {
            console.log('error', e)
        }
    }

    async function handleEditSong({player}) {
        setPlayable(true)
        let nestedPlayer = player.player.player;
        let songData;
        if (nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer)
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloudInfo(nestedPlayer)
        }
        setSong({...songData, url})
    }

    let changeInputs = (e) => {
        const {name, value} = e.target
        setSong(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    let getYoutubeInfo = (player) => {
        const duration = player.getDuration()
        const {title, video_id, author} = player.getVideoData();
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
        return {duration, title, artist: author, thumbnail}
    }
    let getSoundCloudInfo = (player) => {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000),
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }
    const handleError = (field) => {
        return error?.graphQLErrors[0]?.extensions?.path.includes(field)
    }

    const {title, artist, thumbnail} = song;
    return (
        <div className={s.container}>
            <Dialog open={modal} onClose={setClose} className={s.dialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img src={thumbnail} alt="Song thumbnail" className={s.thumbnail}/>
                    <TextField value={title} margin={'dense'} name={'title'} label={'Title'} onChange={changeInputs}
                               fullWidth error={handleError('title')}
                               helperText={handleError('title') && 'Fill out field'}/>
                    <TextField value={artist} margin={'dense'} name={'artist'} label={'Artist'} onChange={changeInputs}
                               fullWidth error={handleError('artist')}
                               helperText={handleError('artist') && 'Fill out field'}/>
                    <TextField value={thumbnail} margin={'dense'} name={'thumbnail'} label={'Thumbnail'}
                               onChange={changeInputs} fullWidth error={handleError('thumbnail')}
                               helperText={handleError('thumbnail') && 'Fill out field'}/>
                </DialogContent>
                <DialogActions>
                    <Button color={'secondary'} onClick={setClose}>
                        Cancel
                    </Button>
                    <Button color={'primary'} onClick={submitSong} variant={'outlined'}>
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                onChange={(e) => {
                    setPlayable(false)
                    setUrl(e.target.value)
                }}
                value={url}
                className={s.urlInput}
                placeholder={'Add your Youtube or SoundCloud url'}
                fullWidth
                margin={'normal'}
                type='url'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LinkIcon/>
                        </InputAdornment>

                    )
                }}/>
            <Button onClick={() => setModal(true)}
                    disabled={!playable}
                    className={s.addSongButton}
                    variant={"contained"}
                    color={'primary'}
                    endIcon={<AddBoxOutlined/>}>
                Add
            </Button>
            <ReactPlayer url={url} hidden onReady={(e) => handleEditSong(e)}/>
        </div>
    );
}

export default LinkInput;
