import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Table } from "../components/ui/table";
import Logo from "./ui/logo";
import DoughnurtChart from "./ui/DoughnutChart";
import CountUp from "react-countup";
import RewardTable from "./RewardTable";
import DialogButton from "./DialogButton";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getCashbackHistory, getTableHeadings } from "../Data/CashBackData";
import SelectBank from "./SelectBank";
import { ValidateBankAccount } from "../api_requests/ValidateBankAccount";

const RewardsSummary = () => {
  const [convertAmount, setConvertAmount] = useState();
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState();
  const [remainingBalance, setRemainingBalance] = useState("");
  const [bankDetails, setBankDetails] = useState([]);

  const cashbackHistory = getCashbackHistory();
  const tableHeadings = getTableHeadings();
  const today = new Date();
  const pendingThreshold = 30;

  const fullBtn = "bg-[#4484a7] hover:bg-[#15587d] text-white transition-all";
  const halfBtn =
    "bg-[#e6f1f6] hover:bg-[#99bac9] text-gray-600 hover:text-white transition-all";

  const daysBetween = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const updatedCashbackHistory = cashbackHistory.map((entry) => {
    const transactionDate = new Date(entry.date);
    const daysDiff = (today - transactionDate) / (1000 * 60 * 60 * 24);
    return {
      ...entry,
      status: daysDiff <= pendingThreshold ? "pending" : "cleared",
    };
  });

  const pendingEarnings = cashbackHistory
    .filter(
      (entry) => daysBetween(new Date(entry.date), today) < pendingThreshold
    )
    .reduce((acc, curr) => acc + curr.amount, 0);

  const lifetimeEarnings = cashbackHistory.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const withdrawnAmount = 25;
  const currentBalance = lifetimeEarnings - withdrawnAmount;

  // Determine the next payout date: Closest 1st or 15th of the month
  const getNextPayoutDate = () => {
    const nextPayout1 = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextPayout15 = new Date(today.getFullYear(), today.getMonth(), 15);

    if (today.getDate() < 1) {
      return nextPayout1.toISOString().split("T")[0];
    } else if (today.getDate() < 15) {
      return nextPayout15.toISOString().split("T")[0];
    } else {
      return new Date(today.getFullYear(), today.getMonth() + 1, 1)
        .toISOString()
        .split("T")[0];
    }
  };

  const nextPayoutDate = getNextPayoutDate();

  // Top earning category: Category with the highest accumulated cashback
  const categoryEarnings = cashbackHistory.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const topEarningCategory = Object.keys(categoryEarnings).reduce((a, b) =>
    categoryEarnings[a] > categoryEarnings[b] ? a : b
  );

  const calculateRemainingBalance = (event) => {
    const inputAmount = parseFloat(event.target.value) || 0;
    setConvertAmount(parseFloat(event.target.value) || 0);
    setRemainingBalance(currentBalance - inputAmount);
  };

  const getAccountName = () => {
    console.log("Bank: ", bank, " Account Number ", accountNumber);
    if (bank && accountNumber) {
      setBankDetails(ValidateBankAccount(accountNumber, bank));
    }
  };

  return (
    <div className="w-full px-2 md:px-6 mx-auto my-8 transition-all">
      <div class="font-semibold pb-14 mb-auto text-xl">
        <h2 className="text-2xl font-semibold mb-4">Earnings Overview</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
            <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px]">
              <DoughnurtChart
                totalCashback={lifetimeEarnings}
                currentBalance={currentBalance}
                redeemedBalance={withdrawnAmount}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 md:items-center md:flex-row">
                {" "}
                <p className="text-base">Total Cashback Earned: </p>
                <span className="font-bold text-lg">
                  <CountUp
                    decimal=","
                    prefix="$"
                    duration={2.75}
                    decimals={2}
                    end={lifetimeEarnings.toFixed(2)}
                  />
                </span>
              </div>

              <div className="flex md:items-center flex-col gap-2 md:flex-row">
                <p className="text-base">Current Balance: </p>
                <span className="font-bold text-lg text-green-900">
                  <CountUp
                    decimal=","
                    prefix="$"
                    duration={2.75}
                    decimals={2}
                    end={currentBalance.toFixed(2)}
                  />
                </span>
              </div>
              <div className="flex flex-col gap-2 md:items-center md:flex-row">
                <p className="text-base">Redeemed Balance: </p>
                <span className="font-bold text-lg text-red-900">
                  <CountUp
                    decimal=","
                    prefix="$"
                    duration={2.75}
                    decimals={2}
                    end={"-" + withdrawnAmount.toFixed(2)}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className=" w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
            <div className="flex flex-col gap-2">
              <div className=" w-full flex justify-between items-center">
                <p className="text-base">Pending Earnings: </p>
                <span className="font-bold text-lg">
                  <CountUp
                    decimal=","
                    prefix="$"
                    duration={2.75}
                    decimals={2}
                    end={pendingEarnings.toFixed(2)}
                  />
                </span>
              </div>

              <div className=" w-full flex justify-between items-center">
                <p className="text-base">Next Payout Date: </p>
                <span className="font-bold text-lg">{nextPayoutDate}</span>
              </div>

              <div className=" w-full flex justify-between items-center">
                <p className="text-base">Lifetime Earnings: </p>
                <span className="font-bold text-lg">
                  <CountUp
                    decimal=","
                    prefix="$"
                    duration={2.75}
                    decimals={2}
                    end={lifetimeEarnings.toFixed(2)}
                  />
                </span>
              </div>

              <div className=" w-full flex justify-between items-center">
                <p className="text-base">Top Earning Category: </p>
                <span className="font-bold text-lg">{topEarningCategory}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="mb-4 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Cashback History</h2>
        <RewardTable
          tableHeading={tableHeadings}
          tableBody={updatedCashbackHistory}
        />
      </Card>

      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Cashout Options</h2>
        <div className="flex flex-col md:flex-row gap-2 md:space-x-4">
          <DialogButton
            action="Direct Cashout"
            submitAction="Withdraw"
            dialogBtnClass={fullBtn}
            description="Withdraw your cashback directly to your bank account or as a discount on future bookings."
          >
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Bank
                  </Label>
                  <SelectBank onChange={(value) => setBank(value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    maxLength="10"
                    placeholder="Enter account number"
                    className="col-span-3 focus:outline-none focus:border-none"
                    value={accountNumber}
                    onChange={(event) =>
                      setAccountNumber(parseFloat(event.target.value) || 0)
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="w-fit h-7 hover:bg-sky-700"
                    onClick={() => getAccountName()}
                  >
                    Validate
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Account Name
                </Label>
                <Input
                  id="accountName"
                  name="accountName"
                  value={bankDetails?.account_name}
                  disabled
                  placeholder="Enter account name"
                  className="col-span-3 focus:outline-none focus:border-none"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Withdrawal Amount
                </Label>
                <Input
                  id="withdrawalAmount"
                  placeholder="Enter withdrawal amount"
                  className="col-span-3 focus:outline-none focus:border-none"
                />
              </div>
            </div>
          </DialogButton>
          <DialogButton
            action="Convert to Promo Code"
            dialogBtnClass={halfBtn}
            submitAction="Convert"
            description="Convert your cashback into promo codes. You can apply this promo code to future bookings"
          >
            <div className="relative h-[4.2rem]">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Amount to Convert
                </Label>
                <Input
                  id="onvertAmount"
                  name="convertAmount"
                  value={convertAmount}
                  placeholder="Enter the amount you wish to convert"
                  className="col-span-3 focus:outline-none focus:border-none"
                  onChange={(event) => calculateRemainingBalance(event)}
                />
              </div>
              <p className="absolute bottom-0 right-0 text-[12px]">
                Remaining balance:{" "}
                {remainingBalance ? remainingBalance : currentBalance}
              </p>
            </div>
          </DialogButton>
        </div>
      </Card>
    </div>
  );
};

export default RewardsSummary;
