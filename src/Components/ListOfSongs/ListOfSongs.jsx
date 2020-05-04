import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import Song from "./Song";
import {useSubscription} from "@apollo/react-hooks";
import {GET_SONGS} from "../../graphql/subscriptions";



function ListOfSongs() {
  const {data, loading, error} = useSubscription(GET_SONGS);

  if(loading){
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 50
        }}>
            <CircularProgress color={'primary'}/>
        </div>
    )
  }
  if(error){
      return <div>Error fetching songs</div>
  }
  return (
    <div >
        {data.songs.map((song)=>(
            <Song key={song.id} song={song}/>
        ))}
    </div>
  );
}

export default ListOfSongs;
