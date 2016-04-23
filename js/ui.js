var ViewModel = function () {
    var self = this;

    self.isPlaying = ko.observable(currentStatus.playing);
    self.currentSong = ko.computed(function () {
        return playlist[currentStatus.song].title;
    }, this);
    self.displayStartHostButton = ko.computed(function () {
        return !isCoordinator && !isConnectedAsClient;
    }, this);

    self.playButton = function () {
        self.isPlaying(!self.isPlaying());

        var copy = copyObject(currentStatus);
        copy.playing = self.isPlaying();
        
        sendUpdatedMediaStatus(copy);
    };

    self.startCoordinator = function () {
        startCoordinator();
    };
};

ko.applyBindings(new ViewModel());