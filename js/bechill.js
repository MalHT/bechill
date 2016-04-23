var apikey = "pcylravfak1kbj4i";

//var peer = new Peer(prompt("Your ID"), {key: apikey});
var peer = new Peer({
    key: apikey
});

// Start a new server/host
var startCoordinator = function () {

    peer.on('connection', function (conn) {
        conn.on('data', function (data) {
            
            console.log(data);
            
        });
    });

};

// Connect to a server/host by its id
var connectCoordinator = function (serverid) {

    var conn = peer.connect(serverid);

    conn.on('open', function () {
        conn.send('hi!');
    });

}

if (window.location.hash.startsWith("#room:")) {

    var serverid = window.location.hash.substr(6);

    connectCoordinator(serverid);

}