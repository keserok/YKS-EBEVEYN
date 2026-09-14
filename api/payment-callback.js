import Iyzipay from "iyzipay";

export default async function handler(req, res) {
  // İyzico sends POST request to callbackUrl with 'token' in the body
  const token = req.body?.token || req.query?.token;
  const appUrl = process.env.APP_URL || "http://localhost:5176";

  if (!token) {
    return res.redirect(`${appUrl}?payment=failure&reason=token_missing`);
  }

  const apiKey = process.env.IYZICO_API_KEY || "sandbox-YOUR-API-KEY";
  const secretKey = process.env.IYZICO_SECRET_KEY || "sandbox-YOUR-SECRET-KEY";
  const uri = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";

  const iyzipay = new Iyzipay({
    apiKey,
    secretKey,
    uri
  });

  iyzipay.checkoutForm.retrieve(
    {
      locale: Iyzipay.LOCALE.TR,
      conversationId: `verify_${Date.now()}`,
      token: token
    },
    (err, result) => {
      if (err || result.status !== "success" || result.paymentStatus !== "SUCCESS") {
        const errorMsg = encodeURIComponent(result?.errorMessage || "Ödeme onaylanamadı.");
        return res.redirect(`${appUrl}?payment=failure&error=${errorMsg}`);
      }

      // Success! Redirect to app with success parameter to trigger download
      return res.redirect(`${appUrl}?payment=success&token=${token}`);
    }
  );
}
