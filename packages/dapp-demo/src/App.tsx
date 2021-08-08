import { useEffect, useState } from "react";
import { NeoDapi } from "@neongd/neo-dapi";
import { INeoProvider } from "@neongd/neo-provider";
import "./App.css";

interface WindowExtension {
  neo?: INeoProvider;
}

declare const window: Window & WindowExtension;

function App() {
  const [dapi, setDapi] = useState<NeoDapi | null>(null);

  useEffect(() => {
    const dapi = window.neo ? new NeoDapi(window.neo) : null;
    // const dapi = new NeoDapi('http://seed1t4.neo.org:20332');
    setDapi(dapi);
  }, []);

  async function getProvider() {
    console.log(await dapi?.wallet.getProvider());
  }

  async function getAccount() {
    console.log(await dapi?.wallet.getAccount());
  }

  async function getBlockCount() {
    console.log(await dapi?.wallet.getBlockCount({}));
  }

  async function getBlock() {
    console.log(await dapi?.wallet.getBlock({ blockIndex: 21373 }));
  }

  return dapi ? (
    <div>
      <button onClick={getProvider}>getProvider</button>
      <button onClick={getAccount}>getAccount</button>
      <button onClick={getBlockCount}>getBlockCount</button>
      <button onClick={getBlock}>getBlock</button>
    </div>
  ) : (
    <div>Dapi Provider is not available.</div>
  );
}

export default App;
