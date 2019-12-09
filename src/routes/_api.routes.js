const express = require('express');
const router = express.Router();


router.use('/admin_roles', require('./NOSQL/admin_roles.routes'));
router.use('/user_roles', require('./NOSQL/user_roles.routes'));
router.use('/admin', require('./NOSQL/admin.routes'));
router.use('/user', require('./NOSQL/user.routes'));
router.use('/country', require('./NOSQL/country.routes'));
router.use('/state', require('./NOSQL/state.routes'));
router.use('/city', require('./NOSQL/city.routes'));
router.use('/i18n', require('./NOSQL/lang.routes'));
router.use('/user_routes', require('./NOSQL/user_access_routes.routes'));
router.use('/admin_routes', require('./NOSQL/admin_access_routes.routes'));
router.use('/file_admin', require('./NOSQL/fileAdmin.routes'));
router.use('/article', require('./NOSQL/articles.routes'));
router.use('/dPage', require('./NOSQL/dinamic_pages.routes'));
router.use('/server_statistics', require('./NOSQL/serverdata.routes'));
router.use('/client_data', require('./NOSQL/client_data.routes'));
router.use('/functions', require('./SQL/api_scriptis.routes'));
router.use('/function', require('./SQL/api_functions.routes'));
router.use('/cron', require('./SQL/cron_scripts.routes'));
router.use('/baas', require('./BaaS_Core/bass_core_routes.routes'));


module.exports = router;