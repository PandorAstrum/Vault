const $ = require('jquery');
const { remote } = require('electron');

var win = remote.getCurrentWindow();

// minimize handle
$('#minimize').on('click', function(){
    win.minimize();
});

// maximize handle
$('#maximize').on('click', function(){
    if (!win.isMaximized()){
        win.maximize();
    } else {
        win.unmaximize();
    }
});

// close handle
$('#close').on('click', function(){
    win.close();
});