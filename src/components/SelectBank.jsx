import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getBankCode, getBankData } from "../Data/BankData";

const SelectBank = ({ onChange }) => {
  const bankDetails = getBankData();

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Enter bank" />
      </SelectTrigger>
      <SelectContent>
        {bankDetails.map((data) => (
          <SelectItem key={data.id} value={data.name}>
            {data.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBank;
