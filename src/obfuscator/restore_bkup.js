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


if (result.error) {
    throw result.error
}

let makeBackUp = async function () {
    console.log('Restoring Backing Up Folders.....');
    try {
        for (var i = 0; i < env.list_of_paths.length; i++) {
            var item = env.list_of_paths[i];
            console.log('Restoring Back Up : ', item + '_' + env.new_dir_suffix);
            await fse.copy(item + '_' + env.new_dir_suffix, item)
            await fse.removeSync(item + '_' + env.new_dir_suffix)

        }
        return true;
        console.log('Success Restore finished!')
    } catch (err) {
        console.error(err)
        return false;
    }
};


let main = async function () {
    console.log('Starting.....');

    let isBackUp = await makeBackUp();
    if (!isBackUp) {
        console.error('We can´t continue cause can´t restore a backup')
        return false;
    }

    console.log('SUCCESS!! - Proccess have been done!')

};


main();



