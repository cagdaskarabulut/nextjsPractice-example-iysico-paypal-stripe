// src/app/components/PayPalComponent.tsx
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalComponent() {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "100.00", // Ödeme tutarı
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          alert("Ödeme başarılı: " + details.payer.name.given_name);
        });
      }}
    />
  );
}
