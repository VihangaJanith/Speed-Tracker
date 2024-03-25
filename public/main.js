const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
require("@electron/remote/main").initialize();
const os = require("os");
const si = require("systeminformation");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 40,
    // minWidth: 100,
    // minHeight: 300,
    // maxHeight: 100,
    // maxWidth: 300,
    resizable: false,
    x: 0,
    y: 0,
    frame: false,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },

    icon: `${__dirname}/../public/fav1.ico`,

    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.setAlwaysOnTop(true, "screen");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  ipcMain.on("minimize-app", () => {
    win.minimize();
  });

  ipcMain.on("maximize-app", () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.on("close-app", () => {
    win.close();
  });

  ipcMain.on("always-on-topggle", () => {
    win.setAlwaysOnTop(!win.isAlwaysOnTop());
    win.webContents.send("always-on-top-status", win.isAlwaysOnTop());
    console.log("Always on top toggled");
  });
}

app.on("ready", () => {
  createWindow();
  startNetworkSpeedMonitoring();
});

async function startNetworkSpeedMonitoring() {
  const networkInterfaces = os.networkInterfaces();
  let activeInterface = null;

  for (const key in networkInterfaces) {
    const iface = networkInterfaces[key].find(
      (iface) => !iface.internal && iface.family === "IPv4"
    );
    if (iface) {
      activeInterface = iface;
      break;
    }
  }

  if (!activeInterface) {
    console.error("No active network interface found.");
    return;
  }

  const updateBandwidthUsage = async () => {
    try {
      const netStats = await si.networkStats(activeInterface.interfaceName);

      const uploadSpeed = netStats[0].tx_sec;
      const downloadSpeed = netStats[0].rx_sec;

      win.webContents.send("network-speed", { uploadSpeed, downloadSpeed });
    } catch (error) {
      console.error("Error fetching bandwidth usage:", error);
    }
  };

  setInterval(updateBandwidthUsage, 1000);
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
