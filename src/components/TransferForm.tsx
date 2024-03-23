import { FormEvent, useState } from "react";
import * as Web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function TransferForm() {
  const [solAmount, setSolAmount] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [sig, setSig] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (!connection || !publicKey) {
        alert("Please connect your wallet first lol");
        return;
      }
      const receiver = new Web3.PublicKey(toAddress);
      const txn = new Web3.Transaction();
      const instruction = Web3.SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: receiver,
        lamports: solAmount * Web3.LAMPORTS_PER_SOL,
      });
      txn.add(instruction);
      const txnSig = await sendTransaction(txn, connection);
      setSig(txnSig);
    } catch (err) {
      alert(err);
      setSolAmount(0);
      setToAddress("");
      setSig("");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center gap-3">
          <label>Amount to send (in SOL)</label>
          <input
            type="text"
            className="p-2 text-black"
            placeholder="0.5 SOL"
            onChange={(e) => setSolAmount(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-3 mt-6">
          <label>Address to send to</label>
          <input
            type="text"
            className="p-2 text-black"
            placeholder="cbckjdsbvksbvhjvbdvbsdhjvbsd"
            onChange={(e) => setToAddress(e.target.value)}
          />
        </div>

        <button className="px-4 py-2 bg-blue-600 rounded text-xl font-bold mt-6">
          Send SOL
        </button>
      </form>

      {sig !== "" ? (
        <p>
          Transaction can be viewed here{" "}
          {`https://explorer.solana.com/tx/${sig}?cluster=devnet`}
        </p>
      ) : null}
    </div>
  );
}
