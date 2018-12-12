const listener = () => {
    return `
        for (var i = 0; i < eventsType.length; i++) {
            d.addEventListener(eventsType[i].name, function (e) {
                var data = collection(e);
                send(data);
            })
        }
    `
}

module.exports = listener
