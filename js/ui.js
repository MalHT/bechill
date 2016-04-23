var ViewModel = function () {
    var self = this;
    
    self.isPlaying = ko.observable(false);
    self.currentSongName = ko.observable("none");
    
    self.togglePlayPause = function () {
        self.isPlaying(!self.isPlaying());
    };
};

ko.applyBindings(new ViewModel());