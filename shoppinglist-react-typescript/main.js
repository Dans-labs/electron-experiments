const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV
process.env.NODE_ENV = 'development';

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function() {
  // Create new window
  mainWindow = new BrowserWindow({show: false});
  // Load html into window
  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'mainWindow.html'),
      protocol: 'file:',
      slashes: true
  }));
  // Show addWindow once it is ready
  mainWindow.once('ready-to-show', () => mainWindow.show());
  // Quit app when closed
  mainWindow.on('closed', function() {
      app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow() {
  // Create new window
  addWindow = new BrowserWindow({
      width: 300,
      height: 200,
      title: 'Add Shopping List Item',
      parent: mainWindow,
      modal: true,
      show: false
  });
  // Load html into window
  addWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'addWindow.html'),
      protocol: 'file:',
      slashes: true
  }));
  // Show addWindow once it is ready
  addWindow.once('ready-to-show', () => addWindow.show());
  // Garbage collection handle
  addWindow.on('closed', function() {
      addWindow = null;
  });
}

// Catch item:add
ipcMain.on('item:add', function(e, item) {
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});
// Catch item:clear
ipcMain.on('item:cancel', () => addWindow.close());

// Create menu template
const mainMenuTemplate = [
  {
      label: 'File',
      submenu: [
          {
              label: 'Add Item',
              accelerator: process.platform == 'darwin' ? 'Command+A' : 'Ctrl+A',
              click() {
                  createAddWindow();
              }
          },
          {
              label: 'Clear Items',
              click() {
                  mainWindow.webContents.send('item:clear');
              }
          },
          {
              label: 'Quit',
              accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
              click() {
                addWindow == null ? app.quit() : addWindow.close();
              }
          }
      ]
  }
];

// If mac, add empty object to menu
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({}); // unshift: add to the beginning of an array
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu: [
          {
              label: 'Toggle DevTools',
              accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
              click(item, focussedWindow) {
                  focussedWindow.toggleDevTools();
              }
          },
          {
              role: 'reload'
          }
      ]
  });
}
