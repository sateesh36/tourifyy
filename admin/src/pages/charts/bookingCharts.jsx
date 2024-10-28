import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../../api";

export const BookingChart = () => {
  const [booking, setBooking] = useState([]);

  const fetchBooking = async () => {
    try {
      const res = await api.get("Booking/AllBooking");
      if (res) {
        setBooking(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const chartData = {
    labels: booking.map((_bookingData, id) => id + 1),
    datasets: [
      {
        label: "Total Price",
        data: booking.map((bookingData) => bookingData.totalPrice),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time", // Use the "time" scale for the x-axis
        time: {
          unit: "day", // Set the time unit to "day" or adjust as needed
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Booking Line Chart</h2>
      {booking.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};
