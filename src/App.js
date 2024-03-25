import { useState } from "react";
import NetworkSpeedMonitor from "./Components/NetworkSpeedMonitor";
const { ipcRenderer } = window.require("electron");

function App() {
  const [alwaysOnTop, setAlwaysOnTop] = useState(true);

  return (
    <div className="bg-[#1a1a1a] text-white pe-2 py-2 top-0 sticky  drag">
      <div>
        <div className={`flex items-center justify-end space-x-2`}>
          <div>
            <NetworkSpeedMonitor />
          </div>
          <div
            title={alwaysOnTop ? "Unpin" : "Pin"}
            class={` ${
              alwaysOnTop
                ? "bg-blue-900 hover:bg-blue-600"
                : "bg-gray-900 hover:bg-gray-600 "
            }   rounded-lg p-1 cursor-pointer no-drag`}
            onClick={() => {
              ipcRenderer.send("always-on-topggle");
              setAlwaysOnTop(!alwaysOnTop);
            }}
          >
            <svg
              class="w-4 h-4 text-red-500 hover:text-orange-50"
              viewBox="0 0 24 24"
              fill="#fff"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                class="cls-1"
                points="2.77 20.53 8.78 13.81 10.19 15.22 3.47 21.23 2.77 20.53 2.77 20.53"
              />
              <path
                class="cls-2"
                d="M13.73,18.76,5.24,10.27A5.94,5.94,0,0,1,9.48,8.52,5.42,5.42,0,0,1,11,8.73L14.5,5.26a1.49,1.49,0,0,1,2-2,1.32,1.32,0,0,1,.42.29l3.53,3.53a1.32,1.32,0,0,1,.29.42,1.49,1.49,0,0,1-2,2L15.27,13a5.42,5.42,0,0,1,.21,1.55A5.94,5.94,0,0,1,13.73,18.76Z"
              />
            </svg>
          </div>

          <div
            title="Close"
            class=" hover:bg-red-600 hover:text-orange-50 rounded-lg p-1 cursor-pointer no-drag"
            onClick={() => ipcRenderer.send("close-app")}
          >
            <svg
              class="w-4 h-4 text-red-500 hover:text-orange-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
