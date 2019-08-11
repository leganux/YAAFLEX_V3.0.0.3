const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
const CheckSession = require('./../auth/checkSession')
const axios = require('axios');
const fs = require('fs');

router.post('/youtubeVideoData', CheckSession, function (req, res) {
    var { yurl } = req.body;
    var ID = yurl.split('=')[1];
    var imgG = 'https://i.ytimg.com/vi/' + ID + '/maxresdefault.jpg';
    axios.get('https://www.youtube-nocookie.com/embed/' + ID)
        .then(function (response) {
            response = response.data;
            var re = new RegExp('"title":"(.*?)"', "g");
            var re2 = new RegExp('"short_view_count_text":"(.*?)"', "g");
            var Obj = response.match(re);
            var Obj2 = response.match(re2);
            res.status(200).json({
                message: 'Data get correclty',
                success: true,
                data: {
                    title: Obj[0].replace('"title":"', '').replace('"', '').replace('\\u0026', '&').replace('\\', ''),
                    countViewers: Obj2[0].replace('"short_view_count_text":"', '').replace('"', ''),
                    img: imgG
                }
            })
        })
        .catch(function (error) {
            res.status(500).json({
                message: 'An error ocurred',
                success: false,

            })

        })
});

function guardameloTantito(contenido) {

    fs.writeFile("./try.txt", contenido, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

router.post('/facebookImagePost/', CheckSession, function (req, res) {

    var { furl } = req.body;

    axios.get(furl)
        .then(function (response) {
            response = response.data;

            guardameloTantito(response)
            var re = new RegExp('ploi="(.*?)"', "g");
            var Obj = response.match(re);


            res.status(200).json({
                message: 'Data get correclty',
                success: true,
                data: {
                    image: Obj[0].replace('data-ploi="', '').replace('"', '')
                }
            })
        })
        .catch(function (error) {
            res.status(500).json({
                message: 'An error ocurred',
                success: false,

            })

        })

});


router.post('/instagramPerson', CheckSession, function (req, res) {
    var { iurl } = req.body;

    iur = iurl.replace('www.', '');
    axios.get(iurl)
        .then(function (response) {

            let S = response.data.split('/n');
            let local = '';
            S = S[0].split('<meta');

            for (var i = 0; i < S.length; i++) {
                if (S[i].includes('Followers') && S[i].includes('Following')) {
                    local = S[i];
                    break;
                }
            }

            local = local.split('-')[0];
            local = local.replace('content=\"', '')

            res.status(200).json({
                message: 'Data get correclty',
                success: true,
                data: local.split(', ')
            })
        })
        .catch(function (error) {
            res.status(500).json({
                message: 'An error ocurred',
                success: false,

            })

        })
});
router.post('/instagramPost', CheckSession, function (req, res) {
    var { iurl } = req.body;
    iur = iurl.replace('www.', '');
    axios.get(iurl)
        .then(function (response) {

            let S = response.data.split('/n');
            let local = '';
            S = S[0].split('<meta');

            for (var i = 0; i < S.length; i++) {
                if (S[i].includes('Likes') && S[i].includes('Comments')) {
                    local = S[i];
                    break;
                }
            }

            local = local.split('-')[0];
            local = local.replace('content=\"', '')

            res.status(200).json({
                message: 'Data get correclty',
                success: true,
                data: local.split(', ')
            })
        })
        .catch(function (error) {
            res.status(500).json({
                message: 'An error ocurred',
                success: false,

            })

        })
});

module.exports = router;