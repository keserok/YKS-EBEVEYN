import Iyzipay from "iyzipay";

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "127.0.0.1"
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { parentName = "Değerli Velimiz", phone = "05000000000", email } = req.body || {};

    const apiKey = process.env.IYZICO_API_KEY || "sandbox-YOUR-API-KEY";
    const secretKey = process.env.IYZICO_SECRET_KEY || "sandbox-YOUR-SECRET-KEY";
    const uri = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";
    const appUrl = process.env.APP_URL || "http://localhost:5176";

    // Split name into first and last name
    const nameParts = parentName.trim().split(" ");
    const buyerName = nameParts[0] || "Veli";
    const buyerSurname = nameParts.slice(1).join(" ") || "Yılmaz";
    const cleanPhone = "+90" + phone.replace(/\D/g, "").slice(-10);
    const buyerEmail = email || `veli_${Date.now()}@kaostanduzene.com`;
    const clientIp = getClientIp(req);
    const conversationId = `conv_${Date.now()}`;
    const basketId = `BSK_${Date.now()}`;

    // If still using placeholder sandbox key and not real keys yet, return simulation info
    if (apiKey === "sandbox-YOUR-API-KEY" || !apiKey) {
      return res.status(200).json({
        status: "sandbox_ready",
        message: "İyzico Sandbox API anahtarlarınız hazır olduğunda canlı ödeme formu açılacaktır.",
        simulation: true,
        product: "Kaostan Düzene: YKS Ebeveyn Rehberi (PDF)",
        price: 299
      });
    }

    const iyzipay = new Iyzipay({
      apiKey,
      secretKey,
      uri
    });

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId,
      price: "299.0",
      paidPrice: "299.0",
      currency: Iyzipay.CURRENCY.TRY,
      basketId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `${appUrl}/api/payment-callback`,
      enabledInstallments: [1, 2, 3],
      buyer: {
        id: `BY_${Date.now()}`,
        name: buyerName,
        surname: buyerSurname,
        gsmNumber: cleanPhone,
        email: buyerEmail,
        identityNumber: "11111111111",
        lastLoginDate: "2026-09-14 12:00:00",
        registrationDate: "2026-09-14 12:00:00",
        registrationAddress: "Türkiye",
        ip: clientIp,
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34000"
      },
      shippingAddress: {
        contactName: `${buyerName} ${buyerSurname}`,
        city: "Istanbul",
        country: "Turkey",
        address: "Dijital Teslimat / E-Kitap İndirme",
        zipCode: "34000"
      },
      billingAddress: {
        contactName: `${buyerName} ${buyerSurname}`,
        city: "Istanbul",
        country: "Turkey",
        address: "Dijital Teslimat / E-Kitap İndirme",
        zipCode: "34000"
      },
      basketItems: [
        {
          id: "KAOSTAN_DUZENE_PDF_EBOOK",
          name: "Kaostan Düzene: YKS Ebeveyn Rehberi (PDF)",
          category1: "E-Kitap",
          category2: "Eğitim ve Rehberlik",
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: "299.0"
        }
      ]
    };

    iyzipay.checkoutFormInitialize.create(request, (err, result) => {
      if (err) {
        return res.status(500).json({ status: "failure", error: err.message });
      }

      if (result.status === "success") {
        return res.status(200).json({
          status: "success",
          checkoutFormContent: result.checkoutFormContent,
          paymentPageUrl: result.paymentPageUrl,
          token: result.token
        });
      } else {
        return res.status(400).json({
          status: "failure",
          errorMessage: result.errorMessage,
          errorCode: result.errorCode
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
}
