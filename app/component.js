var styles = require('./main.css');

module.exports = function () {
    var element = document.createElement('h1');
    element.className = styles.redButton;
    element.innerHTML = "Hello World";
    return element;
};
