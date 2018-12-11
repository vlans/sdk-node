for (var i = 0; i < eventsType.length; i++) {
            d.addEventListener(eventsType[i].name, function (e) {
                var e = e || window.event;
                var target = e.target || e.srcElement;
                var parent = target.parentElement;
                var xhr = baseConfig.xhr;

                xhr.open(baseConfig.type, baseConfig.url, true);
                xhr.setRequestHeader("Content-type", "application/json");

                var attributes = [];
                var attributesLength = target.attributes.length;
                for (var i = 0; i < attributesLength; i++) {
                    attributes.push({
                        name: target.attributes[i].name,
                        value: target.attributes[i].value,
                        nodeType: target.attributes[i].nodeType
                    })
                }

                var childNodeList = target.childNodes.length;
                var sendData = {
                    id: target.id,
                    type: e.type,
                    name: target.localName,
                    className: target.className,
                    attributes: attributes,
                    childNodeList: childNodeList,
                    time: new Date().getTime()
                }

                var stringify = JSON.stringify(sendData);
                xhr.send(stringify);
            })
        }
