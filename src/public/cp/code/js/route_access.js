$(document).ready(function () {

    var UPDATE = '';
    $.fn.dataTable.ext.errMode = 'none';
    var DT = $('#tbl_').DataTable({
        language: DT_Lang,
        data: {},
        drawCallback: function (settings) {
            var api = this.api();

            // Output the data for the visible rows to the browser's console
            var rows = api.rows({page: 'current'}).data()

            rows.map(function (row, r, arr) {
                $('#SPROLES_' + row._id).html('');
                row.roles.map(function (rol, rr, arr) {
                    $('#SPROLES_' + row._id).append('<p>' + rol.name + '</p>');
                });
            });
        },
        columns: [

            {
                data: "description",

            },
            {
                data: "path",

            },
            {
                data: "method",

            },
            {
                data: "_id",
                render: function (data) {
                    return '<div id="SPROLES_' + data + '"></div>';
                }

            },
            {
                data: "_id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '</center>'
                }
            },

        ]
    });

    $.getJSON(rootPath + '/api/admin_roles', {}, function (data) {
        if (data.success) {
            $.each(data.data, function (i, item) {
                $('#txt_roles').append('<option value="' + item._id + '">' + item.name + '</option>')
            });
        }
        lxSelect2('#txt_roles', '#myDataModal');
    }).fail(function (err) {
        alertify.error(lx_i18n.txt_txt_an_error_occured);
        console.error(err)
    });


    lxSelect2('#txt_methods', '#myDataModal');

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_description').val('')
        $('#txt_route').val('')
        $('#txt_methods').val(null).trigger('change');
        $('#txt_roles').val(null).trigger('change');
    });

    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: rootPath + "/api/admin_routes/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;

                $('#txt_description').val(data.description)

                $('#txt_route').val(data.path)
                $('#txt_methods').val(data.method.split(',')).trigger('change');
                var arr_id_roles = []
                data.roles.map(function (item, i) {
                    arr_id_roles.push(item._id)
                });
                $('#txt_roles').val(arr_id_roles).trigger('change');

                $('#myDataModal').modal('show');
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });
    });

    $(document).on('click', '.DeleteElement', function () {
        DELETE = $(this).val();
        alertify.confirm(lx_i18n.txt_fonfirm_delete, lx_i18n.txt_fonfirm_delete_question, function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: rootPath + "/api/admin_routes/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                GetScreenData();
                alertify.success(lx_i18n.txt_delete_correctly)
            }).fail(function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            });
        }, function () {
            HoldOn.close();
        });

    });

    var GetScreenData = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: rootPath + "/api/admin_routes",
        }).done(function (data) {

            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    DT.clear().rows.add(data.data).draw();
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });
    }

    $('#SaveChanges').click(function () {
        if ($('#txt_route').val() !== '' && $('#txt_description').val()) {

            var method = [];
            var X = $('#txt_methods').select2('data')
            X.map(function (item, i) {
                method.push(item.id)
            })
            var roles = [];
            var Y = $('#txt_roles').select2('data')
            Y.map(function (item, i) {
                roles.push(item.id)
            })

            var data = {

                description: $('#txt_description').val(),
                path: $('#txt_route').val(),
                method: method.join(','),
                roles: roles,
            }
            var url = rootPath + "/api/admin_routes";
            var method = 'POST';
            if (UPDATE !== '') {
                url = url + '/' + UPDATE;
                method = 'PUT'
            }
            $.ajax({
                url: url,
                method: method,
                data: data
            }).done(function (data) {
                HoldOn.close();
                $('#myDataModal').modal('hide');
                GetScreenData();
                alertify.success(lx_i18n.txt_save_correctly);
            }).fail(function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            });

        } else {
            alertify.error(lx_i18n.txt_full_all_data);
        }

    });

    GetScreenData();
});


