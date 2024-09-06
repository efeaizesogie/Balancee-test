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

const WithdrawalTable = ({ tableBody }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Withdrawals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Bank</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Account Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableBody.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.bank}</TableCell>
              <TableCell>{transaction.accountName}</TableCell>
              <TableCell>{transaction.accountNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WithdrawalTable;
