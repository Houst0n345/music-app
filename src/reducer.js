function songReducer(state, action) {
    debugger;
    switch (action.type) {
        case "PLAY_SONG":
            return {
                ...state,
                isPlaying: true
            }
        case "STOP_SONG":
            return {
                ...state,
                isPlaying: false
            }
        case "SET_SONG":
            return {
                ...state,
                song: action.song
            }
        default:
            return state;
    }
}

export default songReducer;