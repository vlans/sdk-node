const xhr = (config) => {
    return `
        var xhr = null;
        if (w.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (w.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var send = function (data) {
            xhr.open('POST', '${config.url}', true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data)
        }
    `
}

module.exports = xhr
