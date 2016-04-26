var ViewModel = function () {
    var self = this;

    self.status = ko.observable(currentStatus)
    self.showMainPage = ko.observable(true);
    self.isPlaying = ko.observable(false);
    self.currentSong = ko.computed(function () {
        return playlist[currentStatus.song].title;
    }, this);

    self.displayStartHostButton = ko.observable(true);
    self.displayJoinRoomButton = ko.observable(true);
    
    self.peerId = ko.observable('');

    self.playButton = function () {
        self.isPlaying(!self.isPlaying());

        if (isCoordinator) {
            currentStatus.playing = self.isPlaying();
            return 0;
        }

        var copy = copyObject(currentStatus);
        copy.playing = self.isPlaying();

        sendUpdatedMediaStatus(copy);
    };

    self.startHostButton = function () {
        startCoordinator();
        self.showButtons(false);
        self.peerId(peer.id);
    };
    
    self.joinRoomButton = function () {
        var id = self.peerId();
        
        connectCoordinator(id);
        
        self.showButtons(false);
    }
    
    self.showButtons = function (show) {
        self.displayJoinRoomButton(show);
        self.displayStartHostButton(show);
    }
};

ko.applyBindings(new ViewModel());