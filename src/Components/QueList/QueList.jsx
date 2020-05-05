import React from 'react';
import Typography from "@material-ui/core/Typography";
import QueuedSong from "./QueuedSong";
import {Hidden} from "@material-ui/core";



function QueList({queue}) {

  return (
      <Hidden mdDown>
          <div style={{margin: '10px 0'}}>
              <Typography color={'textSecondary'} variant={'button'}>
                  QUEUE({queue.length})
              </Typography>
              {queue.map((song,i)=>(
                  <QueuedSong key={i} song={song}/>
              ))}
          </div>
      </Hidden>
  );
}

export default QueList;
