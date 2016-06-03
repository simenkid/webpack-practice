var styles = require('./a.css'),
    styles2 = require('./b.css');

module.exports = function () {
    var element = document.createElement('h1');
    element.className = styles.redButton + ' ' + styles2.deco;
    element.innerHTML = "Hello World";
    return element;
};
