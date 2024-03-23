import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center p-4">
      <h1>Transfer SOL plis</h1>
      <WalletMultiButton />
    </div>
  );
}
