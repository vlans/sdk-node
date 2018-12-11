var baseConfig = {"type":"GET","url":"http://123213","xhr":""} 
if (window.XMLHttpRequest) {
            baseConfig.xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            baseConfig.xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
