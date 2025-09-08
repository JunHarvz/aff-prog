import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  const [stats, setStats] = useState({ clicks: 0, sales: 0, commission: 0 });
  const referralCode = localStorage.getItem("referral_code");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      // const res = await axios.get("http://localhost:5000/api/affiliate/stats",
      const res = await axios.get("https://aff-prog-backend.onrender.com/api/affiliate/stats", 
      {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    };
    fetchStats();
  }, []);

  const simulateOrder = async () => {
    await axios.post("http://localhost:5000/api/orders", {
      affiliateId: 2, // For MVP we hardcode affiliate id
      productId: 2,
      orderAmount: 500
    });
    alert("Order recorded, refresh stats!");
  };

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-4">Affiliate Dashboard</h1>
      <LogoutButton />
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Clicks</div>
          <div className="stat-value">{stats.clicks}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Sales</div>
          <div className="stat-value">₱{stats.sales}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Commission</div>
          <div className="stat-value">₱{stats.commission}</div>
        </div>
      </div>

      <div className="mt-6">
        <p>Your referral link:</p>
        <code className="bg-gray-200 p-2 block">
          {/* http://localhost:5174/product/1?ref={referralCode} */}
          https://aff-prog-store.vercel.app/product/1?ref={referralCode}
        </code>
      </div>

      {/* <button className="btn btn-secondary mt-6" onClick={simulateOrder}>
        Simulate Order ₱500
      </button> */}
    </div>
  );
}

export default Dashboard;
