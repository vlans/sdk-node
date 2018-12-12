(function(w, d) {
            
        var xhr = null;
        if (w.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (w.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var send = function (data) {
            xhr.open('POST', 'http://123213', true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data)
        }
    
            
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
    
            
            
        w.addEventListener('error', function (e) {
            var data = collection(e);
            send(data);
        }, true)
    
            
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
    
        
            
        d.createElement = (function () {
            var f = true;
            var fn = '';

            if (!Function.prototype.bind) {
                fn = d.createElement;
                f = false;
            } else {
                fn = d.createElement.bind(d);
            }

            return function (type) {
                var result = '';
                if (f) {
                    result = fn(type);
                } else {
                    result = fn.call(d, type);
                }

                if (type === 'script' || type === 'link') {
                    result.crossOrigin = 'anonymous';
                }

                return result;
            }
        })()
    
            
        var eventsType = [
            {
                name: 'click'
            },
            {
                name: 'change'
            },
            {
                name: 'blur'
            },
            {
                name: 'focus'
            }
        ];
    
            
        for (var i = 0; i < eventsType.length; i++) {
            d.addEventListener(eventsType[i].name, function (e) {
                var data = collection(e);
                send(data);
            })
        }
    
})(window, document)