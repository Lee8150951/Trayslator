const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname);

let mainWindow = null;
let tray = null;

const menuTemplate = [
  {
    label: '退出',
    role: 'quit',
    accelerator: 'Command+Q',
    click: () => {
      app.quit();
    },
  },
  {
    label: '重启',
    accelerator: 'Command+R',
    click: () => {
      if (mainWindow !== null) {
        mainWindow.close();
      }
      mainWindow = createWindow();
    },
  },
  { type: 'separator' },
  {
    label: '设置',
    accelerator: 'Command+T',
    click: () => {
      secretWindow();
    },
  },
];

/* 主窗口 */
const createWindow = () => {
  const win = new BrowserWindow({
    title: 'Trayslator',
    width: 350,
    height: 336,
    x: tray.getBounds().x - 125,
    y: tray.getBounds().y + tray.getBounds().height + 5,
    // 关闭菜单栏
    frame: false,
    resizable: false,
  });

  win.setTitle('Trayslator');

  win.loadFile(root + '/build/index.html')
    .then(() => {
      console.log('Load Successfully！');
    });

  // 在窗口关闭时将其设为null，以便再次打开它
  win.on('closed', () => {
    mainWindow = null;
  });

  // 失去焦点时隐藏
  win.on('blur', () => {
    win.hide();
  });

  // 显示窗口
  win.show();

  mainWindow = win;
  return win;
};

/* 此窗口 */
const secretWindow = () => {
  const win = new BrowserWindow({
    title: 'Setting',
    width: 200,
    height: 115,
    x: tray.getBounds().x - 100,
    y: tray.getBounds().y + tray.getBounds().height + 5,
    // 关闭菜单栏
    frame: false,
    resizable: false,
  });

  win.setTitle('Setting');

  win.loadFile(root + '/build/index.html')
    .then(() => {
      const webContents = win.webContents;
      // 加载完成
      webContents.on('did-stop-loading', () => {
        win.webContents.executeJavaScript(`window.location = '#/setting';`).then();
      });
    });

  // 在窗口关闭时将其设为null，以便再次打开它
  win.on('closed', () => {
    mainWindow = null;
  });

  // 失去焦点时隐藏
  win.on('blur', () => {
    win.hide();
  });

  // 显示窗口
  win.show();
};

/* 托盘 */
const createTray = () => {
  tray = new Tray(root + '/icon/menuIconTemplate.png');

  const contextMenu = Menu.buildFromTemplate(menuTemplate);

  // 定义左键鼠标功能
  tray.on('click', (event, bounds) => {
    if (mainWindow === null) {
      createWindow();
    } else {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
    }
  });

  // 定义右键鼠标功能
  tray.on('right-click', (event, bounds) => {
    tray.popUpContextMenu(contextMenu);
  });
};

app.on('ready', () => {
  createTray();
  // 关闭默认菜单
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '重做', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '全选', role: 'selectAll' },
      ],
    },
  ]));
  app.dock.hide();
});