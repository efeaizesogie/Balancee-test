const cashbackHistory = [
  { date: "2024-08-25", amount: 10, bookingId: "BK001", category: "Gearbox" },
  { date: "2024-08-05", amount: 8.25, bookingId: "BK005", category: "Oil" },
  { date: "2024-08-01", amount: 15, bookingId: "BK006", category: "Engine" },
  { date: "2024-08-20", amount: 5, bookingId: "BK002", category: "Tires" },
  { date: "2024-08-15", amount: 7.5, bookingId: "BK003", category: "Tires" },
  { date: "2024-07-28", amount: 6, bookingId: "BK007", category: "Tires" },
  { date: "2024-08-10", amount: 12, bookingId: "BK004", category: "Engine" },
  { date: "2024-07-20", amount: 9, bookingId: "BK008", category: "Tires" },
  {
    date: "2024-07-15",
    amount: 11.5,
    bookingId: "BK009",
    category: "Alignment",
  },
];

const tableHeadings = [
  "Date",
  "Amount Earned",
  "Category",
  "Status",
  "Booking ID",
];

export const getCashbackHistory = () => {
  return cashbackHistory;
};

export const getTableHeadings = () => {
  return tableHeadings;
};
