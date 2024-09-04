import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnurtChart = ({ totalCashback, currentBalance, redeemedBalance }) => {
  const data = {
    datasets: [
      {
        label: "Balance stats",
        data: [totalCashback, currentBalance, redeemedBalance],
        backgroundColor: [
          "rgb(8, 112, 167)",
          "rgb(68, 132, 167)",
          "rgb(230, 241, 246)",
        ],
      },
    ],
    labels: ["Total Cashback", "Current balance", "Redeemed Balance"],
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnurtChart;
