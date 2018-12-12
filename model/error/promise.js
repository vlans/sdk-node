const promiseError = () => {
    return `
        if (typeof Promise !== 'undefined' && Promise === 'function' && /native code/.test(Promise.toString())) {
            w.onunhandledrejection = function (e) {
                var data = collection(e);
                send(data);
            }
            w.onrejectionhandled = function (e) {
                var data = collection(e);
                send(data);
            }
        }
    `
}

module.exports = promiseError
