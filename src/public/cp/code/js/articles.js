
$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'none';
    var UPDATE = '';

    var DT = $('#Table_of_articles').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        columns: [
            {
                data: "_id"

            },
            {
                data: "title"

            },
            {
                data: "f_name"


            },
            {
                data: "thumbnail",
                render: function (data) {
                    if (data) {
                        return '<img src="' + data + '" class="img img-thumbnail img-responsive">';
                    }
                    return '';
                }

            },
            {
                data: "extract"

            },
            {
                data: "dt_reg"

            },
            {
                data: "dt_update"

            },
            {
                data: "active",
                render: function (data, s, row) {
                    if (data) {
                        return '<input value="' + row._id + '" type="checkbox" checked="true"  class="CheckedActived_" >'
                    } else {
                        return '<input value="' + row._id + '" type="checkbox"  class="CheckedActived_" >'
                    }

                }

            },
            {
                data: "autor"

            },
            {
                data: "tags"

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


    $('#summernote').summernote(SummerOptions);

    initializeSMImage();

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_title').val('')
        $('#txt_f_name').val('')
        $('#txt_thumbnail').val('')
        $('#txt_thumbnail_save').val('')
        $('#txt_extract').val('')
        $('#txt_tags').val('')
        $('#summernote').summernote('code', '')

    });


    $(document).on('change', '.CheckedActived_', function () {
        var X = $(this).val();
        var ch = $(this).prop('checked');

        $.ajax({
            url:rootPath + '/api/article/' + X,
            method: 'PUT',
            data: { active: ch }
        }).done(function (data) {
            GetDataTable();
            alertify.success(lx_i18n.txt_save_correctly);
        }).fail(function (err) {

            alertify.error(lx_i18n.txt_txt_an_error_occured);
            console.error(err);
        });

    })

    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url:rootPath + "/api/article/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_title').val(data.title)
                $('#txt_f_name').val(data.f_name)
                $('#txt_thumbnail').val('')
                $('#txt_thumbnail_save').val(data.thumbnail)
                $('#txt_extract').val(data.extract)
                $('#txt_tags').val(data.tags)
                $('#summernote').summernote('code', data.html)
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
                url: rootPath +"/api/article/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                GetDataTable();
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


    var GetDataTable = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url:rootPath + "/api/article",
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
        if ($('#txt_title').val() !== '' && $('#txt_f_name').val()) {
            var data = {
                title: $('#txt_title').val(),
                f_name: $('#txt_f_name').val(),
                thumbnail: $('#txt_thumbnail_save').val(),
                extract: $('#txt_extract').val(),
                tags: $('#txt_tags').val(),
                html: $('#summernote').summernote('code'),
            }
            var url =rootPath + "/api/article";
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
                GetDataTable();
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

    GetDataTable();



    $('#txt_title').change(function () {
        var x = $(this).val()
        x = v.snakeCase(x);
        x = x.substring(0, 50);
        $('#txt_f_name').val(x)
    })

    $('#txt_f_name').change(function () {
        var x = $(this).val()
        x = v.snakeCase(x);
        x = x.substring(0, 50);
        $('#txt_f_name').val(x)
    })


    $('#txt_thumbnail').change(function () {
        if ($('#txt_thumbnail').val() == '') {
            return 0;
        }
        HoldOn.open(HoldOptions);
        var data = new FormData();
        data.append('articleThumbnail', $('#txt_thumbnail')[0].files[0]);
        $.ajax({
            url:rootPath + '/upload',
            data: data,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (data) {
                HoldOn.close();
                if (data.success) {
                    $('#txt_thumbnail_save').val(data.file)
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
