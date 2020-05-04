import React from 'react';
import Typography from "@material-ui/core/Typography";
import QueuedSong from "./QueuedSong";
import {Hidden} from "@material-ui/core";

const song = {
    title: "UNO",
    artist: "Little Big",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZ81CMNbvEiAaErKt5Z1hY2muA8yhMib67qQ8hpRGKqdMkgq1y&usqp=CAU"
}

function QueList() {
  return (
      <Hidden mdDown>
          <div style={{margin: '10px 0'}}>
              <Typography color={'textSecondary'} variant={'button'}>
                  QUEUE(5)
              </Typography>
              {Array.from({length: 5}, ()=>song).map((song,i)=>(
                  <QueuedSong key={i} song={song}/>
              ))}
          </div>
      </Hidden>
  );
}

export default QueList;
