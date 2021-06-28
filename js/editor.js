define(function (require) {

    return (function () {

        function Editor(options)
        {
            this.options = options;
            this.editor  = ace.edit('editor');
            this.editor.setTheme("ace/theme/ambiance");
            this.editor.setOptions({
                readOnly   : true,
                cursorStyle: "wide",
                fontSize   : 13
            });
            this.editor.session.setFoldStyle('manual');
            this.editor.session.setMode("ace/mode/c_cpp");
        }

        Editor.prototype.Run = function () {
            $("#editor")
                .keydown(this.onKeyDown.bind(this))
                .keypress(this.onKeyPress.bind(this))
                .focus();
        };

        Editor.prototype.Stop = function ()
        {
            $('#editor').unbind();
        };

        Editor.prototype.SetText = function (text) {
            this.text = text.replace(/\r/g, '');
            this.editor.setValue(this.text, -1);
            this.currentIndex = 0;
        };

        Editor.prototype.onKeyDown = function (e) {
            if (e.which === 9 || e.which === 13) // Tab || Enter
            {
                e.preventDefault();
                this.findNextCharacter();
            }
        };

        Editor.prototype.onKeyPress = function (e) {
            e.preventDefault();
            var key = String.fromCharCode(e.which);
            if (key === this.text[this.currentIndex])
            {
                this.currentIndex++;
                this.goToNextCharacter();
            }
            else
            {
                // Emit bad sound
            }
        };

        Editor.prototype.findNextCharacter = function () {
            while (
                this.currentIndex < this.text.length
                && (this.text[this.currentIndex] === '\t'
                    || this.text[this.currentIndex] === '\n'
                    || this.text[this.currentIndex] === ' '
                    || this.text[this.currentIndex] === '\r'
                    || this.text[this.currentIndex] === '\r\n')
                )
            {
                this.currentIndex++;
                this.goToNextCharacter()
            }
        };

        Editor.prototype.goToNextCharacter = function () {
            this.editor.selection.selectRight();
            this.options.onCursorChange(this.currentIndex / this.text.length);
        };

        Editor.prototype.SetTheme = function (theme) {
            this.editor.setTheme('ace/theme/' + theme)
        };

        return Editor;
    })();
});
