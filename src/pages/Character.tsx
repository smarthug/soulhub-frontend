import React from "react";
import { Link, useParams } from "react-router-dom";
import { SafetySeal } from "@/components/ai/SafetySeal";
import { IngredientTable } from "@/components/ai/IngredientTable";
import { CommitTimeline } from "@/components/ai/CommitTimeline";
import { Button } from "@/components/common/Button";
import { JsonEditor } from "@/components/forms/JsonEditor";
import Ein from '@/mock/einstein_28years.json'
import Mermaid from "@/components/common/Mermaid";
import { useAccount, useWalletClient, useSwitchChain, useConnectorClient } from "wagmi";
import { abi, CONTRACT_ADDRESS } from "@/lib/erc1155";

import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  http,
} from "viem";
import { flowTestnet } from "viem/chains";

// import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
// import { WalrusClient } from '@mysten/walrus';

// const suiClient = new SuiClient({
// 	url: getFullnodeUrl('testnet'),
// });

// const walrusClient = new WalrusClient({
// 	network: 'testnet',
// 	suiClient,
// });

// const mmd = `
// flowchart LR
//   c1["c1: init"] --> c2["c2: add character json"]
//   c2 --> c3["c3: feature/safety"]
//   c3 --> c4["c4: add safety tags"]
//   c2 --> c5["c5: feature/ingredients"]
//   c5 --> c6["c6: ingredients table"]
//   c2 --> c7["c7: merge safety + ingredients"]
//   c4 --> c7
//   c6 --> c7
//   c7 --> c8["c8: docs: README"]
// `;

// const mmd = `
// flowchart TD
//   c1["c1: init character base"]
//   c2["c2: add friendly tone"]
//   c3["c3: branch: humor-mode"]
//   c4["c4: refine humor responses"]
//   c5["c5: branch: strict-mode"]
//   c6["c6: enforce concise replies"]
//   c7["c7: merge humor + strict personality"]
//   c8["c8: add empathy layer"]
//   c9["c9: safety review + seal A"]

//   c1 --> c2
//   c2 --> c3
//   c3 --> c4
//   c2 --> c5
//   c5 --> c6
//   c2 --> c7
//   c4 --> c7
//   c6 --> c7
//   c7 --> c8
//   c8 --> c9
// `;

// const mmd = `
// flowchart TD
//   %% ========== Legend ==========
//   classDef base fill:#e2e8f0,stroke:#94a3b8,color:#0f172a
//   classDef humor fill:#dbeafe,stroke:#60a5fa,color:#0c4a6e
//   classDef strict fill:#fee2e2,stroke:#f87171,color:#7f1d1d
//   classDef empathy fill:#dcfce7,stroke:#34d399,color:#065f46
//   classDef creative fill:#fae8ff,stroke:#d946ef,color:#701a75
//   classDef expert fill:#fef9c3,stroke:#facc15,color:#713f12
//   classDef merge fill:#e9d5ff,stroke:#a78bfa,color:#3730a3
//   classDef review fill:#f1f5f9,stroke:#475569,color:#0f172a,stroke-width:2px

//   %% ========== Base ==========
//   c1["c1: Initialize character base"]:::base
//   c2["c2: Add friendly tone"]:::base
//   c1 --> c2

//   %% ========== Humor Branch ==========
//   subgraph Humor
//     direction TB
//     c3["c3: branch: humor-mode"]:::humor
//     c4["c4: Refine humor responses"]:::humor
//     c3 --> c4
//   end

//   %% ========== Strict Branch ==========
//   subgraph Strict
//     direction TB
//     c5["c5: branch: strict-mode"]:::strict
//     c6["c6: Enforce concise replies"]:::strict
//     c5 --> c6
//   end

//   %% ========== Empathy Branch ==========
//   subgraph Empathy
//     direction TB
//     c7["c7: branch: empathy-mode"]:::empathy
//     c8["c8: Add supportive phrases"]:::empathy
//     c7 --> c8
//   end

//   %% ========== Creative Branch ==========
//   subgraph Creative
//     direction TB
//     c9["c9: branch: creative-mode"]:::creative
//     c10["c10: Metaphors & storytelling"]:::creative
//     c9 --> c10
//   end

//   %% ========== Expert Branch ==========
//   subgraph Expert
//     direction TB
//     c11["c11: branch: expert-mode"]:::expert
//     c12["c12: Add technical depth"]:::expert
//     c11 --> c12
//   end

//   %% ========== Wire roots from base ==========
//   c2 --> c3
//   c2 --> c5
//   c2 --> c7
//   c2 --> c9
//   c2 --> c11

//   %% ========== Merges ==========
//   c13["c13: Merge humor + strict"]:::merge
//   c4 --> c13
//   c6 --> c13

//   c14["c14: Merge empathy + creativity"]:::merge
//   c8 --> c14
//   c10 --> c14

//   c15["c15: Unified multi-trait personality"]:::merge
//   c13 --> c15
//   c14 --> c15
//   c12 --> c15

//   c16["c16: Safety review + Seal A"]:::review
//   c15 --> c16
// `;

const mmd = `
flowchart TD
  %% Styles
  classDef base fill:#e2e8f0,stroke:#94a3b8,color:#0f172a
  classDef humor fill:#dbeafe,stroke:#60a5fa,color:#0c4a6e
  classDef strict fill:#fee2e2,stroke:#f87171,color:#7f1d1d
  classDef empathy fill:#dcfce7,stroke:#34d399,color:#065f46
  classDef creative fill:#fae8ff,stroke:#d946ef,color:#701a75
  classDef expert fill:#fef9c3,stroke:#facc15,color:#713f12
  classDef hybrid fill:#e9d5ff,stroke:#a78bfa,color:#3730a3

  %% Base
  c1["c1: Initialize base character"]:::base
  c2["c2: Add friendly tone"]:::base
  c1 --> c2

  %% Independent branches
  c2 --> h1["h1: branch/humor-mode"]:::humor
  h1 --> h2["h2: More witty jokes"]:::humor

  c2 --> s1["s1: branch/strict-mode"]:::strict
  s1 --> s2["s2: Precise, short answers"]:::strict

  c2 --> e1["e1: branch/empathy-mode"]:::empathy
  e1 --> e2["e2: Supportive mentor style"]:::empathy

  c2 --> cr1["cr1: branch/creative-mode"]:::creative
  cr1 --> cr2["cr2: Storytelling & metaphors"]:::creative

  c2 --> ex1["ex1: branch/expert-mode"]:::expert
  ex1 --> ex2["ex2: Technical deep-dive"]:::expert

  %% Optional hybrid merges
  e2 --> he1["he1: Playful Mentor (Humor+Empathy)"]:::hybrid
  cr2 --> ce1["ce1: Visionary Storyteller (Creative+Expert)"]:::hybrid

  %% No single merge point – branches evolve separately
`;

export default function Character() {
  const { id } = useParams();
  // no-op: mint handled imperatively via viem wallet client on click
  // Harmfulness categories

  // Harmfulness categories
  const harmfulness = [
    { key: "Horror", color: "bg-purple-200" },
    { key: "Violence", color: "bg-red-200" },
    { key: "Sexuality", color: "bg-pink-200" },
    { key: "Inappropriate Language", color: "bg-yellow-200" },
    { key: "Drugs", color: "bg-green-200" },
    { key: "Crime", color: "bg-gray-200" },
    { key: "Gambling", color: "bg-blue-200" },
  ];

  // Example commit data with age rating and harmfulness
  const commits = [
    {
      id: "a1b2c3d",
      message: "Initial character json",
      when: "2025-08-14",
      safety: "B" as "A" | "B" | "C" | "D",
      age: "12+",
      ingredients: [
        {
          type: "dataset" as "dataset",
          source: "OpenDialog v1",
          license: "CC-BY-4.0",
        },
        { type: "model" as "model", source: "LLM-X 8B", license: "Apache-2.0" },
        { type: "prompt" as "prompt", source: "system: role-playing guide" },
      ],
      harmful: ["Violence", "Inappropriate Language"],
    },
    {
      id: "e4f5g6h",
      message: "Add safety tags",
      when: "2025-08-15",
      safety: "A" as "A" | "B" | "C" | "D",
      age: "All",
      ingredients: [
        {
          type: "dataset" as "dataset",
          source: "OpenDialog v2",
          license: "CC-BY-4.0",
        },
        { type: "model" as "model", source: "LLM-X 8B", license: "Apache-2.0" },
        { type: "prompt" as "prompt", source: "system: role-playing guide" },
      ],
      harmful: [],
    },
  ];

  /**
   * Returns ingredients in current that are not in prev
   * @param {Array} current
   * @param {Array} prev
   */
  const diffIngredients = (current: any[], prev: any[]) => {
    const serialize = (ing: any) =>
      `${ing.type}|${ing.source}|${ing.license ?? ""}`;
    const prevSet = new Set(prev.map(serialize));
    return current.filter((ing: any) => !prevSet.has(serialize(ing)));
  };

  // Tab state
  const [tab, setTab] = React.useState("git");

  // Branch state (mock)
  const [branch, setBranch] = React.useState("main");
  const [showBranchList, setShowBranchList] = React.useState(false);
  // Extract all node labels from mmd string
  const nodeLabelRegex = /([a-z]+\d+)\["([^"]+)"/g;
  const foundNodes = Array.from(mmd.matchAll(nodeLabelRegex)).map(
    (match) => match[2]
  );
  const branches = ["main", ...foundNodes];

  // Example data for other tabs
  const persona = "Friendly mentor, guides users with empathy and expertise.";
  const prompt =
    "You are a helpful AI character. Always provide clear, safe, and supportive answers.";

  // Use a mock character JSON from the mock folder for the Prompting tab
  const [charJsonText, setCharJsonText] = React.useState(
    JSON.stringify(Ein, null, 2)
  )

  // Mock mermaid git graph
  const mermaidGraph = `
      gitGraph:
        commit id: "a1b2c3d" tag: "v1" message: "Initial character json"
        commit id: "e4f5g6h" message: "Add safety tags"
        branch feature
        commit id: "f7g8h9i" message: "Experiment persona"
        checkout main
        merge feature
    `;

  return (
    <section className="max-w-5xl mx-auto space-y-8">
      {/* Tab Navigation */}
      <div className="border-b mb-6">
        <nav className="flex gap-2">
          <button
            className={`px-4 py-2 font-medium rounded-t-md ${
              tab === "git"
                ? "bg-white border-x border-t border-b-0"
                : "bg-slate-100"
            }`}
            onClick={() => setTab("git")}
          >
            Git Graph
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-md ${
              tab === "ingredients"
                ? "bg-white border-x border-t border-b-0"
                : "bg-slate-100"
            }`}
            onClick={() => setTab("ingredients")}
          >
            Ingredients
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-md ${
              tab === "prompt"
                ? "bg-white border-x border-t border-b-0"
                : "bg-slate-100"
            }`}
            onClick={() => setTab("prompt")}
          >
            Prompting
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-md ${
              tab === "personality"
                ? "bg-white border-x border-t border-b-0"
                : "bg-slate-100"
            }`}
            onClick={() => setTab("personality")}
          >
            Personality
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-md ${
              tab === "harm"
                ? "bg-white border-x border-t border-b-0"
                : "bg-slate-100"
            }`}
            onClick={() => setTab("harm")}
          >
            Harmfulness Levels
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-md ${
              tab === "used"
                ? "bg-white border-x border-t border-b-0"
                : "bg-slate-100"
            }`}
            onClick={() => setTab("used")}
          >
            Used By
          </button>
        </nav>
      </div>

      {/* Character Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{id}</h1>
          <p className="text-slate-600 mt-1">
            Description text — character's purpose/personality/guide
          </p>
          <div className="mt-3">
            <SafetySeal level="B" tags={["language", "violence"]} />
          </div>
        </div>
        <div className="flex gap-2 items-center relative">
          {/* Branch Selector */}
          <div className="relative">
            <button
              className="px-3 py-1 rounded-2xl border bg-white text-sm font-medium flex items-center gap-1 hover:bg-slate-50"
              onClick={() => setShowBranchList((v) => !v)}
              aria-label="Select branch"
            >
              <span className="font-mono">{branch}</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                <path
                  d="M6 8l4 4 4-4"
                  stroke="#555"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {showBranchList && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                {branches.map((b) => (
                  <button
                    key={b}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                      b === branch ? "font-bold text-brand-700" : ""
                    }`}
                    onClick={() => {
                      setBranch(b);
                      setShowBranchList(false);
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to={`/commit/${id}`}
            className="text-sm text-brand-600 hover:underline"
          >
            <Button>Fork</Button>
          </Link>
          <Button variant="ghost">Run API Demo</Button>
        </div>
      </header>

      {/* Tab Content */}
      <section>
        <h2 className="font-semibold mb-4">Mint NFT</h2>
        <div className="border rounded-2xl p-4 bg-white">
          <div className="flex gap-3 items-center">
            <label className="text-sm">Token ID</label>
            <input
              id="tokenId"
              defaultValue={1}
              className="border rounded px-2 py-1 w-24"
            />
            <label className="text-sm">Amount</label>
            <input
              id="amount"
              defaultValue={1}
              className="border rounded px-2 py-1 w-24"
            />
            <MintButton />
          </div>
        </div>
      </section>
      {tab === "git" && (
        <section>
          <h2 className="font-semibold mb-4">Git Graph</h2>
          <div className="border rounded-2xl p-4 bg-white">
            <Mermaid chart={mmd} />
          </div>
        </section>
      )}

      {tab === "ingredients" && (
        <section>
          <h2 className="font-semibold mb-4">Ingredients</h2>
          <IngredientTable rows={commits[commits.length - 1].ingredients} />
        </section>
      )}

      {tab === "prompt" && (
        <section>
          <h2 className="font-semibold mb-4">Prompting</h2>
          <div className="border rounded-2xl p-4 bg-white text-slate-700 text-sm">
            <div className="mb-4 text-sm">{prompt}</div>
            <div className="mt-2">
              <JsonEditor value={charJsonText} onChange={() => {}} />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  className="px-3 py-1 rounded bg-slate-100 text-sm"
                  onClick={() => navigator.clipboard?.writeText(charJsonText)}
                >
                  Copy JSON
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              onClick={async () => {
                console.log("clicked");
              }}
              variant="primary"
            >
              Commit
            </Button>
          </div>
        </section>
      )}

      {tab === "personality" && (
        <section>
          <h2 className="font-semibold mb-4">Personality</h2>
          <div className="border rounded-2xl p-4 bg-white text-slate-700 text-sm">
            {persona}
          </div>
        </section>
      )}

      {tab === "harm" && (
        <section>
          <h2 className="font-semibold mb-4">Harmfulness Levels</h2>
          <div className="border rounded-2xl p-4 bg-white">
            <div className="flex gap-2 flex-wrap">
              {harmfulness.map((h) => (
                <span
                  key={h.key}
                  className={`inline-flex items-center px-3 py-2 rounded text-sm font-medium ${h.color}`}
                >
                  {h.key}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-400 mt-2">
              * These levels are used for intuitive safety marking.
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

function MintButton() {
  const { address } = useAccount();



  const { data: walletClient } = useWalletClient();
  const { switchChain } = useSwitchChain?.() as any;

  const [isMinting, setIsMinting] = React.useState(false);
  const [txHash, setTxHash] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const desiredChainId = 1; // mainnet

  // const handleMint = async () => {
  //   const tokenIdEl = document.getElementById('tokenId') as HTMLInputElement
  //   const amountEl = document.getElementById('amount') as HTMLInputElement
  //   const id = Number(tokenIdEl.value || 1)
  //   const amt = Number(amountEl.value || 1)

  //   try {
  //     setError(null)
  //     setTxHash(null)

  //     if (!address) {
  //       setError('Please connect your wallet first')
  //       return
  //     }
  //     if (!walletClient) {
  //       setError('Wallet client not ready')
  //       return
  //     }

  //     const currentChainId = Number((window as any)?.ethereum?.chainId ?? 0)

  //     setIsMinting(true)

  //     // simulate via publicClient to obtain a request object for writeContract
  //     let request: any
  //     try {
  //       const sim = await (publicClient as any).simulateContract({
  //         account: address as `0x${string}`,
  //         address: CONTRACT_ADDRESS as `0x${string}`,
  //         abi: abi as any,
  //         functionName: 'mint',
  //         args: [address as `0x${string}`, BigInt(id), BigInt(amt), '0x'],
  //       })
  //       request = (sim as any).request ?? sim
  //     } catch (simErr) {
  //       setIsMinting(false)
  //       console.error('simulation failed', simErr)
  //       setError('Simulation failed: ' + ((simErr as any)?.message ?? String(simErr)))
  //       return
  //     }

  //     // send transaction using the wallet client with the prepared request
  //     let tx: `0x${string}`
  //     try {
  //       tx = await (walletClient as any).writeContract(request)
  //       setTxHash(String(tx))
  //       // attempt to fetch receipt (may be null until mined)
  //       try {
  //         const receipt = await (publicClient as any).getTransactionReceipt({ hash: tx })
  //         console.log('Transaction receipt:', receipt)
  //       } catch (rcptErr) {
  //         console.warn('Could not fetch receipt immediately:', rcptErr)
  //       }
  //     } catch (sendErr) {
  //       console.error('Failed to send transaction:', sendErr)
  //       setError('Failed to send transaction: ' + ((sendErr as any)?.message ?? String(sendErr)))
  //     } finally {
  //       setIsMinting(false)
  //     }
  //   } catch (e) {
  //     console.error('mint error', e)
  //     setError((e as any)?.message ?? String(e))
  //     setIsMinting(false)
  //   }
  // }

  const handleMint = async () => {
    const publicClient = createPublicClient({
      chain: flowTestnet,
      transport: http()
    })
    // const walletClient = createWalletClient({
    //   chain: flowTestnet,
    //   transport: custom()
    // })

    const erc1155Address =  CONTRACT_ADDRESS as `0x${string}`;
    console.log('ERC1155 address:', erc1155Address);

    const abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }]

    try {
      setError(null)
      setTxHash(null)
      setIsMinting(true)

      if (!walletClient) {
        setError('Wallet client not ready')
        return
      }

      const addresses = await (walletClient as any).getAddresses()
      const account = addresses?.[0]
      if (!account) {
        setError('No account available from wallet')
        return
      }

      const { request } = await publicClient.simulateContract({
        account,
        address: erc1155Address,
        abi: abi,
        functionName: 'mint',
        args: ['0xfa6Cc5134a2e81a2F19113992Ef61F9BE81cafdE', 0, 1, ""]
      })

      let tx: `0x${string}`;
      try {
        tx = await (walletClient as any).writeContract(request)
        console.log('Transaction hash:', tx);
        setTxHash(String(tx))
        const receipt = await publicClient.getTransactionReceipt({ hash: tx });
        console.log('Transaction receipt:', receipt);
      } catch (error: any) {
        console.error('Failed to send transaction:', error);
        setError(error?.message ?? String(error))
      }
    } catch (e: any) {
      console.error('mint flow error', e)
      setError(e?.message ?? String(e))
    } finally {
      setIsMinting(false)
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        id="mintBtn"
        className={`ml-auto px-4 py-2 rounded text-white ${
          isMinting ? "bg-slate-400" : "bg-brand-600 hover:bg-brand-700"
        }`}
        onClick={handleMint}
        disabled={isMinting}
      >
        {isMinting ? "Minting…" : "Mint"}
      </button>

      {/* Status / link */}
      <div className="text-sm">
        {txHash && (
          <div>
            <a
              className="text-brand-600 underline"
              href={getExplorerTxUrl(
                Number((window as any)?.ethereum?.chainId ?? desiredChainId),
                txHash
              )}
              target="_blank"
              rel="noreferrer"
            >
              View tx
            </a>
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
}

// function MintButton2() {
//   const { address } = useAccount()

//       const publicClient = createPublicClient({
//       chain: flowTestnet,
//       transport: http()
//     })

//   const { data: walletClient } = useWalletClient()
//   const { switchChain } = useSwitchChain?.() as any

//   const [isMinting, setIsMinting] = React.useState(false)
//   const [txHash, setTxHash] = React.useState<string | null>(null)
//   const [error, setError] = React.useState<string | null>(null)

//   const desiredChainId = 1 // mainnet

//   const handleMint = async () => {
//     const tokenIdEl = document.getElementById('tokenId') as HTMLInputElement
//     const amountEl = document.getElementById('amount') as HTMLInputElement
//     const id = Number(tokenIdEl.value || 1)
//     const amt = Number(amountEl.value || 1)

//     try {
//       setError(null)
//       setTxHash(null)

//       if (!address) {
//         setError('Please connect your wallet first')
//         return
//       }
//       if (!walletClient) {
//         setError('Wallet client not ready')
//         return
//       }

//       const currentChainId = Number((window as any)?.ethereum?.chainId ?? 0)

//       setIsMinting(true)

//       // simulate via publicClient to obtain a request object for writeContract
//       let request: any
//       try {
//         const sim = await (publicClient as any).simulateContract({
//           account: address as `0x${string}`,
//           address: CONTRACT_ADDRESS as `0x${string}`,
//           abi: abi as any,
//           functionName: 'mint',
//           args: [address as `0x${string}`, BigInt(id), BigInt(amt), '0x'],
//         })
//         request = (sim as any).request ?? sim
//       } catch (simErr) {
//         setIsMinting(false)
//         console.error('simulation failed', simErr)
//         setError('Simulation failed: ' + ((simErr as any)?.message ?? String(simErr)))
//         return
//       }

//       // send transaction using the wallet client with the prepared request
//       let tx: `0x${string}`
//       try {
//         tx = await (walletClient as any).writeContract(request)
//         setTxHash(String(tx))
//         // attempt to fetch receipt (may be null until mined)
//         try {
//           const receipt = await (publicClient as any).getTransactionReceipt({ hash: tx })
//           console.log('Transaction receipt:', receipt)
//         } catch (rcptErr) {
//           console.warn('Could not fetch receipt immediately:', rcptErr)
//         }
//       } catch (sendErr) {
//         console.error('Failed to send transaction:', sendErr)
//         setError('Failed to send transaction: ' + ((sendErr as any)?.message ?? String(sendErr)))
//       } finally {
//         setIsMinting(false)
//       }
//     } catch (e) {
//       console.error('mint error', e)
//       setError((e as any)?.message ?? String(e))
//       setIsMinting(false)
//     }
//   }

//   return (
//     <div className="flex items-center gap-3">
//       <button
//         id="mintBtn"
//         className={`ml-auto px-4 py-2 rounded text-white ${isMinting ? 'bg-slate-400' : 'bg-brand-600 hover:bg-brand-700'}`}
//         onClick={handleMint}
//         disabled={isMinting}
//       >
//         {isMinting ? 'Minting…' : 'Mint'}
//       </button>

//       {/* Status / link */}
//       <div className="text-sm">
//         {txHash && (
//           <div>
//             <a
//               className="text-brand-600 underline"
//               href={getExplorerTxUrl(Number((window as any)?.ethereum?.chainId ?? desiredChainId), txHash)}
//               target="_blank"
//               rel="noreferrer"
//             >
//               View tx
//             </a>
//           </div>
//         )}
//         {error && <div className="text-red-600">{error}</div>}
//       </div>
//     </div>
//   )
// }

function getExplorerTxUrl(chainId: number, hash: string) {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${hash}`;
    case 11155111:
      return `https://sepolia.etherscan.io/tx/${hash}`;
    default:
      return `https://etherscan.io/tx/${hash}`;
  }
}
