const express = require('express');
const router = express.Router();


router.use('/admin_roles', require('./admin_roles.routes'));
router.use('/user_roles', require('./user_roles.routes'));
router.use('/admin', require('./admin.routes'));
router.use('/user', require('./user.routes'));
router.use('/country', require('./country.routes'));
router.use('/state', require('./state.routes'));
router.use('/city', require('./city.routes'));
router.use('/i18n', require('./lang.routes'));
router.use('/user_routes', require('./user_access_routes.routes'));
router.use('/admin_routes', require('./admin_access_routes.routes'));
router.use('/file_admin', require('./fileAdmin.routes'));
router.use('/article', require('./articles.routes'));
router.use('/dPage', require('./dinamic_pages.routes'));
router.use('/server_statistics', require('./serverdata.routes'));
router.use('/client_data', require('./client_data.routes'));

module.exports = router;