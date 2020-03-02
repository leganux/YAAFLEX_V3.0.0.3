const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
const env = require('./../config/environment.config')
const cFunctions = require('./../helpers/common.functions')
const assets = require('./../config/assets_site.config');
const dPage = require('./../models/NOSQL/dinamic_pages.model');
const Article = require('./../models/NOSQL/articles.model');

// help function to get the dinamyc pages
const GetPages = async function () {
    var PAGES = await dPage.find().sort({'dt_reg': 'desc'}).exec();
    return PAGES;
};

//get the home page
router.get('/', async (req, res) => {
    let pages = await GetPages()
    res.render("front/home",
        {
            rootPath: env.root,
            data: {pages},
            config: {
                theme: env.site_theme.toLowerCase(),
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)
        });


});

//blog list
router.get('/blog', async (req, res) => {
    let pages = await GetPages()
    res.render("front/blog",
        {
            rootPath: env.root,
            data: {pages},
            config: {
                theme: env.site_theme.toLowerCase(),
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX :: Blog',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)
        });


});


// get the dinamic page
router.get('/page/:name', async (req, res) => {
    var name = req.params.name;
    name = name.trim()

    let pages = await GetPages()
    let page = await  dPage.findOne({f_name: name}).exec();


    res.render("front/d_page",
        {
            rootPath: env.root,
            data: {
                pages,
                html: cFunctions.extractBodyContent(page.html)
            },
            config: {
                theme: env.site_theme.toLowerCase(),
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: page.title,
                description: page.title,
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)
        });


});

// get the article
router.get('/article/:name', async (req, res) => {
    var name = req.params.name;
    name = name.trim()

    let pages = await GetPages()
    let page = await Article.findOne({f_name: name}).exec();


    res.render("front/article",
        {
            rootPath: env.root,
            data: {
                pages,
                html: page.html
            },
            config: {
                theme: env.site_theme.toLowerCase(),
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: page.title,
                description: page.title,
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)
        });


});

//SupportChat
router.get('/chat', async (req, res) => {
    let pages = await GetPages()


    res.render("front/chat",
        {
            rootPath: env.root,
            socketPath: env.root + env.socket_path,
            socketPort: env.socket_port,
            data: {pages},
            config: {
                theme: env.site_theme.toLowerCase(),
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX :: Chat',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)
        });


});

if (env.allow_console_on_screen) {

    let laruta = env.url_console_on_screen

    router.get(laruta, async (req, res) => {
        res.render("front/consoleOnScreen",
            {
                rootPath: env.root,
                socketPath: env.root + env.socket_path,
                socketPort: env.socket_port,
                data: {},
                config: {
                    theme: env.site_theme.toLowerCase(),
                    langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                    path: RoutesConfig,
                    assets: assets,
                    filesPath: RoutesConfig.FilesPath
                },
                seo: {
                    title: 'YAAFLEX :: Console Dubug',
                    description: 'YAAFLEX - yet another amazing framework by leganux',
                    image: 'http://cdn.leganux.com/IMG/integrado.png',
                    domain: req.get('host'),
                    url: req.protocol + '://' + req.get('host') + req.originalUrl,
                    tw_posted_by: '@leganux',
                    og_type: 'article',
                },
                i18n: cFunctions.getUserLang(req)
            });


    });

}


module.exports = router;

















