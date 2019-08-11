let functions_list = {};
const env = require('./../config/environment.config')

functions_list.removeHtmlTags = function (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '');
}

functions_list.isEmpty = function (val) {

    // test results
    //---------------
    // []        true, empty array
    // {}        true, empty object
    // null      true
    // undefined true
    // ""        true, empty string
    // ''        true, empty string
    // 0         false, number
    // true      false, boolean
    // false     false, boolean
    // Date      false
    // function  false

    if (val === undefined)
        return true;

    if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
        return false;

    if (val == null || val.length === 0)        // null or 0 length array
        return true;

    if (typeof (val) == "object") {
        // empty object

        var r = true;

        for (var f in val)
            r = false;

        return r;
    }

    return false;
}

functions_list.removeHastags = function (content) {

    if (content && content.includes('#')) {
        var exist = []
        var arr = content.match(/#[a-z_.,]+/g);
        for (var i = 0; i < arr.length; i++) {
            content = content.replace(arr[i] + ' ', '')
            if (i == arr.length - 1) {
                content = content.replace(arr[i], '')
            }
        }
    }
    return content;
}

functions_list.extractHastags = function (content) {

    if (content && content.includes('#')) {
        var exist = []
        var arr = content.match(/#[a-z_.,]+/g);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = '<a href="/hashtag/' + arr[i].replace('#', '').replace('.', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>'
        }
        return arr.join('  |  ');
    }
    return ''

}

functions_list.makeHastags = function (content) {

    if (content && content.includes('#')) {
        var exist = []
        var arr = content.match(/#[a-z_.,]+/g);
        for (var i = 0; i < arr.length; i++) {
            content = content.replace(arr[i] + ' ', '<a href="/hashtag/' + arr[i].replace('#', '').replace('.', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            if (i == arr.length - 1) {
                content = content.replace(arr[i], '<a href="/hashtag/' + arr[i].replace('#', '').replace(',', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            }
        }
    }
    return content;
}

functions_list.getUserLang = function (req) {
    var clientLang = env.default_lang;
    var cookies = req.cookies;
    if (cookies.lxLang) {
        clientLang = cookies.lxLang;
    }
    let LangGlobal = require('./../config/i18n/' + clientLang.toUpperCase())
    return LangGlobal;
}

functions_list.extractBodyContent = function (yourStringValue) {
    if (!yourStringValue || yourStringValue == '') {
        return ''
    }
    var strVal = yourStringValue;
    var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
    var array_matches = pattern.exec(strVal);

    if (array_matches) {
        return array_matches[1] ? array_matches[1] : false
    }
    return '';


}

module.exports = functions_list;