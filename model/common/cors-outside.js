const corsOutside = () => {
    return `
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
    `
}

module.exports = corsOutside
