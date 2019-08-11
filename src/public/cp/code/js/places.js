var DT = {};

$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'none';


    DT = $('#Table_of_Countries').DataTable({
        language: DT_Lang,
        responsive: true,
        data: {},
        processing: true,
        serverSide: true,
        ajax: {
            url: rootPath + "/api/country/datatable",
            type: "POST"
        },
        columns: [
            {
                data: "_id"

            },
            {
                data: "id"

            },
            {
                data: "sortname"

            },

            {
                data: "name"

            },
            {
                data: "phoneCode"

            }
        ]
    });


});
