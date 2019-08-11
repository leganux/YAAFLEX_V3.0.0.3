
$(document).ready(function () {

    var UPDATE = '';
    $.fn.dataTable.ext.errMode = 'none';
    var DT = $('#tbl_').DataTable({
        language: DT_Lang,
        data: {},
        responsive: true,

        columns: [

            {
                data: "_id",

            },
            {
                data: "original",

            },
            {
                data: "filename",

            },
            {
                data: "public_path",
                render: function (data, r, row) {
                    var txt = '<input class="form-control" value="' + data + '">'

                    if (
                        data.includes('.jpg')
                        || data.includes('.png')
                        || data.includes('.jpeg')
                        || data.includes('.gif')
                        || data.includes('.bmp')
                    ) {
                        txt = txt + '<br>' +
                            '<img src="' + data + '" class="img img-thumbnail img-responsive">';
                    }
                    return txt;
                }

            },

            {
                data: "folder",

            },

            {
                data: "public_path",
                render: function (data, x, row) {
                    return '<center>' +
                        '<button diskPAth="' + row.disk_path + '" class=" DeleteElement btn btn-danger" value="' + row._id + '"><i class="fa fa-trash"></i></button>'
                        + '<a download="' + row.original + '"  href="' + data + '"><button class="downloadEL_ btn btn-primary" ><i class="fas fa-download"></i></button></a>'
                        + '<a target="_blank"  href="' + data + '"><button class=" btn btn-info" ><i class="fas fa-eye"></i></button></a>'
                        + '</center>'
                }
            },

        ]
    });










    $(document).on('click', '.DeleteElement', function () {
        DELETE = $(this).val();
        PATH = $(this).attr('diskpath');
        alertify.confirm(lx_i18n.txt_fonfirm_delete, lx_i18n.txt_fonfirm_delete_question, function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url:rootPath + "/api/file_admin/FP/" + DELETE,
                method: "DELETE",
                data: { path: PATH }
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
            url:rootPath + "/api/file_admin",
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


    GetScreenData();




    $('#upload_file').click(function () {
        if ($('#txt_file').val() == '') {
            return 0;
        }
        HoldOn.open(HoldOptions);
        var data = new FormData();
        data.append('File', $('#txt_file')[0].files[0]);
        $.ajax({
            url:rootPath + '/upload',
            data: data,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (data) {
                HoldOn.close();
                if (data.success) {
                    GetScreenData();
                    $('#txt_file').val('')
                }
            },
            error: function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            }
        });

    })


});


