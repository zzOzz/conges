const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
global.win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 1024, height: 768,icon: __dirname + '/conges.ico'});

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
  win.webContents.on('did-fail-load' , (event,errorCode,errorDescription,validatedURL,isMainFrame) => {
    console.log("ici:"+win.webContents.getURL()+':'+JSON.stringify(validatedURL))
    var url = require('url');
    var url_parts = url.parse(validatedURL, true);
    var query = url_parts.query;
    console.log("query:"+JSON.stringify(query));
    win.loadURL(`https://hamac.universite-lyon.fr/cgi-bin/WebObjects/Hamac-PPRES.woa/wa/casCallBack?ticket=`+query.ticket);
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