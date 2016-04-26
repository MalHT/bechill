var apikey = "pcylravfak1kbj4i";

var copyObject = function (thing) {
    return JSON.parse(JSON.stringify(thing));
};

var peer = new Peer({
    key: apikey
});

if (window.location.hash.startsWith("#room:")) {

    var serverid = window.location.hash.substr(6);

    connectCoordinator(serverid);

}

var isCoordinator = false;
var isConnectedAsClient = false;

/// SERVER SPECIFIC ///

var connectedPeers = [];

// Start a new server/host
var startCoordinator = function () {

    console.log("Starting coordinator...");
    
    prompt("Your Peer ID:", peer.id);
    
    isCoordinator = true;
    
    peer.on('connection', function (conn) {
        
        conn.on('data', function (data) {
            
            if (data.msg === "join") {

                connectedPeers.push(conn);
                
                conn.send(getPlaylist());
                conn.send(getMediaStatus());
                
            }
            
            if (data.msg === "mediastatus") {

                var updatedStatus = JSON.parse(JSON.stringify(data));
                
                delete updatedStatus.msg;
                
                currentStatus = updatedStatus;
                
            }
            
            if (data.msg === "playlist") {
                
                var updatedPlaylist = JSON.parse(JSON.stringify(data));
                
                delete data.msg;
                
                playlist = updatedPlaylist;
                
                
                
            }
            
            console.log(data);
            
        });
        
    });
    
    // Send updated media status every 5 seconds
    window.setInterval(function() {
    
        broadcastPeers(getMediaStatus());
        
    }, TIME_STEP);

};

// Broadcast a message to all registered peers
var broadcastPeers = function (message) {
    
    connectedPeers.forEach(function (connectedPeer) {
       
        connectedPeer.send(message);
        
    });
    
};

var getMediaStatus = function () {
    
    var message = JSON.parse(JSON.stringify(currentStatus));
    
    message.msg = "mediastatus";
    
    message.currenttime = Date.now();
    
//    broadcastPeers(message);
    
    return message;
    
}

var getPlaylist = function () {
    
    var message = JSON.parse(JSON.stringify(playlist));
    
    message.msg = "playlist";
    
//    broadcastPeers(message);
    
    return message;
    
}

