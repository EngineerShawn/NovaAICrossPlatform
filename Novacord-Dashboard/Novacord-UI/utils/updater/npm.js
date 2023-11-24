const fetch = require('node-fetch')
const consolePrefix = `${'['.blue}${'novacord-ui'.yellow}${']'.blue} `

async function npmDashCheck() {
    await npmThemeCheck();
    let failed = 0
    let failed2 = 0

    try {
        await fetch(`https://registry.npmjs.org/discord-dashboard`)
    } catch (error) {
        failed++
        console.log(`${consolePrefix}Failed to check NPM for updates. (DBD)`)
    }

    if (failed === 0) {
        let checkArray = await fetch(`https://registry.npmjs.org/discord-dashboard`);

        try {
            checkArray = await checkArray.json()
        } catch (error) {
            failed2++
            console.log(
                `${consolePrefix}Failed to check NPM for updates. (DBD)`
            )
        }

        if (failed2 === 0) {
            const latestVersion = checkArray['dist-tags'].latest
            const currentVersion = require('discord-dashboard').version
            if (currentVersion < latestVersion) console.log(`${consolePrefix}${'Your version of discord-dashboard is'.cyan} ${'outdated'.red}${'!'.cyan}`);
            else console.log(`${consolePrefix}${'Your version of discord-dashboard is'.cyan} ${'up-to-date'.green}${'!'.cyan}`);
        }
    }
}

async function npmThemeCheck() {
    let failed = 0;
    let failed2 = 0;

    try {
        await fetch(`https://registry.npmjs.org/discord-dashboard`);
    } catch (error) {
        failed++
        console.log(`${consolePrefix}Failed to check NPM for updates. (soft-ui)`);
    }

    if (failed === 0) {
        let checkArray = await fetch(`https://registry.npmjs.org/novacord-ui`)

        try {
            checkArray = await checkArray.json()
        } catch (error) {
            failed2++
            console.log(`${consolePrefix}Failed to check NPM for updates. (soft-ui)`);
        }

        if (failed2 === 0) {
            const latestVersion = checkArray['dist-tags'].latest
            const currentVersion = require('novacord-ui').version
            if (currentVersion < latestVersion) console.log(`${consolePrefix}${'Your version of novacord-ui is'.cyan} ${'outdated'.red}${'!'.cyan}`);
            else console.log(`${consolePrefix}${'Your version of novacord-ui is'.cyan} ${'up-to-date'.green}${'!'.cyan}`);
        }
    }
}

exports.update = async () => {
    await npmDashCheck()
}