// import axios from "axios";
// import { getBankCode } from "../Data/BankData";

// export const ValidateBankAccount = async (accountNumber, bankName) => {
//   const bankCode = getBankCode(bankName);

//   if (!bankCode) {
//     console.error("Invalid bank name");
//     return;
//   }

//   const options = {
//     method: "GET",
//     url: "https://nigeria-bank-account-validation.p.rapidapi.com/",
//     params: {
//       account_number: accountNumber,
//       bank_code: bankCode,
//     },
//     headers: {
//       "x-rapidapi-key": "65aa23d932msh1aa8f9d13e6a150p1ed40cjsn5a275ae4222b",
//       "x-rapidapi-host": "nigeria-bank-account-validation.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

import axios from "axios";
import { getBankCode } from "../Data/BankData";

export const ValidateBankAccount = async (accountNumber, bankName) => {
  const result = [];
  const bankCode = getBankCode(bankName);

  if (!bankCode) {
    console.error("Invalid bank name");
    return;
  }

  const url = `https://nigeria-bank-account-validation.p.rapidapi.com/?account_number=${accountNumber}&bank_code=${bankCode}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "65aa23d932msh1aa8f9d13e6a150p1ed40cjsn5a275ae4222b",
      "x-rapidapi-host": "nigeria-bank-account-validation.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  return result;
};
