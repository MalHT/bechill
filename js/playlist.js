// List of songs
var playlist = [
    {title: "Song Title", youtube_src: "baSe64/Id"},
    {title: "Song Title 2", youtube_src: "baSe64/Id"}
]

// Status of currently playing song
var currentStatus = {
    song: 0,      // reference to currently playing song in playlist
    position: 60000,        // timestamp in ms
    playing: false           // play | pause
}