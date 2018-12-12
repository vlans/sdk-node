const globalError = () => {
    return `
        w.addEventListener('error', function (e) {
            var data = collection(e);
            send(data);
        }, true)
    `
}

module.exports = globalError
