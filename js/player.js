define(function (require) {

    return (function () {

        function Player(playerID, playerName, randomID)
        {
            this.playerID   = playerID;
            this.playerName = playerName;
            this.randomID = randomID ? randomID : (Math.random() * 1e16).toFixed();
            this.addPlayerToDom();
        }

        Player.prototype.addPlayerToDom = function () {

            this.li = $('<li>');
            this.div = $('<div>', {
                class: 'one',
                id   : 'player_' + this.randomID
            }).append(
                //Append player title
                $('<div>', {
                    class: 'name',
                    text : this.playerName
                })

            ).append(
                // Append image
                $('<img>', {
                    src: 'images/player_' + this.playerID + '.png'
                })
            );

            this.li.append(this.div);

            $('.players').append(this.li);
        };

        Player.prototype.setPosition = function (position) {
            this.div.find('.name').html('<strong>' + position + '</strong> - ' + this.playerName);
        };

        Player.prototype.moveForward = function(percentage) {
            var playerWidth = this.div.width();
            var mapWidth    = this.li.width();
            this.div.css({"margin-left": (percentage * (mapWidth - playerWidth)) + 'px'});
        };

        Player.prototype.destroy = function()
        {
            this.li.remove();
        };

        return Player;
    })();
});