export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { imageData } = req.body
  if (!imageData) return res.status(400).json({ error: 'imageData obrigatório' })

  const apiKey = process.env.REMOVEBG_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'REMOVEBG_API_KEY não configurada' })

  // Remove o prefixo "data:image/...;base64," e envia só o base64
  const base64 = imageData.replace(/^data:image\/\w+;base64,/, '')

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_file_b64: base64,
      size: 'auto',
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    return res.status(response.status).json({ error: text })
  }

  const buffer = await response.arrayBuffer()
  const result = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
  res.json({ result })
}
