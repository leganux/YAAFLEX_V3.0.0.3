//
// for all options visit https://www.npmjs.com/package/javascript-obfuscator
//

const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
}


const fs = require('fs')
const fse = require('fs-extra')
const env = require('./../config/environment.config')
var path = require('path');
const util = require('util');
let dotenv = require('dotenv');
const result = dotenv.config()
var JavaScriptObfuscator = require('javascript-obfuscator');

if (result.error) {
    throw result.error
}

let makeBackUp = async function () {
    console.log('Backing Up Folders.....');
    try {
        for (var i = 0; i < env.list_of_paths.length; i++) {
            var item = env.list_of_paths[i];
            console.log('Backing Up : ', item);
            await fse.copy(item, item + '_' + env.new_dir_suffix)
        }
        return true;
        console.log('Success BackUp finished!')
    } catch (err) {
        console.error(err)
        return false;
    }
};

let obfuscateFiles = async function (list) {
    let howmany = list.length;

    try {
        for (var i = 0; i < howmany; i++) {
            let item = list[i];

            var data = fs.readFileSync(item, 'utf8');

            data = data + '; function _ABOUT_ (){ ' +
                'var micad="PCEtLSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Cj09PT09PT09PT09PT09PT09PT1MRUdBTlVYPT09PT09PT09PT09PT09PT09PQpUaGlzIGFwcCB3YXMgZGV2ZWxvcGVkIHVzaW5nIFlBQUZMRVggMy4wKyBNSVQgbGljZW5zZQpZQUFGTEVYIGlzIGEgcHJvamVjdCBmcm9tIGxlZ2FudXguY29tIChjKTIwMDcgLSAyMDIwCiBjcmVhdGVkIGFuZCBkZXZlbG9wbWVudCBieSBBbmdlbCBFcmljayBDcnV6IE9saXZlcmEuIAoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioKKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqCkZvciBtb3JlIGluZm9ybWF0aW9uIHZpc2l0OiB3d3cubGVnYW51eC5jb20Kb3IgdGV4dCB1cyB0byA6IGhvbGFAbGVnYW51eC5jb20KSWYgeW91IGxpa2UgdGhpcyBwcm9qZWN0IGdpdmV1cyBhIGRvbm5hdGlvbjogZG9uYXIubGVnYW51eC5jb20KPT09PT09PT09PT09PT09PT09PUxFR0FOVVg9PT09PT09PT09PT09PT09PT09Cj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLS0+Cg=="; ' +
                'console.log(window.atob(micad));' +
                '$(document).ready(function(){ $(document.head).append(window.atob(micad)); });' +
                ' } ' +
                '_ABOUT_();';
            console.log('Processing file ' + Number(i + 1) + ' of ' + howmany + ': ', (Number(i + 1) * 100) / howmany + '% ');


            var obfuscationResult = JavaScriptObfuscator.obfuscate(data, obfuscationOptions);

            fs.writeFileSync(item, obfuscationResult.getObfuscatedCode(), 'utf8');

            console.log('File ' + Number(i + 1) + ' done!')
        }
        return true;
    } catch (err) {
        console.error(err)
        return false;
    }

};

let main = async function () {
    console.log('Starting.....');

    let isBackUp = await makeBackUp();
    if (!isBackUp) {
        console.error('We can´t continue cause can´t make a backup')
        return false;
    }

    console.log('Reading list of files.....');
    let completeList = [];
    for (var i = 0; i < env.list_of_paths.length; i++) {
        var item = env.list_of_paths[i];
        let w2 = await walk2(item.trim());
        completeList = completeList.concat(w2);
    }

    let new_complete_list = completeList.map(function (item, i) {
        if (item.includes('.js')) {
            return item;
        }
    });

    console.log('Files for proccesing...', new_complete_list);
    console.log('Starting ofuscation .....');
    let finish = await obfuscateFiles(new_complete_list);

    if (!finish) {
        console.error('An error occurred during obfuscation proccess.');
        return false;
    }

    console.log('SUCCESS!! - Proccess have been done!')

};


main();


const readdir = util.promisify(fs.readdir);
const stat_ = util.promisify(fs.stat);

var walk2 = async function (dir, results) {
    if (!results) {
        results = [];
    }
    try {
        let list = await readdir(dir);
        var pending = list.length;
        if (!pending) {
            return results;
        }
        for (var i = 0; i < list.length; i++) {
            var file = list[i];
            file = await path.resolve(dir, file);
            let stat = await stat_(file);
            if (stat && stat.isDirectory()) {
                let res = await  walk2(file, results);
                results = results.concat(res);
            } else {
                results.push(file);
            }
        }
        return results;
    } catch (err) {
        console.error(err);
        throw  err;
    }
};



