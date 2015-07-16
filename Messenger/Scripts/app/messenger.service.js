(function () {
    'use strict';

    angular.module('app')
        .factory('messenger', ['$rootScope', messenger]);

    function messenger($rootScope) {
        var messageHub = $.connection.messageHub;

        var service = {
            sendMessage: sendMessage
        };

        init();

        return service;

        function init() {
            startConnection();
            onReceiveMessage();
        }

        function startConnection() {
            $.connection.hub.start().done(function () {
                $rootScope.$broadcast('CONNECTION_STARTED', { data: 'Started' });
            });
        }

        function onReceiveMessage() {
            // Create a function that the hub can call to broadcast messages.
            messageHub.client.sendMessage = function (userImage, message) {
                var data = { userImage: userImage, message: message };
                $rootScope.$broadcast('MESSAGE_RECEIVED', data);
                $rootScope.$apply();
            };
        }

        function sendMessage(fromUserImage, fromMessage) {
            if (!fromMessage) return;
            // Call the SendMessage method on the hub.
            messageHub.server.sendMessage(fromUserImage, fromMessage);
        }
    }
})();