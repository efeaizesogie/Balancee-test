import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const RewardTable = ({ tableHeading, tableBody }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Cashbacks.</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeading?.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableBody.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell
                className={
                  transaction.status === "pending"
                    ? "bg-[#e6f1f6] text-gray-600 capitalize"
                    : "bg-[#4484a7] text-white capitalize"
                }
              >
                {transaction.status}
              </TableCell>
              <TableCell>{transaction.bookingId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RewardTable;
