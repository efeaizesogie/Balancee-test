import axios from "axios";
import { getBankCode } from "../Data/BankData";

const ValidateBankAccount = async (accountNumber, bankName) => {
  const bankCode = getBankCode(bankName);

  if (!bankCode) {
    console.error("Invalid bank name");
    return;
  }

  const options = {
    method: "GET",
    url: "https://nigeria-bank-account-validation.p.rapidapi.com/",
    params: {
      account_number: accountNumber,
      bank_code: bankCode,
    },
    headers: {
      "x-rapidapi-key": "35d3e2a534mshf6ef7e694ab4fa6p1c1a4cjsnf24d5143795e",
      "x-rapidapi-host": "nigeria-bank-account-validation.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default ValidateBankAccount();
