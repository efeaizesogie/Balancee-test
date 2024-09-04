var promoCodesData = [];

function generateRandomName() {
  return `PromoCode_${Math.random().toString(36).substr(2, 9)}`;
}

export function addPromoCode(discount) {
  const newPromoCode = {
    id: promoCodesData.length + 1,
    name: generateRandomName(),
    discount: discount,
    status: "Active",
  };

  promoCodesData = [...promoCodesData, newPromoCode];
  console.log("Updated PromoCodesData: ", promoCodesData);
}

export function getPromoCodes() {
  return promoCodesData;
}
