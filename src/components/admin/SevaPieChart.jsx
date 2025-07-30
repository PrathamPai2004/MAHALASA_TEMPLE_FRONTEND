import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

function SevaPieChart() {
  const [sevas, setSevas] = useState([]);

  useEffect(() => {
    fetch("https://mahalasa-temple-backend.onrender.com/seva-stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Pie Seva Data:", data);
        setSevas(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const pieData = {
    labels: sevas.map((seva) => seva.seva_name),
    datasets: [
      {
        label: "Total Seva Amount (₹)",
        data: sevas.map((seva) => seva.seva_amount * seva.bookings || 0),
        backgroundColor: [
			"#FF5733",
			"#33FF57",
			"#3357FF",
			"#F39C12",
			"#8E44AD",
			"#1ABC9C",
			"#E74C3C",
			"#2ECC71",
			"#3498DB",
			"#9B59B6",
			"#34495E",
			"#16A085",
			"#27AE60",
			"#2980B9",
			"#D35400",
			"#C0392B",
			"#BDC3C7",
			"#7F8C8D",
			"#95A5A6",
			"#E67E22",
			"#E84393",
			"#6C5CE7",
			"#00CEC9",
			"#FAB1A0",
			"#81ECEC"
        ],
        borderColor: "#fff",
        borderWidth: 1,
		hoverOffset: 40
      },
    ],
  };

  return (
	<>
		<h2 className="text-center">Seva Amount Distribution</h2>
		<div style={{ width: "70%", margin: "auto" }}>
			<Pie data={pieData}/>
		</div>
	</>
  );
}

export default SevaPieChart;
