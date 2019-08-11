
$(document).ready(function () {

    var UPDATE = '';
    var DT = $('#roles_admin').DataTable({
        language: DT_Lang,
        data: {},
        columns: [
            {
                data: "name",

            },
            {
                data: "description",

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

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_name').val('')
        $('#txt_description').val('')
    });

    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url:rootPath + "/api/admin_roles/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_name').val(data.name)
                $('#txt_description').val(data.description)
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
                url: rootPath +"/api/admin_roles/" + DELETE,
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
            url:rootPath + "/api/admin_roles",
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
        if ($('#txt_name').val() !== '' && $('#txt_description').val()) {
            var data = {
                name: $('#txt_name').val(),
                description: $('#txt_description').val(),
                active: true,
            }
            var url = rootPath +"/api/admin_roles";
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


