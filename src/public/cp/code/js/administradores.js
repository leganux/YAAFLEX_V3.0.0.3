
$(document).ready(function () {

    var UPDATE = '';

    var DT = $('#administradores').DataTable({
        language: DT_Lang,
        data: {},
        columns: [
            {
                data: "username",

            },
            {
                data: "email",

            },
            {
                data: "password",
                render: function (data) {
                    return data.substring(0, 10) + '...';
                },

            },
            {
                data: "dt_reg",

            },
            {
                data: "active",

            },
            {
                data: "role",
                render: function (data, x, row) {
                    console.log(data, 'data')
                    return data.name;
                }

            },
            {
                data: "_id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '<button class="EmailElement btn btn-info" value="' + data + '"><i class="fas fa-envelope"></i></button>'
                        + '</center>'
                }
            },

        ]
    });

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_brand_ES').val('')

    });


    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: rootPath +"/api/admin/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_username').val(data.username)
                $('#txt_email').val(data.email)
                $('#txt_password').val(data.password)
                $('#txt_active').val(data.active.toString())
                $('#txt_role').val(data.role)
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
                url: rootPath +"/api/admin/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeAdministradores();
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


    var traeAdministradores = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url:rootPath + "/api/admin",
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
        if ($('#txt_username').val() !== '' && $('#txt_email').val() && $('#txt_password').val()) {
            var data = {
                username: $('#txt_username').val(),
                email: $('#txt_email').val(),
                password: $('#txt_password').val(),
                active: $('#txt_active').val(),
                role: $('#txt_role').val(),
            }
            var url = rootPath +"/api/admin";
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
                traeAdministradores();
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

    traeAdministradores();

    var fillCatalogues = function () {

        $('#txt_role').html('');
        HoldOn.open(HoldOptions);
        $.getJSON(rootPath +'/api/admin_roles', {
            strictsearch: {
                active: true
            },
            sort: {
                dt_reg: "asc"
            },
            //avoid:{},
            //paginate:{page:0,limit:0},
        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    $('#txt_role').append('<option value="' + item._id + '">' + item.name + '</option>')
                });
                HoldOn.close();
            }
        }).fail(function (err) {
            console.error(err)
            HoldOn.close();
            alertify.error(lx_i18n.txt_txt_an_error_occured);
        });

    }

    fillCatalogues();

});
