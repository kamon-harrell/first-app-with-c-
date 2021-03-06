﻿var ViewModel = function () {
    var self = this;
    self.plants = ko.observableArray();
    self.error = ko.observable();
    self.newPlant = {
        Id: ko.observable(),
        Name: ko.observable(),
        Description: ko.observable(),
        Price: ko.observable(),
        Harvest: ko.observable(),
        Space: ko.observable(),
        Water: ko.observable(),
        Germination: ko.observable()
    };

    var plantsUri = '/api/Plants/';


    function getAllPlants() {
        $.ajax(plantsUri, 'GET').done(function (data) {
            self.plants(data);
        });
    }

    self.addPlant = function (formElement, data) {
        var plant = {
            Id: self.newPlant.Id(),
            Name: self.newPlant.Name(),
            Description: self.newPlant.Description(),
            Price: self.newPlant.Price(),
            Harvest: self.newPlant.Harvest(),
            Space: self.newPlant.Space(),
            Water: self.newPlant.Water(),
            Germination: self.newPlant.Germination()
        };

        $.ajax({
            type: 'POST',
            url: plantsUri,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    };

    // Fetch the initial data.
    getAllPlants();
};

ko.applyBindings(new ViewModel());