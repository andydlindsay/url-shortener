module.exports = {

    // Adapted from answer given by Tom Gullen on stack overflow in answer to question:
    // http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    validURL: function(str) {
        // var pattern = new RegExp(
        //     // '^(https?:\/\/)'+ // protocol
        //     '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        //     '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        //     '(\:\d+)?(\/[-a-z\d%_.~+]*)*' // port and path
        //     // '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        //     // '(\#[-a-z\d_]*)?$','i' // fragment locater
        //     ); 
        var pattern = /[.]/g;
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