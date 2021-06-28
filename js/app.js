define(function (require) {

    return (function () {

        function CodeRacer()
        {
            // Instantiate new editor
            this.editor = new (require('editor'))({
                onCursorChange: this.onCursorChange.bind(this)
            });

            // Init theme selection
            this.themeSelector = require('themeselect');
            this.themeSelector.Init(this.editor);

            // Players list
            this.playersList = [];
        }

        CodeRacer.prototype.Run = function () {

            // Create & append current player to players list
            this.currentPlayer = new (require('player'))(
                this.playersList.length,
                window.location.hash.substring(1)
            );

            this.playersList.push(this.currentPlayer);

            // Start Client
            this.client = new (require('client'))({
                info                    : {
                    id  : this.currentPlayer.randomID,
                    name: this.currentPlayer.playerName
                },
                onNewChallenger         : this.onNewChallenger.bind(this),
                onChallengerDisconnected: this.onChallengerDisconnected.bind(this),
                onTextCode              : this.onTextCode.bind(this),
                onCountDown             : this.onCountDown.bind(this),
                onPlayerMoved           : this.onPlayerMoved.bind(this),
                onPosition              : this.onPosition.bind(this),
                onRaceFinished          : this.onRaceFinished.bind(this)
            });
        };

        CodeRacer.prototype.onNewChallenger = function (challenger) {
            // Create & append challenger to players list
            this.currentPlayer = new (require('player'))(
                this.playersList.length,
                challenger.name,
                challenger.id
            );

            this.playersList.push(this.currentPlayer);
        };

        CodeRacer.prototype.onPlayerMoved = function (challenger) {
            for (var i = 0; i < this.playersList.length; i++)
            {
                if (this.playersList[i].randomID === challenger.id)
                    return this.playersList[i].moveForward(challenger.percentage);
            }
        };

        CodeRacer.prototype.onPosition = function (challenger) {
            for (var i = 0; i < this.playersList.length; i++)
            {
                if (this.playersList[i].randomID === challenger.id)
                    this.playersList[i].setPosition(challenger.position);
            }
        };

        CodeRacer.prototype.onRaceFinished = function () {
            $('#status').text('Race finished');
            this.client.close();
        };

        CodeRacer.prototype.onChallengerDisconnected = function (challenger) {
            for (var i = 0; i < this.playersList.length; i++)
            {
                if (this.playersList[i].randomID === challenger.id)
                {
                    this.playersList[i].destroy();
                    this.playersList.splice(i, 1);
                }
            }
        };

        CodeRacer.prototype.onCountDown = function (countDown) {
            if (countDown === "10")
            {
                $('#status').text('Go!');
                this.editor.Run();
            }
            else
            {
                $('#status').html('Get ready to race! <strong>' + countDown + '</strong>')
            }
        };

        CodeRacer.prototype.onTextCode = function (textCode) {
            this.editor.SetText(textCode);
        };

        CodeRacer.prototype.onCursorChange = function (percentage) {

            this.client.sendMovement(percentage);

            if (percentage === 1)
                this.editor.Stop();
        };

        return CodeRacer;

    })();
});