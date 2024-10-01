// src/app/api/iyzico/route.ts
import Iyzipay from 'iyzipay';

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY!,
  secretKey: process.env.IYZICO_SECRET_KEY!,
  uri: 'https://sandbox-api.iyzipay.com',
});

export async function POST(req: Request) {
  const body = await req.json();

  const paymentRequest = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: '100',
    paidPrice: '120',
    currency: Iyzipay.CURRENCY.TRY,
    installment: 1,
    paymentCard: {
      cardHolderName: 'John Doe',
      cardNumber: body.cardNumber,
      expireMonth: body.expiryDate.split('/')[0],
      expireYear: body.expiryDate.split('/')[1],
      cvc: body.cvc,
    },
    buyer: {
      id: 'BY789',
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      identityNumber: '11111111111',
      registrationAddress: 'Nişantaşı Mahallesi, İstanbul',
      ip: req.headers.get('x-forwarded-for') || '85.34.78.112',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34732',
    },
    billingAddress: {
      contactName: 'John Doe',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Nişantaşı Mahallesi, İstanbul',
      zipCode: '34732',
    },
    basketItems: [
      {
        id: 'BI101',
        name: 'Test Product',
        category1: 'Electronics',
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: '100',
      },
    ],
  };

  return new Promise((resolve) => {
    iyzipay.payment.create(paymentRequest, (err: any, result: any) => {
      if (err) {
        resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'İyzico ile ödeme başarılı!', result }), { status: 200 }));
      }
    });
  });
}