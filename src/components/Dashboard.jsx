import { useState, useEffect } from "react";
import Loader from "./Loader";
import Navigation from "./Navigation";
import WalletConnect from "./WalletConnect";
import MusicToggle from "./MusicToggle";
import GameSection from "./GameSection";
import StatsSection from "./StatsSection";
import LeaderboardSection from "./LeaderboardSection";
import UserProfile from "./UserProfile";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [section, setSection] = useState("game");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex justify-between ">
        <MusicToggle />

        <WalletConnect
          setConnected={setConnected}
          setWalletAddress={setWalletAddress}
        />

        {/* {connected && <UserProfile address={walletAddress} />} */}
      </div>

      <div className="sm:w-[430px] w-full m-auto text-center h-[90vh] flex-col justify-center content-center ">
        <Navigation setSection={setSection} />
        <div className="mt-6 ">
          {section === "game" && connected ? (
            <GameSection walletAddress={walletAddress} />
          ) : !connected && section === "game" ? (
            <p>Connect your wallet to play</p>
          ) : null}
          {section === "stats" && connected ? (
            <StatsSection walletAddress={walletAddress} />
          ) : !connected && section === "stats" ? (
            <p>Connect wallet to view stats</p>
          ) : null}
          {section === "leaderboard" && <LeaderboardSection />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
