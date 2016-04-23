var apikey = "pcylravfak1kbj4i";

var peer = new Peer(prompt("Your ID"), {key: apikey}); 

var conn = peer.connect(prompt("Connect to"));
conn.on('open', function(){
  conn.send('hi!');
});

peer.on('connection', function(conn) {
  conn.on('data', function(data){
    // Will print 'hi!'
    console.log(data);
  });
});