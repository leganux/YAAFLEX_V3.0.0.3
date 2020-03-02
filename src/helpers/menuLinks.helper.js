var func = {}

const RotesUser = require('./../models/NOSQL/routes_access_user.model')
const RotesAdmin = require('./../models/NOSQL/routes_access_admin.model')
const env = require('./../config/environment.config')

var Menu = {
    CP: [
        {
            path: env.root + '/lx_admin/dashboard',
            icon: ' fas fa-tachometer-alt fa-fw',
            name: 'admin_menu_dashboard'
        },
        {
            path: env.root + '/lx_admin/roles_admin',
            icon: ' fas fa-key fa-fw',
            name: 'admin_menu_admin_roles'
        },
        {
            path: env.root + '/lx_admin/administradores',
            icon: ' fas fa-user-cog fa-fw',
            name: 'admin_menu_admins'
        },
        {
            path: env.root + '/lx_admin/roles_user',
            icon: ' fas fa-users-cog fa-fw',
            name: 'admin_menu_user_roles'
        },
        {
            path: env.root + '/lx_admin/users',
            icon: ' fa fa-user fa-fw',
            name: 'admin_menu_users'
        },
        {
            path: env.root + '/lx_admin/routes_access',
            icon: 'fas fa-route fa-fw',
            name: 'admin_menu_routes_access_admin'
        },
        {
            path: env.root + '/lx_admin/routes_access_user',
            icon: 'fas fa-route fa-fw',
            name: 'admin_menu_routes_access_users'
        },
        {
            path: env.root + '/lx_admin/file_manager',
            icon: 'fas fa-folder-open fa-fw',
            name: 'admin_menu_file_manager'
        },
        {
            path: env.root + '/lx_admin/articles',
            icon: 'fas fa-blog fa-fw',
            name: 'admin_menu_articles'
        },
        {
            path: env.root + '/lx_admin/dinamic_pages',
            icon: 'fas fa-globe-americas fa-fw',
            name: 'admin_menu_dinamic_pages'
        },
        {
            path: env.root + '/lx_admin/places',
            icon: 'fas fa-globe fa-fw',
            name: 'admin_menu_places'
        },
        {
            path: env.root + '/lx_admin/api_functions',
            icon: 'fas fa-atom fa-fw',
            name: 'admin_menu_functions'
        },
        {
            path: env.root + '/lx_admin/cron_functions',
            icon: 'fas fa-history fa-fw',
            name: 'admin_menu_cron_functions'
        },
        {
            path: env.root + '/lx_admin/BaaSDef',
            icon: 'fas fa-database fa-fw',
            name: 'admin_menu_baas_definition'
        },
        {
            path: env.root + '/logout',
            icon: 'fas fa-sign-out-alt fa-fw',
            name: 'admin_menu_logout'
        },

    ],
    Site: [{}]
}


func.CP = async function (role, i18n) {
    if (!role || !i18n) {
        return false
    }
    try {
        let data = await RotesAdmin.find({roles: role});

        let arr = data.map((item) => {
            return env.root + item.path;
        });


        let miarr = Menu.CP.map(function (item) {
            if (arr.includes(item.path)) {
                item.txt = i18n[item.name.toLowerCase()]
                return item;
            }
        });
        return miarr;

    } catch (err) {
        console.error(err)
        return false;
    }


};


func.Site = async function (role, i18n) {
    if (!role || !i18n) {
        return false
    }
    try {
        let data = await RotesUser.find({roles: role});

        let arr = data.map((item) => {
            return env.root + item.path;
        });


        let miarr = Menu.Site.map(function (item) {
            if (arr.includes(item.path)) {
                item.txt = i18n[item.name.toLowerCase()]
                return item;
            }
        });
        return miarr;

    } catch (err) {
        console.error(err)
        return false;
    }
}

module.exports = func;