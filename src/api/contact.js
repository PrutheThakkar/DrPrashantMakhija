export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { firstName, lastName, phone, email, message } = req.body

  try {
    await fetch(
      "https://pruthe.app.n8n.cloud/webhook-test/e804e415-42cd-45f4-8d91-6bd2adc1b6ad",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    )
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("n8n error:", error)
    return res.status(500).json({ success: false })
  }
}