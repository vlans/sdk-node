const collection = () => {
    return `
        var collection = function (e) {
            var e = e || window.event;
            e.preventDefault();
            var target = e.target || e.srcElement;
            var parent = target.parentElement;

            var attributes = [];
            if (target.attributes) {
                var attributesLength = target.attributes.length;
                for (var i = 0; i < attributesLength; i++) {
                    attributes.push({
                        name: target.attributes[i].name,
                        value: target.attributes[i].value,
                        nodeType: target.attributes[i].nodeType
                    })
                }
            }
            var sendData = {
                id: target.id || '',
                type: e.type,
                name: target.localName || '',
                className: target.className || '',
                attributes: attributes,
                src: target.src || '',
                time: new Date().getTime()
            }

            return JSON.stringify(sendData);
        }
    `
}

module.exports = collection
