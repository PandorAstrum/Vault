// All required module
'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut; // for shortcuts and dev
const path = require('path');
const url = require('url');

// production settings
// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'debug';

// Keep a global reference of the mainWindowdow object, if you don't, the mainWindowdow will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var subpy = null;

// dirs
var ICON_DIR = './view_electron/assets/res/icon';

// This method will be called when Electron has finished
// initialization and is ready to create browser mainWindow.
// Some APIs can only be used after this event occurs.


    // On resize write to JSON
    // mainWindow.on('resize', () => {
    //     let { width, height } = mainWindow.getBounds();
    //     store.set('settings.windowBounds', { width, height });
    // });
function createWindow(){
	// spawn server
	// subpy = require('child_process').spawn('python', [__dirname + './bin/base_app/run_app.py']);
    subpy = require('child_process').spawn('./bin/py_dist/dist/py_app/py_app.exe')
    // Create the browser mainWindow
    // get window data from settings 
    // let { width, height } = store.get("settings")["windowBounds"];
    // Create new window
    mainWindow = new BrowserWindow({
        // width, 
        // height,
        minWidth: 600,
        minHeight: 550,
        icon: path.join(__dirname, ICON_DIR, 'icon.ico'),
        frame: false,
        show: false,
    });

    mainWindow.webContents.session.clearCache(function() {
    });
    // try to load a base html which will hold another browser to handle the server
    // Load the index page
    mainWindow.loadURL('http://localhost:4040/');
    // mainWindow.loadURL(url.format({
    //     pathname: 'bin/base_app/templates/test_template.html',
    //     protocol: 'file:',
    //     slashes: true
    //   }));   
    // ready the window with load url and show
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    // PRevent right clicking
    mainWindow.webContents.on('dom-ready', function(e){
        e.preventDefault();
        // send info;
        // let data = store.get("component");
        // mainWindow.webContents.send('channel_component', data);

        // send settings tab section status
        // let tab_status = store.get("settings")["tab_section_status"];
        // mainWindow.webContents.send("channel_tab_section_status", tab_status);
    });

    // Open the DevTools.
    if(process.env.NODE_ENV === "debug"){
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

    // Quit app when close
    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

app.on('ready', createWindow)


// app.on('activate', () => {
//     if (mainWindow === null) {
//       createWindow()
//     }
// })

// disable menu
electron.app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});

// ------- app terminated

app.on('window-all-closed', function() {
	// quit app if windows are closed
  app.quit();
});

app.on('quit', function() {
	// kill the python server on exit
  subpy.kill('SIGINT');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});


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






// const storage = require('storage');

// const {app, BrowserWindow, Menu, ipcMain} = electron;



// var TEMPLATE_DIR = './view_electron/template';

// var TEMP = "./test"






// listen for app to close




