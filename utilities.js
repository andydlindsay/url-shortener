module.exports = {

    // Adapted from answer given by Tom Gullen on stack overflow in answer to question:
    // http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    validURL: function(str) {
        var pattern = /(www)?[a-zA-Z0-9\.\/]*[\.][a-zA-Z0-9\.\/]*/gi;
        if(!pattern.test(str)) {
            // alert("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    },
    
    isHex: function(str) {
        var pattern = /[0-9A-Fa-f]{24}/g;
        if (pattern.test(str)) {
            return true;
        } else {
            return false;
        }
    }

};