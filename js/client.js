define(function(require){

    return (function() {

        function Client(options)
        {
            this.ws = new WebSocket("ws://localhost:7777");
            this.options = options;
            this.ws.onopen = this.onConnected.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onclose = this.onDisconnected.bind(this);
            this.ws.onerror = this.onError.bind(this);
        }

        Client.prototype.onConnected = function()
        {
            this.ws.send(JSON.stringify({
                type: 'info',
                data : this.options.info
            }));
        };

        Client.prototype.onMessage = function(event)
        {
            var obj = JSON.parse(event.data);
            switch (obj.event)
            {
                case 'challenger_connected':
                    this.options.onNewChallenger(obj.data);
                    break;

                case 'challenger_disconnected':
                    this.options.onChallengerDisconnected(obj.data);
                    break;

                case 'text_code':
                    this.options.onTextCode(obj.data);
                    break;

                case 'movement':
                    this.options.onPlayerMoved(obj.data);
                    break;

                case 'position':
                    this.options.onPosition(obj.data);
                    break;

                case 'race_finished':
                    this.options.onRaceFinished();
                    break;

                case 'countdown':
                    this.options.onCountDown(obj.data);
                    break;
            }
        };

        Client.prototype.sendMovement = function(percentage)
        {
            this.ws.send(JSON.stringify({
                type: 'movement',
                data : percentage
            }))
        };

        Client.prototype.close = function()
        {
            this.ws.close();
        };

        Client.prototype.onError = function(error)
        {
            alert(JSON.stringify(error));
            console.error(error);
        };

        Client.prototype.onDisconnected = function()
        {
            console.log('Disconnected........');
        };

        return Client;
    })();
});
