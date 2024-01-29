import { useEffect, useState } from "react";

const MetricCard = ({ name, apiEndpoint }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAmount(data);
        } else {
          console.error("Failed to fetch data for " + name);
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600">{amount}</p>
    </div>
  );
};
export default MetricCard
