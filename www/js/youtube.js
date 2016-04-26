var youtube = {};

// Create YouTube player iframe
youtube.player;

function onYouTubeIframeAPIReady() {
    youtube.player = new YT.Player('youtube-player', {
        height: '390',
        width: '640',
//        videoId: 'M7lc1UVf-VE',
//        events: {
//            'onReady': onPlayerReady,
//            'onStateChange': onPlayerStateChange
//        }
    });
}

/* Wrapper functions for player manipulation */

// Set playing YouTube video (takes video ID)
youtube.setMedia = function (id) {
    
    // Load video into player, with preference for "large" quality
    player.loadVideoById(id, 0, "large");
    
};

// Play (i.e. unpause) current YouTube video
youtube.playMedia = function () {
    
    player.playVideo();
    
};

// Pause currently playing YouTube video
youtube.pauseMedia = function () {
    
    player.pauseVideo();
    
};

youtube.setTimestamp = function (timestamp) {
    
    // seek to specified number of seconds
    player.seekTo(timestamp, true);
    
};

youtube.getTimestamp = function () {
    
    return player.getCurrentTime();
    
}