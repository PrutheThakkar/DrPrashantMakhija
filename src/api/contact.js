export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { name, email, phone, message } = req.body

  try {
    await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        submittedAt: new Date().toISOString(),
      }),
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ success: false })
  }
}