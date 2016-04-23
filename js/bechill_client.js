var coordinator;

// Connect to a server/host by its id
var connectCoordinator = function (serverid) {

    isConnectedAsClient = true;
    
    coordinator = peer.connect(serverid);

    coordinator.on('open', function () {
        
        coordinator.send({msg: "join"});
        
        coordinator.on('data', function (data) {
            
            if (data.msg === "mediastatus") {
                
                var updatedStatus = JSON.parse(JSON.stringify(data));
                
                delete updatedStatus.msg;
                
                delete updatedStatus.currenttime;
                
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

};

var sendUpdatedMediaStatus = function (message) {
    
    message.msg = "updatemediastatus";
    
    coordinator.send(message);
    
};

var sendUpdatedPlaylist = function (message) {
    
    message.msg = "updateplaylist";
    
    coordinator.send(message);
    
}

/*

    {msg: "join"} - Join message
    
    "mediastatus" - details about current playlist item - playing/paused, and source
    
    "playlist" - entire playlist array, send upon update of playlist
    
    
    
    "additem" - item to add to playlist, from client to coordinator
    
    
    

{msg: "mediastatus", state: "play", current: 1, mediatimestamp: 60000}

* Already a playlist created with a video playing

* Client joins
  -- Sends "join" to coodinator
  -- Coordinator sends playlist to this client
  -- Coordinator sends mediastatus to this client


* Video played or paused
  -- Coordinator sends mediastatus with state set to play/pause to all clients

* Video added to playlist
  -- Coordinator sends updated playlist object to all clients
  
* Next video plays
  -- Coordinator sends updated mediastatus with new pointer to playlist item
  
* Client adds video to playlist
  -- Client sends "additem"
  
* Client plays, pauses or changes video (skip etc)



*/