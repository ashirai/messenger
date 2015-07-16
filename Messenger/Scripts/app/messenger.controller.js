(function () {
    'use strict';

    angular.module('app', [])
        .controller('MessengerController', ['$scope', 'messenger', MessengerController]);

    function MessengerController($scope, messenger) {
        var vm = this;

        vm.activate = activate;
        vm.userImages = ['face1.jpg', 'face2.jpg', 'face3.jpg', 'face4.jpg'];
        vm.selectUser = selectUser;
        vm.isUserSelected = false;
        vm.selectedUserImage = 'face0.jpg';
        vm.messages = [];
        vm.newMessage = '';
        vm.sendMessage = sendMessage;

        activate();

        function activate() {
            onReceiveMessage();
            onStartConnection();
        }

        function onStartConnection() {
            $scope.$on('CONNECTION_STARTED', function (event, data) {
                console.log('SignalR connection started');
            });
        }

        function onReceiveMessage() {
            $scope.$on('MESSAGE_RECEIVED', function (event, data) {
                var bubbleDirection = (data.userImage === vm.selectedUserImage) ? "right" : "left";
                var isImageOnRight = (data.userImage === vm.selectedUserImage);
                var message = { userImage: data.userImage, message: data.message, bubbleDirection: bubbleDirection, isImageOnRight: isImageOnRight };
                vm.messages.push(message);
            });
        }

        function selectUser(userImage) {
            vm.selectedUserImage = userImage;
            vm.isUserSelected = true;
        }

        function sendMessage() {
            if (!vm.newMessage) return;
            messenger.sendMessage(vm.selectedUserImage, vm.newMessage);
            vm.newMessage = '';
        }
    }
})();
