var ViewModel = function () {
    var self = this;

    self.status = ko.observable(currentStatus)
    
    self.isPlaying = ko.observable();
    self.currentSong = ko.computed(function () {
        return playlist[currentStatus.song].title;
    }, this);
    self.displayStartHostButton = ko.computed(function () {
        return !isCoordinator && !isConnectedAsClient;
    }, this);

    self.playButton = function () {
        self.isPlaying(!self.isPlaying());
        
        if(isCoordinator){
            currentStatus.playing = self.isPlaying();
            return 0;
        }
        
        var copy = copyObject(currentStatus);
        copy.playing = self.isPlaying();
        
        sendUpdatedMediaStatus(copy);
    };
};

ko.applyBindings(new ViewModel());