import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import '/src/styles/dashboard.css'
// Register necessary Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function SevaChart() {
  const [sevas, setSevas] = useState([]);
	const verticalLabelPlugin = {
  id: "verticalLabelPlugin",
  afterDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      chartArea: { top },
      data,
    } = chart;

    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((bar, index) => {
      const label = data.labels[index];

      ctx.save();
      ctx.fillStyle = "#D5GS6H";
      ctx.font = "13px Helvetica italic";
	  
      ctx.textAlign = "center";

      // Rotate text vertically
      ctx.translate(bar.x, bar.y - 60); // move above bar
      ctx.rotate(-Math.PI / 2); // vertical rotation
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
  },
};
  const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true,
    },
    customLabelPlugin: {
      // Not built-in, added below
    },
  },
  animation: {
    duration: 0, // makes custom label positioning smoother
  },
  scales: {
    x: {
      ticks: {
        display: false, // Hide default X-axis labels
      },
    },
  },
  plugins: [verticalLabelPlugin],
};
  useEffect(() => {
    fetch("https://mahalasa-temple-backend.onrender.com/seva-stats")
      .then((res) => res.json())
      .then((data) => setSevas(data))
      .catch((err) => console.error("Failed to fetch sevas:", err));
  }, []);

  const chartData = {
    labels: sevas.map((seva) => seva.seva_name),
    datasets: [
      {
        label: "Seva Bookings",
        data: sevas.map((seva) => seva.bookings || 0),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
		
      },
	  {
        label: "Total Seva Amount (₹)",
        data: sevas.map((seva) => seva.seva_amount * seva.seva_bookings || 0),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(0, 159, 64, 1)",
        borderWidth: 1,
		hoverBackgroundColor: "rgba(255, 99, 132, 0.8)", 
		
		
      },

    ],
	
  };

  return (
	<div style={{maxWidth:"1000vw"}} className="bar-chart-container">
		<div style={{ width: "90vw", margin: "auto" }}>
		<h2 className="text-center">All Sevas - Bookings Overview</h2>
		<Bar data={chartData} options={options} plugins={[verticalLabelPlugin]}  />
		</div>
	</div>
  );
}

export default SevaChart;
