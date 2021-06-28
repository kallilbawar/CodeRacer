requirejs.config({
    baseUrl: 'js',
    paths  : {
        ace: 'ace'
    }
});

requirejs([
    'app',
    'player',
    'client',
    'ace/ace',
    'jquery',
    'themeselect',
    'editor'
], function (app) {

    var appInstance = new app();

    appInstance.Run();
});
