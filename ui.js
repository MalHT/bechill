var ViewModel = function () {
    this.isPlaying = ko.observable(false);
};

ko.applyBindings(new ViewModel());