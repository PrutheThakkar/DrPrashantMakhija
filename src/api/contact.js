export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const { firstName, lastName, phone, email, message } = body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required form fields",
      });
    }

    const n8nResponse = await fetch(
      "https://pruthe.app.n8n.cloud/webhook/e804e415-42cd-45f4-8d91-6bd2adc1b6ad",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          message,
          submittedAt: new Date().toISOString(),
          source: "drprashantmakhija.com",
        }),
      }
    );

    const n8nText = await n8nResponse.text();

    console.log("n8n status:", n8nResponse.status);
    console.log("n8n response:", n8nText);

    if (!n8nResponse.ok) {
      return res.status(502).json({
        success: false,
        message: "n8n webhook failed",
        details: n8nText,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("contact api error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while sending data",
      details: error.message,
    });
  }
}