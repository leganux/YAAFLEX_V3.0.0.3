


var llamaEqualizer = function (obj) {
    //$('.lnx_eqlzr, .lnx_eqlzr-square, .lnx_eqlzr-circle, .lnx_eqlzr-portrait, .lnx_eqlzr-landscape, .lnx_eqlzr-diamond').each(function (index, element) {
    $(obj).each(function (index, element) {
        //Get variables...
        var dynamicDiv = '';
        var source = $(this).attr("src");
        var height = $(this).attr("height");
        var divClass = $(this).attr("class");

        //Conditionals...
        if (parseInt(height) > 0) {
            dynamicDiv = '<div class="' + divClass + ' lnx_eqlzr-height" style="height: ' + height + 'px;">';
        } else {
            dynamicDiv = '<div class="' + divClass + '">';
        }

        //Add Image URL
        if (divClass != 'lnx_eqlzr-diamond') {
            dynamicDiv += '<div class="lnx_eqlzr-placeholder">';
            dynamicDiv += '<div>';
            dynamicDiv += '<div class="lnx_eqlzr-icon"></div>';
            dynamicDiv += '</div>';
            dynamicDiv += '</div>';
            dynamicDiv += '<div class="lnx_eqlzr-img" style="background-image: url(' + source + ');"></div>';
            dynamicDiv += '</div>';
        } else {
            dynamicDiv += '<div class="lnx_eqlzr-diamond-container">';
            dynamicDiv += '<div class="lnx_eqlzr-diamond-placeholder">';
            dynamicDiv += '<div><div>';
            dynamicDiv += '<div class="lnx_eqlzr-icon"></div>';
            dynamicDiv += '</div></div>';
            dynamicDiv += '</div>';
            dynamicDiv += '<div class="lnx_eqlzr-diamond-img" style="background-image: url(' + source + ');"></div>';
            dynamicDiv += '</div>';
            dynamicDiv += '</div>';
        }

        //ReplaceWith dynamicDivTag
        $(this).replaceWith(dynamicDiv);
    });
}

