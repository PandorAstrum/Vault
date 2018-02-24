// All required module
const electron = require('electron');
const url = require('url');
const path = require('path');
// const storage = require('storage');
const globalShortcut = electron.globalShortcut; // for shortcuts and dev
const {app, BrowserWindow, Menu, ipcMain} = electron;
// production settings
// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'test';

let mainWindow = null;
var TEMPLATE_DIR = './template';
var ICON_DIR = './assets/res/icon';

// Main window creation method
function createWindow(){
    // get window data from settings 
    // let { width, height } = store.get("settings")["windowBounds"];
    // Create new window
    mainWindow = new BrowserWindow({
        // width, 
        // height,
        minWidth: 720,
        minHeight: 550,
        icon: path.join(__dirname, ICON_DIR, 'icon.ico'),
        frame: false,
        show: false,
    });

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, TEMPLATE_DIR, 'mainwindow.html'),
        protocol: 'file',
        slashes: true,
    }));
    
        // ready the window with load url and show
        mainWindow.once('ready-to-show', () => {
            mainWindow.show()
        })

    // On resize write to JSON
    // mainWindow.on('resize', () => {
    //     let { width, height } = mainWindow.getBounds();
    //     store.set('settings.windowBounds', { width, height });
    // });

    // Quit app when close
    mainWindow.on('closed', function(){
        mainWindow = null;
    });

    mainWindow.webContents.on('dom-ready', function(e){
        e.preventDefault();
        // send info;
        // let data = store.get("component");
        // mainWindow.webContents.send('channel_component', data);

        // send settings tab section status
        // let tab_status = store.get("settings")["tab_section_status"];
        // mainWindow.webContents.send("channel_tab_section_status", tab_status);
    });

    // for dev only
    if(process.env.NODE_ENV === "test"){
        globalShortcut.register('CommandOrControl+I', () => {
            mainWindow.openDevTools({
                detach: true
            });
        });
        globalShortcut.register('CommandOrControl+R', ()=> {
            mainWindow.reload();
        });
    } else {
        // return false;
        mainWindow.onbeforeunload = (e) => {
            // Prevent Command-R from unloading the window contents.
            e.returnValue = false
          }
    }
}


// listen for the app to be ready
app.on('ready', createWindow);

// listen for app to close
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
})



// Shortcuts unregistering on quit
app.on('will-quit', () => {

    if(process.env.NODE_ENV === "test"){
        // Unregister a shortcut.
        globalShortcut.unregister('CommandOrControl+I');
        globalShortcut.unregister('CommandOrControl+R');
    
        // Unregister all shortcuts.
        globalShortcut.unregisterAll()
    } else {
        return false;
    }
    
})