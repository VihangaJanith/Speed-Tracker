import React, { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");

const NetworkSpeedMonitor = () => {
  const [networkSpeed, setNetworkSpeed] = useState({
    uploadSpeed: 0.0,
    downloadSpeed: 0.0,
  });
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const zero = 0;
  const formatSpeed = (speed) => {
    if (speed >= 1e6) {
      return `${(speed / 1e6).toFixed(2)} Mb/s`;
    } else if (speed >= 1e3) {
      return `${(speed / 1e3).toFixed(2)} Kb/s`;
    } else {
      return `${zero.toFixed(2)} Kb/s`;
    }
  };

  useEffect(() => {
    ipcRenderer.on("network-speed", (event, data) => {
      const formattedData = {
        uploadSpeed: formatSpeed(data.uploadSpeed),
        downloadSpeed: formatSpeed(data.downloadSpeed),
      };
      setUploading(data.uploadSpeed > 0);
      setDownloading(data.downloadSpeed > 0);

      setNetworkSpeed(formattedData);
    });

    return () => {
      ipcRenderer.removeAllListeners("network-speed");
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-center min-w-36">
        {downloading ? (
          <svg
            fill="#00de34"
            width="20px"
            height="20px"
            className="mr-2 animate-pulse"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
          </svg>
        ) : (
          <svg
            fill="#848484"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
          </svg>
        )}
        <div className="minw-36">
          {downloading ? (
            <div className="text-xs text-white">
              {networkSpeed.downloadSpeed}
            </div>
          ) : (
            <div className="text-xs text-[#848484]">
              {networkSpeed.downloadSpeed}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center min-w-28">
        {uploading ? (
          <svg
            fill="#00de34"
            width="20px"
            height="20px"
            className="mr-2 animate-pulse"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
          </svg>
        ) : (
          <svg
            fill="#848484"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
          </svg>
        )}
        <div className="minw-36">
          {uploading ? (
            <div className="text-xs text-white">{networkSpeed.uploadSpeed}</div>
          ) : (
            <div className="text-xs text-[#848484]">
              {networkSpeed.uploadSpeed}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkSpeedMonitor;
