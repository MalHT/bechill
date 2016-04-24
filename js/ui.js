var ViewModel = function () {
    var self = this;

    self.status = ko.observable(currentStatus)

    self.isPlaying = ko.observable(false);
    self.currentSong = ko.computed(function () {
        return playlist[currentStatus.song].title;
    }, this);

    self.displayStartHostButton = ko.observable(true);
    self.peerId = ko.observable("");

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
        self.displayStartHostButton(false);
        self.peerId(peer.id);
    };
};

ko.applyBindings(new ViewModel());