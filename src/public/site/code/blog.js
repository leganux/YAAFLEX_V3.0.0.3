

$(document).ready(function () {

    $.getJSON('/api/article', { strictsearch: { active: true } }, function (data) {
        if (data.success) {
            data.data.map(function (item, i, arr) {
                $('#listBlog').append('<br>' +
                    '<div class="card border-light mb-3" >' +
                    '<div class="card-header">' +
                    '<p align="right"> ' + moment(item.dt_reg).fromNow() + '</p>' +
                    '<h3>' +
                    '<a href="/article/' + item.f_name + '">' +
                    item.title +
                    '</a>' +
                    '</h3>' +
                    '</div>' +
                    '<div class="card-body">' +
                    '<div class="row">' +
                    '<div class="col-sm-4 col-md-2">' +
                    '<a href="/article/' + item.f_name + '">' +
                    '<img src="' + item.thumbnail + '" id="EquializeThis_' + item._id + '" class="image lnx_eqlzr-square image">' +
                    '</a>' +
                    '</div>' +
                    '<div class="col-sm-8 col-md-10">' +
                    '<p align="justify">' + item.extract + '</p>' +
                    '<hr>' +
                    '<a href="/article/' + item.f_name + '">' +
                    '<p align="right"> <button class="btn btn-primary">' + lx_i18n.button_read_more + '</button></p>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );

                llamaEqualizer('#EquializeThis_' + item._id);
            });
        }
    });
});