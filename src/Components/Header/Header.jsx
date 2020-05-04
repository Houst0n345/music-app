import React from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import {makeStyles} from "@material-ui/core/styles";



const useStyles = makeStyles(theme=>({
    title: {
        paddingLeft: theme.spacing(2)
    }
}));


function Header() {
    const s = useStyles();
  return (
    <AppBar position={'fixed'} color={'primary'}>
        <Toolbar>
            <MusicNoteIcon/>
            <Typography variant={'h6'} component={'h1'} className={s.title}>
                Apollo Music Share
            </Typography>
        </Toolbar>
    </AppBar>
  );
}

export default Header;
