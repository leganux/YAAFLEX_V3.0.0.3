var extractBodyContent = function (yourStringValue) {
    if (!yourStringValue || yourStringValue == '') {
        return '';
    }
    var strVal = yourStringValue;
    var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
    var array_matches = pattern.exec(strVal);
    if (array_matches) {
        return array_matches[1] ? array_matches[1] : ''
    }
    return '';

}

$(document).ready(function () {
    //if url has #no-right-panel set one panel demo
    if (window.location.hash.indexOf("no-right-panel") != -1) {
        $("#vvveb-builder").addClass("no-right-panel");
        $(".component-properties-tab").show();
        Vvveb.Components.componentPropertiesElement = "#left-panel .component-properties";
    } else {
        $(".component-properties-tab").hide();
    }
    Vvveb.Builder.init(lx_assetsURL + "/demo/startbootstrap-landing-page/index.html", function () {
        //run code after page/iframe is loaded

        $.ajax({
            url: rootPath + "/api/dPage/" + lx_ID,
        }).done(function (data) {

            if (data.success == true) {
                data = data.data;
                if (data.html && data.html !== '') {
                    $('#iframe1').contents().find('body').html(extractBodyContent(data.html));
                    $('#iframe1').contents().find('head').append('<link href="' + URL_template + '" rel="stylesheet">');
                    alert('This module helps you to construct a page for your site, you must be careful and save your page or template before close the window.');

                } else {
                    // $('#iframe1').contents().find('body').html(extractBodyContent(''));
                    $('#iframe1').contents().find('head').append('<link href="' + URL_template + '" rel="stylesheet">');
                    alert('This module helps you to construct a page for your site, you must be careful and save your page or template before close the window.');

                }



            }
        }).fail(function (err) {
            alert('An error ocurred when try to load template!')
            console.error(err);
        });


    });
    Vvveb.Gui.init();
    Vvveb.FileManager.init();
    Vvveb.FileManager.addPages(
        [
            {
                name: "landing-page", title: "Inicio", url: lx_assetsURL + "/demo/startbootstrap-landing-page/index.html",
                assets: [
                    //lx_assetsURL + '/demo/startbootstrap-landing-page/css/landing-page.min.css',
                    URL_template
                ]
            },


        ]);
    Vvveb.FileManager.loadPage("landing-page");
});