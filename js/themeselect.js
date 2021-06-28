define(function (require) {

    return {

        Init: function (editor) {
            var themes    = [
                'ambiance', 'chaos', 'chrome', 'clouds', 'clouds_midnight', 'cobalt', 'crimson_editor', 'dawn', 'dracula',
                'dreamweaver', 'eclipse', 'github', 'gob', 'gruvbox', 'idle_fingers', 'iplastic', 'katzenmilch', 'kr_theme',
                'kuroir', 'merbivore', 'merbivore_soft', 'mono_industrial', 'monokai', 'pastel_on_dark', 'solarized_dark',
                'solarized_light', 'sqlserver', 'terminal', 'textmate', 'tomorrow', 'tomorrow_night', 'tomorrow_night_blue',
                'tomorrow_night_bright', 'tomorrow_night_eighties', 'twilight'
            ];
            var themeList = $("#themelist");
            themes.forEach(function (theme) {
                themeList.append($('<option>', {
                    text : theme,
                    value: theme
                }))
            });
            themeList.change(function () {
                editor.SetTheme(themeList.val())
            });
        }
    }
});