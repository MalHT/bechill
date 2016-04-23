// Status of currently playing song
var status = {
    song: playlist[0],      // reference to currently playing song in playlist
    position: 60000,        // timestamp in ms
    state: "play"           // play | pause
}

// List of songs
var playlist = {
    {title: "Song Title", youtube_src="baSe64/Id"},
    {title: "Song Title II", youtube_src="baSe64/Id"}
}