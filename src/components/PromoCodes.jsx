import React, { useEffect, useState } from "react";
import { getPromoCodes } from "../Data/PromoCodeData";

const PromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    const fetchedPromoCodes = getPromoCodes();
    setPromoCodes(fetchedPromoCodes);
  }, [getPromoCodes()]);

  const toggleStatus = (id) => {
    const updatedCodes = promoCodes.map((promo) =>
      promo.id === id
        ? {
            ...promo,
            status: promo.status === "Active" ? "Inactive" : "Active",
          }
        : promo
    );
    setPromoCodes(updatedCodes);
  };

  return (
    <div className="p-4 space-y-4">
      {promoCodes && promoCodes.length > 0 ? (
        <>
          {promoCodes?.map((promo) => (
            <div
              key={promo.id}
              className="flex flex-col gap-2 md:flex-row md:items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
            >
              <div>
                <h2 className="text-base font-bold text-primary mb-2">
                  {promo.name}
                </h2>
                <p className="text-sm mb-1">Discount: ${promo.discount}</p>
                <p className="text-sm">Status: {promo.status}</p>
              </div>
              <button
                onClick={() => toggleStatus(promo.id)}
                className={`px-4 py-2 text-white rounded ${
                  promo.status === "Active" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {promo.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </>
      ) : (
        <div className="w-full text-center">
          {" "}
          <p>You have no promo code at the moment</p>{" "}
        </div>
      )}
    </div>
  );
};

export default PromoCodes;
