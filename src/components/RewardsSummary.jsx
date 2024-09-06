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
import { useToast } from "../hooks/use-toast";
import { ValidateBankAccount } from "../api_requests/ValidateBankAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastAction } from "@radix-ui/react-toast";
import { addPromoCode } from "../Data/PromoCodeData";
import PromoCodes from "./PromoCodes";
import WithdrawalTable from "./WithdrawalTable";

const RewardsSummary = () => {
  const [convertAmount, setConvertAmount] = useState(0);
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [withdrawnAmount, setWithdrawnAmount] = useState(25);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [withdrawSuccessful, setWithdrawSucessfull] = useState(false);
  //   const [bankDetails, setBankDetails] = useState([]);
  const [lifetimeEarnings, setLifetimeEarnings] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allErrorMessage, setAllErrorMessage] = useState("");
  const cashbackHistory = getCashbackHistory();
  const tableHeadings = getTableHeadings();
  const today = new Date();
  const pendingThreshold = 30;
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const calculatedLifetimeEarnings = cashbackHistory.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    setLifetimeEarnings(calculatedLifetimeEarnings);
    const calculatedBalance = lifetimeEarnings - withdrawnAmount;
    setCurrentBalance(calculatedBalance.toFixed(2));
  }, [lifetimeEarnings, withdrawnAmount]);

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

  //   const getAccountName = () => {
  //     console.log("Bank: ", bank, " Account Number ", accountNumber);
  //     if (bank && accountNumber) {
  //       setBankDetails(ValidateBankAccount(accountNumber, bank));
  //     }
  //   };

  const handleWithdrawalAmountChange = (event) => {
    calculateRemainingBalance(event);
    setAllErrorMessage("");
    setErrorMessage("");
    const amount = parseFloat(event.target.value) || 0;
    if (amount > currentBalance) {
      setErrorMessage("Withdrawal amount exceeds current balance.");
      setWithdrawalAmount(currentBalance);
    } else {
      setErrorMessage("");
      setWithdrawalAmount(amount);
    }
  };

  const handleWithdraw = () => {
    if (bank && accountNumber && accountName && withdrawalAmount) {
      const date = new Date().toLocaleDateString();
      const withdrawalInfo = {
        date: date,
        amount: withdrawalAmount,
        bank: bank,
        accountName: accountName,
        accountNumber: accountNumber,
      };

      setWithdrawalHistory([...withdrawalHistory, withdrawalInfo]);

      setWithdrawSucessfull(true);
      console.log(withdrawalInfo);
      setAllErrorMessage("");

      setRemainingBalance(currentBalance - withdrawalAmount);
      setCurrentBalance(currentBalance - withdrawalAmount);
      setWithdrawnAmount(withdrawnAmount + withdrawalAmount);

      toast({
        title: "Withdrawal Successful ",
        description: `Congratulations, $ ${withdrawalAmount} ${"  "} has been sent to your ${bank}`,
        action: <ToastAction altText="close">Close</ToastAction>,
      });

      setBank("");
      setAccountNumber("");
      setAccountName("");
      setWithdrawalAmount(0);
    } else {
      setAllErrorMessage("Enter all fields");
    }
  };

  const handleConvert = () => {
    if (convertAmount < remainingBalance) {
      setAllErrorMessage("");

      setCurrentBalance(currentBalance - convertAmount);
      setWithdrawnAmount(withdrawnAmount + convertAmount);

      toast({
        title: "Conversion Successful ",
        description: `Congratulations, $ ${convertAmount} ${"  "} has been successfully converted to promo code`,
        action: <ToastAction altText="close">Close</ToastAction>,
      });

      addPromoCode(convertAmount);
    } else {
      setAllErrorMessage("Enter all fields");
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
                    end={currentBalance}
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
                    end={"-" + withdrawnAmount?.toFixed(2)}
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
                    end={pendingEarnings?.toFixed(2)}
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

      <Card className="mb-4 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Cashout Options</h2>
        <div className="flex flex-col md:flex-row gap-2 md:space-x-4">
          <DialogButton
            action="Direct Cashout"
            submitAction="Withdraw"
            dialogBtnClass={fullBtn}
            disabled={
              withdrawalAmount > currentBalance ||
              withdrawalAmount <= 0 ||
              errorMessage ||
              !bank ||
              !accountNumber ||
              !accountName ||
              !withdrawalAmount
            }
            onClick={() => handleWithdraw()}
            allErrorMessage={allErrorMessage}
            description="Withdraw your cashback directly to your bank account or as a discount on future bookings."
          >
            {" "}
            <div>
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
                      onChange={(event) =>
                        setAccountNumber(parseFloat(event.target.value) || 0)
                      }
                    />
                  </div>
                  {/* <div className="flex justify-end">
                  <Button
                    className="w-fit h-7 hover:bg-sky-700"
                    onClick={() => getAccountName()}
                  >
                    Validate
                  </Button>
                </div> */}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Account Name
                  </Label>
                  <Input
                    id="accountName"
                    name="accountName"
                    onChange={(event) => setAccountName(event.target.value)}
                    placeholder="Enter account name"
                    className="col-span-3 focus:outline-none focus:border-none"
                  />
                </div>
                <div className="relative h-[4.2rem]">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Withdrawal Amount
                    </Label>
                    <Input
                      id="withdrawalAmount"
                      onChange={handleWithdrawalAmountChange}
                      placeholder="Enter withdrawal amount"
                      className="col-span-3 focus:outline-none focus:border-none"
                    />

                    <p className="absolute bottom-0 right-0 text-[12px]">
                      Remaining balance:{" "}
                      {remainingBalance ? remainingBalance : currentBalance}
                    </p>
                    {errorMessage && (
                      <p className="text-red-500 text-[12px] mt-3 col-span-4 text-right">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {allErrorMessage && (
                <p className="text-red-500 text-[12px] mt-4 col-span-4 text-right">
                  {allErrorMessage}
                </p>
              )}
            </div>
          </DialogButton>
          <DialogButton
            action="Convert to Promo Code"
            dialogBtnClass={halfBtn}
            submitAction="Convert"
            onClick={() => handleConvert()}
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
                  placeholder="Enter the amount you wish to convert"
                  className="col-span-3 focus:outline-none focus:border-none"
                  onChange={(event) => calculateRemainingBalance(event)}
                />
              </div>
              <p className="absolute bottom-0 right-0 text-[12px]">
                Remaining balance:{" "}
                {remainingBalance ? remainingBalance : currentBalance}
              </p>

              {allErrorMessage && (
                <p className="text-red-500 text-[12px] col-span-4 text-right">
                  {allErrorMessage}
                </p>
              )}
            </div>
          </DialogButton>
        </div>
      </Card>

      <Card className="mb-4 p-6 shadow-lg">
        <PromoCodes />
      </Card>

      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Withdrawal History</h2>
        <WithdrawalTable tableBody={withdrawalHistory} />
      </Card>
    </div>
  );
};

export default RewardsSummary;
