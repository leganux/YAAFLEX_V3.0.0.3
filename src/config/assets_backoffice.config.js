const env = require('./environment.config');


module.exports = {
    css: [
        '/dist/BS/css/bootstrap.css',
        '/dist/adminLTE/adminlte.css',
        '/bootswatch-dist/' + env.site_theme + '/bootstrap.css',
        '/vendor/datatables/jquery.dataTables.css',
        '/vendor/datatables/dataTables.bootstrap4.css',
        '/vendor/datatables/extensions/Responsive/css/dataTables.responsive.css',


        '/vendor/holdon/holdOn.css',
        '/vendor/summernote/summernote-bs4.css',
        '/vendor/alertifyjs/css/alertify.css',
        '/vendor/alertifyjs/css/themes/bootstrap.css',
        '/vendor/select2/css/select2.css',
        '/code/css/common.css',
        '/vendor/context/jquery.contextMenu.css',
        '/vendor/datepicker/css/bootstrap-datepicker.css',
        '/vendor/fa/css/all.css',
        '/vendor/leganux/animate.css',
        '/vendor/leganux/equalizr.css',

    ],
    js: [
        '/vendor/jquery/jquery.min.js',
        '/vendor/popper/popper.js',
        '/vendor/popper/tooltip.js',
        '/dist/BS/js/bootstrap.bundle.js',
        '/dist/BS/js/bootstrap.js',
        '/dist/fastclick.js',
        '/dist/adminLTE/adminlte.js',
        '/vendor/leganux/global.js',
        '/vendor/voca/voca.js',
        '/vendor/leganux/client.js',
        '/code/js/common.js',
        '/vendor/datatables/jquery.dataTables.js',
        '/vendor/datatables/dataTables.bootstrap4.js',
        '/vendor/datatables/extensions/Responsive/js/dataTables.responsive.js',
        '/vendor/summernote/summernote-bs4.js',
        '/vendor/summernote/lang/summernote-es-ES.js',
        '/vendor/alertifyjs/alertify.js',
        '/vendor/select2/js/select2.js',
        '/vendor/holdon/holdOn.js',
        '/vendor/artyom/artyom.js',
        '/vendor/context/jquery.contextMenu.js',
        '/vendor/datepicker/js/bootstrap-datepicker.js',
        '/vendor/fa/js/all.js',
        '/vendor/iform/iForm.js',

        '/vendor/leganux/equalizr.js',
        '/vendor/moment/momment.js',
    ],
    img: {
        logo: {
            name: 'yaaflex-character',
            path: '/vendor/_img/yaaflex.png',
            prop: 'class="img img-fluid"'
        },
    }
}

