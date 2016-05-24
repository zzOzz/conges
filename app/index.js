if (require('electron-squirrel-startup')) return;
const $ = require('jquery');
const electron = require('electron');
// Module to control application life.
const {
    app
} = electron;
// Module to create native browser window.
const {
    BrowserWindow
} = electron;
var popup=false;

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            app.quit();
            return true;
    }
};







// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
global.win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: __dirname + '/conges.ico'
    });

    // and load the index.html of the app.
    // win.loadURL(`file://${__dirname}/index.html`);
    //win.loadURL(`https://buzit.servers.ec-lyon.fr/cgi-bin/WebObjects/Hamac-PPRES.woa`);
    win.loadURL(`https://hamac.universite-lyon.fr/cgi-bin/WebObjects/Hamac-PPRES.woa`);
    // win.loadURL(`http://www.google.fr`);

    // Open the DevTools.
    // win.webContents.openDevTools();
    console.log('coook');
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
        console.log("ici:" + win.webContents.getURL() + ':' + JSON.stringify(validatedURL))
        var url = require('url');
        var url_parts = url.parse(validatedURL, true);
        var query = url_parts.query;
        console.log("query:" + JSON.stringify(query));
        win.loadURL(`https://hamac.universite-lyon.fr/cgi-bin/WebObjects/Hamac-PPRES.woa/wa/casCallBack?ticket=` + query.ticket);
    });
    win.webContents.on('new-window', (event, url, frameName, disposition, options) => {

        console.log('new-window');
        console.log('url=' + url);
        // console.log('fram:'+frameName);
        // console.log('dispo:'+disposition);
        console.log('options'+JSON.stringify(options));
        // console.log(event);
        // event.sender.openDevTools();
        // if (!popup) {
            // popup=true;
            console.log('goooo');
            event.preventDefault();
            // const code = `
            // var popupHamac = window.open('`+url+`');
            // `
            // event.sender.executeJavaScript(code);
            // event.sender.openDevTools();

            var popupHamac = new BrowserWindow({
                width: options.width,
                height: options.height,
                icon: __dirname + '/conges.ico'
            });
            popupHamac.loadURL(url);
            // popupHamac.openDevTools();

            const code = `
            console.log('cool')

            // if (bound) return;
            // bound = true;
            var forms = document.getElementsByTagName("form");
            for (var a = 0; a < forms.length; a++) {
                var form = forms[a];
                console.log(form.getAttribute('action'));
                var oldAction= form.getAttribute('action');
                form.setAttribute("action",oldAction.replace('https://hamac.universite-lyon.fr, buzit.servers.ec-lyon.fr' ,'https://hamac.universite-lyon.fr'));
                // if (form.getAttribute('action') == 'content_frame') {
                //     console.log(form.getAttribute('action'));
                // }
            }
            `
            popupHamac.webContents.executeJavaScript(code);




        // } else {

        // }
        // console.log(win.getAllWindows());
        // win.getAllWindows()[1].openDevTools();
        // event.preventDefault();
        // win.w
        // event.sender.EventEmitter.openDevTools();



    })
    win.webContents.on('dom-ready', () => {

        console.log(win);

        console.log('ok');
        // win.webContents.findInPage('https://hamac.universite-lyon.fr, buzit.servers.ec-lyon.fr');
        // win.openDevTools();

        const code = `
        console.log('cool')

        // if (bound) return;
        // bound = true;
        var forms = document.getElementsByTagName("form");
        for (var a = 0; a < forms.length; a++) {
            var form = forms[a];
            console.log(form.getAttribute('action'));
            var oldAction= form.getAttribute('action');
            form.setAttribute("action",oldAction.replace('https://hamac.universite-lyon.fr, buzit.servers.ec-lyon.fr' ,'https://hamac.universite-lyon.fr'));
            // if (form.getAttribute('action') == 'content_frame') {
            //     console.log(form.getAttribute('action'));
            // }
        }
        `
        win.webContents.executeJavaScript(code);




    });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
