import { useState, useRef, useEffect } from "react";
// import './App.css';
// import './index.css'
// import "bootstrap/dist/css/bootstrap.css";
import "@mysten/dapp-kit/dist/index.css";
import {
  useCurrentAccount,
  useSignPersonalMessage,
  useCurrentWallet,
  ConnectButton,
} from "@mysten/dapp-kit";
// import { ConnectButton } from "@mysten/dapp-kit";
import { Tusky } from "@tusky-io/ts-sdk/web";

import Mozzart from "@/mock/mozart_28years.json";
console.log(Mozzart);

function App() {
  const [tusky, setTusky] = useState<Tusky | null>();
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(Mozzart, null, 2));

  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const account = useCurrentAccount();
  const wallet = useCurrentWallet();

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (message: string, methodCall?: string) => {
    const timestamp = new Date().toLocaleTimeString();
    if (methodCall) {
      setLogs((prev) => [
        ...prev,
        `${timestamp}: ${message}`,
        `  → ${methodCall}`,
      ]);
    } else {
      setLogs((prev) => [...prev, `${timestamp}: ${message}`]);
    }
  };

  const handleSignInWithWallet = async () => {
    if (account) {
      addLog(
        "Initializing Tusky with wallet...",
        "Tusky.init({ wallet: { signPersonalMessage, account } })"
      );
      const tusky = new Tusky({
        wallet: { signPersonalMessage, account: account as any },
      });
      addLog("Signing in with wallet...", "tusky.auth.signIn()");
      await tusky.auth.signIn();
      addLog("Setting up encryption context...");
      await handleEncryptionContext(tusky);
      addLog(
        "Adding keystore encrypter...",
        "tusky.addEncrypter({ keystore: true })"
      );
      await tusky.addEncrypter({ keystore: true });
      setTusky(tusky);
      addLog("Successfully signed in with wallet");
    }
  };

  const handleSignOut = async () => {
    if (tusky) {
      addLog("Signing out...", "tusky.signOut()");
      tusky.signOut();
      setTusky(null);
      addLog("Successfully signed out");
    }
  };

  const handleEncryptionContext = async (tusky: Tusky) => {
    const password = window.prompt("Please enter your password:");
    if (!password) {
      throw new Error("Password input canceled.");
    }
    addLog(
      "Adding password encrypter...",
      'tusky.addEncrypter({ password: "***", keystore: true })'
    );
    await tusky.addEncrypter({ password: password, keystore: true });
  };

  //   const handleUpload = async (files: FileList | null) => {
  //     if (!tusky) {
  //       throw new Error("Tusky SDK not initialized");
  //     }
  //     if (!files || !files.length) {
  //       throw new Error("Failed uploading the file");
  //     }
  //     const file = files[0];
  //     const vaultName = "from React starter";
  //     try {
  //       addLog("Listing vaults...", "tusky.vault.listAll()");
  //       const vaults = await tusky.vault.listAll();
  //       const starterVault = vaults.find((vault) => vault.name === vaultName);
  //       let vaultId = starterVault?.id as string;
  //       if (!starterVault) {
  //         addLog(
  //           `Creating new vault: ${vaultName}`,
  //           `tusky.vault.create("${vaultName}", { encrypted: true })`
  //         );
  //         const { id } = await tusky.vault.create(vaultName, { encrypted: true });
  //         vaultId = id;
  //       }
  //       addLog(
  //         `Uploading file to vault: ${vaultId}`,
  //         `tusky.file.upload("${vaultId}", file)`
  //       );
  //       const fileId = await tusky.file.upload(vaultId, file);
  //       addLog(`Downloading file: ${fileId}`, `tusky.file.download("${fileId}")`);
  //       await tusky.file.download(fileId);
  //       addLog("File operation completed");
  //     } catch (error) {
  //       console.error(error);
  //       addLog(`Error: ${error}`);
  //     } finally {
  //       setTusky(null);
  //     }
  //   };

  const handleUpload = async () => {
    if (!tusky) {
      throw new Error("Tusky SDK not initialized");
    }
    // if (!files || !files.length) {
    //   throw new Error("Failed uploading the file");
    // }

    // JSON: parse edited text first
    let jsonObj: any;
    try {
      jsonObj = JSON.parse(jsonText);
    } catch (e) {
      addLog('Invalid JSON: ' + (e as Error).message);
      return;
    }
    const jsonStr = JSON.stringify(jsonObj);

    // File 객체로 변환
    const file = new File([jsonStr], "AICharacter.json", {
      type: "application/json",
    });
    // const file = {
    //     "hello":"world"
    // }
    const vaultName = "from React starter";
    try {
      addLog("Listing vaults...", "tusky.vault.listAll()");
      const vaults = await tusky.vault.listAll();
      const starterVault = vaults.find((vault) => vault.name === vaultName);
      let vaultId = starterVault?.id as string;
      if (!starterVault) {
        addLog(
          `Creating new vault: ${vaultName}`,
          `tusky.vault.create("${vaultName}", { encrypted: true })`
        );
        const { id } = await tusky.vault.create(vaultName, { encrypted: true });
        vaultId = id;
      }
      addLog(
        `Uploading file to vault: ${vaultId}`,
        `tusky.file.upload("${vaultId}", file)`
      );
      const fileId = await tusky.file.upload(vaultId, file);
      addLog(`Downloading file: ${fileId}`, `tusky.file.download("${fileId}")`);
      await tusky.file.download(fileId);
      addLog("File operation completed");
    } catch (error) {
      console.error(error);
      addLog(`Error: ${error}`);
    } finally {
      setTusky(null);
    }
  };

  return (
    <div className="App container py-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-light">
              <h6 className="mb-0">Edit JSON</h6>
            </div>
            <div className="card-body p-2">
              <textarea
                className="form-control"
                style={{ fontFamily: 'monospace', minHeight: '300px' }}
                value={jsonText}
                onChange={e => setJsonText(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column">
          <div className="card shadow-sm p-4 mb-4" style={{ width: '100%' }}>
            <div className="text-center mb-4">
              <h1 className="h4 mb-3">Tusky SDK Demo</h1>
              <ConnectButton className="mb-3" />
            </div>

            {!tusky ? (
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleSignInWithWallet}>
                  Sign in with Wallet
                </button>
              </div>
            ) : (
              <div className="d-grid gap-3">
                <div className="text-center">
                  <button className="btn btn-outline-success" onClick={handleUpload}>
                    Upload File
                  </button>
                </div>
                <button className="btn btn-outline-danger" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>

          <div className="card shadow-sm" style={{ width: '100%' }}>
            <div className="card-header bg-light">
              <h6 className="mb-0">SDK Method Calls</h6>
            </div>
            <div className="card-body p-2">
              <div className="logs-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {logs.map((log, index) => (
                  <div key={index} className={`log-entry small ${log.startsWith('  →') ? 'text-primary' : 'text-muted'}`}>
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
