/*
 *
 * Form evaluator  the way to evaluate directly filed in a form without JS
 *
 * Angerl Erick Cruz Olivera  (C) 2019  leganux
 *
 * MIT Licsence - Based in wor of LXFormatvalidator project  https://github.com/leganux/iForm---form-creator-validator
 *
 *
 *
 * */



/*
 *
 * Master Properties
 *
 * 1 mandatory - boolean - true/false is necesary
 * 2 maxLength - int - number of characters
 * 3 minLength - int - number of characters
 * 4 include - string - characters must to include
 * 5 uninclude - string - characters must not to include
 * 6 unique - boolean - content not repat in another input
 * 7 duplicate - boolean - content must repat in another input
 * 8 duplicateRef - stringElement - verify other conten as the same
 * 9 maxValue - int - number or value max
 * 10 minValue - int - number or value max
 * 11 accept - String- [.pdf , .jpg] Type file accept
 * 12 fileSize - Number - Max file wiitgh  in MB
 * 13 special =
 * * 13.1 email - validate  email format
 * * 13.2 password - validate password format
 * 14 iname - nombre para ejecutar funcionesdirectas - alternativa de selector
 * 15 live - boolean - Verify on change
 * 17 maxdate - string - Verify on change
 * 17 mindate - string - Verify on change
 *
 * */


var formEvaluator_lx = function (selector, options) {
    $(document.body).append('<style>  .text_RED{ color: red !important; }    </style>')
    this.makeid = function (limit) {
        if (!limit) {
            limit = 10;
        }
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz_0123456789";
        for (var i = 0; i < limit; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    this.HTML_ID = this.makeid(10);
    this.selector = selector;
    this.options = {
        textForSelect: 'Selecciona...',
        colorRange: '#000',
        textsErr: {
            ErrMaxSize: 'El tama&ntilde;o del archivo es mayor a _XX_ MB',
            ErrFileAccept: 'El formato _XX_ es incorrecto o no es un archivo valido',
            ErrMandatory: 'Este campo es obligatorio',
            ErrUnique: 'La informacion  ya se encuentra  en otro campo',
            ErrPatternAlph: 'Solo se permiten alphanumericos',
            ErrPatternNumeric: 'Solo se permiten numericos',
            ErrPattern: 'La informacion  no cincide con el patron',
            ErrMinLength: 'El contenido por lo menos debe tener _XX_ caracteres de longitud',
            ErrMaxLength: 'El contenido por lo mucho debe tener _XX_ caracteres de longitud',
            ErrMinNum: 'El numero es menor a _XX_ ',
            ErrMaxNum: 'El numero es mayor a  _XX_ ',
            ErrIncludes: 'El contenido no incluye  _XX_ ',
            ErrPass: 'El formato de contraseña es incorrecto ',
        }
    };
    if (options) {
        this.options = options;
    }

    this.writeRed = function (ID_c, text, mandatory) {
        if (mandatory) {
            $('#ast_id_lx_' + ID_c).addClass('text_RED');
        }
        $('#sm_id_lx_' + ID_c).append(' ' + text + ',');
        $('[form_id_lx="' + ID_c + '"]').addClass('form-control-error');
    };
    this.cleanRed = function (ID_c) {
        $('#ast_id_lx_' + ID_c).removeClass('text_RED');
        $('#sm_id_lx_' + ID_c).text('');
        $('[form_id_lx="' + ID_c + '"]').removeClass('form-control-error');
    };
    this.validateField = function (item, isEnd) {
        var el = this;
        var err = 0;



        var mandatory = $(item).attr('mandatory') == 'true' ? true : false;
        var unique = $(item).attr('unique') == 'true' ? true : false;
        var duplicate = $(item).attr('duplicate') == 'true' ? true : false;
        var live = $(item).attr('live') == 'true' ? true : false;
        var maxdate = $(item).attr('maxdate') ? $(item).attr('maxdate') : false;
        var mindate = $(item).attr('mindate') ? $(item).attr('mindate') : false;
        var iname = $(item).attr('iname') ? $(item).attr('iname') : false;
        var fileSize = $(item).attr('fileSize') ? $(item).attr('fileSize') : false;
        var accept = $(item).attr('accept') ? $(item).attr('accept') : false;
        var minValue = $(item).attr('minValue') ? $(item).attr('minValue') : false;
        var maxValue = $(item).attr('maxValue') ? $(item).attr('maxValue') : false;
        var duplicateRef = $(item).attr('duplicateRef') ? $(item).attr('duplicateRef') : false;
        var uninclude = $(item).attr('uninclude') ? $(item).attr('uninclude') : false;
        var include = $(item).attr('include') ? $(item).attr('include') : false;
        var maxLength = $(item).attr('maxLength') ? $(item).attr('maxLength') : false;
        var minLength = $(item).attr('minLength') ? $(item).attr('minLength') : false;
        var ID_c = $(item).attr('form_id_lx') ? $(item).attr('form_id_lx') : false;

        var valueField = $(item).val();

        el.cleanRed(ID_c);

        if ($(item).is('select')) {

            if (isEnd && (valueField == '-1' || valueField == null ) && mandatory) {
                el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                err++;
            }

        } else if ($(item).is('input')) {
            if ($(item).attr('type')) {

                switch ($(item).attr('type').toLowerCase()) {
                    case 'range':
                        if (minValue && valueField < minValue) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMinNum.replace('_XX_', minValue));
                            err;
                        }
                        if (maxValue && valueField > maxValue) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxNum.replace('_XX_', maxValue));
                            err;
                        }
                        if (isEnd && valueField == '' && mandatory) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                            err++;
                        }

                        break;
                    case 'number':
                        if (minValue && valueField < minValue) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMinNum.replace('_XX_', minValue));
                            err;
                        }
                        if (maxValue && valueField > maxValue) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxNum.replace('_XX_', maxValue));
                            err;
                        }
                        if (maxLength && valueField.length > maxLength) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', maxLength));
                            err;
                        }
                        if (minLength && valueField.length < minLength) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', minLength));
                            err;
                        }
                        if (include && !valueField.includes(include)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrIncludes.replace('_XX_', include));
                            err;
                        }
                        if (uninclude && valueField.includes(uninclude)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrUnIncludes.replace('_XX_', uninclude));
                            err;
                        }
                        if (isEnd && valueField == '' && mandatory) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                            err++;
                        }

                        break;
                    case 'text':

                        if (maxLength && valueField.length > maxLength) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', maxLength));
                            err;
                        }
                        if (minLength && valueField.length < minLength) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', minLength));
                            err;
                        }
                        if (include && !valueField.includes(include)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrIncludes.replace('_XX_', include));
                            err;
                        }
                        if (uninclude && valueField.includes(uninclude)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrUnIncludes.replace('_XX_', uninclude));
                            err;
                        }
                        if (isEnd && valueField == '' && mandatory) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                            err++;
                        }

                        break;
                    case 'password':

                        if (valueField !== '' && valueField.length > 20) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', 20));
                            err;
                        }
                        if (valueField !== '' && valueField.length < 8) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMinLength.replace('_XX_', 8));
                            err;
                        }
                        if (include && !valueField.includes(include)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrIncludes.replace('_XX_', include));
                            err;
                        }
                        if (uninclude && valueField.includes(uninclude)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrUnIncludes.replace('_XX_', uninclude));
                            err;
                        }
                        if (isEnd && valueField == '' && mandatory) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                            err++;
                        }

                        break;
                    case 'email':

                        if (maxLength && valueField.length > maxLength) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', maxLength));
                            err;
                        }
                        if (minLength && valueField.length < minLength) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', minLength));
                            err;
                        }
                        if (valueField !== '' && !valueField.includes('@')) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMailAt);
                            err;
                        }
                        if (valueField !== '' && !valueField.includes('.')) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMailPoint);
                            err;
                        }
                        if (uninclude && valueField.includes(uninclude)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrUnIncludes.replace('_XX_', uninclude));
                            err;
                        }
                        if (isEnd && valueField == '' && mandatory) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                            err++;
                        }

                        break;

                    case 'date':
                        if (valueField) {
                            valueField = Moment(valueField).format('x');
                            if (maxdate && mandatory && Moment(maxdate).format('x') < valueField) {
                                el.writeRed(ID_c, el.options.textsErr.ErrMaxdate);
                                err++;
                            }
                            if (mindate && Moment(mindate).format('x') > valueField) {
                                el.writeRed(ID_c, el.options.textsErr.ErrMindate);
                                err++;
                            }
                            if (isEnd && valueField == '' && mandatory) {
                                el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                                err++;
                            }
                        }

                        break;
                    case 'file':

                        if (accept && !valueField.includes(accept)) {
                            el.writeRed(ID_c, el.options.textsErr.ErrFileAccept.replace('_XX_', accept));
                            err;
                        }
                        if (fileSize && valueField != '') {
                            if ($(item).files[0] > fileSize) {
                                el.writeRed(ID_c, el.options.textsErr.ErrMaxSize.replace('_XX_', fileSize));
                                err;
                            }
                        }
                        if (isEnd && valueField == '' && mandatory) {
                            el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                            err++;
                        }

                        break;
                    default:
                        console.warn('El elemento', item, 'no esta correctamente definido')
                        break;
                }
            } else {
                console.warn('El elemento', item, 'Requiere del parametro type')
            }
        } else if ($(item).is('textarea')) {

            if (maxLength && valueField.length > maxLength) {
                el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', maxLength));
                err;
            }
            if (minLength && valueField.length < minLength) {
                el.writeRed(ID_c, el.options.textsErr.ErrMaxLength.replace('_XX_', minLength));
                err;
            }
            if (include && !valueField.includes(include)) {
                el.writeRed(ID_c, el.options.textsErr.ErrIncludes.replace('_XX_', include));
                err;
            }
            if (uninclude && valueField.includes(uninclude)) {
                el.writeRed(ID_c, el.options.textsErr.ErrUnIncludes.replace('_XX_', uninclude));
                err;
            }
            if (isEnd && valueField == '' && mandatory) {
                el.writeRed(ID_c, el.options.textsErr.ErrMandatory, true);
                err++;
            }
        }
        return err;
    };
    this.initialize = function () {
        var el = this;
        let form = $(el.selector).find('input,select,textarea');
        $.each(form, function (i, item) {
            var ID_c = el.makeid(10);


            $(item).after('<small id="sm_id_lx_' + ID_c + '" class="text_RED"></small><br>');
            $(item).attr('form_id_lx', ID_c);
            let lblAzt = $(item).prev();
            if ($(item).attr('mandatory') && $(item).attr('mandatory') == 'true' && $(lblAzt).is('label')) {
                $(lblAzt).append('<span  id="ast_id_lx_' + ID_c + '"> * </span>')
            }

            let isLive = $(item).attr('live');
            if (isLive && (isLive == true || isLive == "true")) {
                $(item).change(function () {
                    el.validateField(item, false);
                });
            }
        });
    };
    this.evaluate = function () {
        var el = this;
        let form = $(el.selector).find('input,select,textarea');
        var errores = 0
        $.each(form, function (i, item) {

            errores = errores + el.validateField(item, true);
        });
        return errores;
    };


};