// src/app/components/PaymentForm.tsx
import React, { useState } from "react";
import PayPalComponent from "./PayPalComponent";

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (paymentMethod === "stripe") {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardDetails),
      });
      const data = await response.json();
      alert(data.message);
    } else if (paymentMethod === "iyzico") {
      const response = await fetch("/api/iyzico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardDetails),
      });
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Ödeme Yöntemi Seçin</h2>
      <select
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
      >
        <option value="stripe">Stripe</option>
        <option value="iyzico">Iyzico</option>
        <option value="paypal">PayPal</option>
      </select>

      {paymentMethod !== "paypal" && (
        <div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Kart Numarası"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Son Kullanma Tarihi (MM/YY)"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
          />
        </div>
      )}

      {paymentMethod === "paypal" && <PayPalComponent />}

      {paymentMethod !== "paypal" && (
        <button onClick={handlePayment}>Ödeme Yap</button>
      )}
    </div>
  );
}
