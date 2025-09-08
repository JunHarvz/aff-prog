import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

function AdminDashboard() {
  const [affiliates, setAffiliates] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAffiliates = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/affiliates", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAffiliates(res.data);
    };
    fetchAffiliates();
  }, []);

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Referral Code</th>
              <th>Product</th>
              <th>Sales</th>
              <th>Commission</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.referral_code}</td>
                <td>{a.product_name}</td>
                <td>₱{a.sales}</td>
                <td>₱{a.commissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
