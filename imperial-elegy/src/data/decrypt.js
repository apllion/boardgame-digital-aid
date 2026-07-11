// Decrypt AES-256-GCM encrypted PDF, cached globally

let cachedPdfData = null

async function deriveKey(passphrase) {
  const enc = new TextEncoder()
  const hash = await crypto.subtle.digest('SHA-256', enc.encode(passphrase))
  return crypto.subtle.importKey('raw', hash, 'AES-GCM', false, ['decrypt'])
}

export async function decryptPDF(passphrase) {
  if (cachedPdfData) return cachedPdfData

  const base = import.meta.env.BASE_URL || '/'
  const res = await fetch(`${base}rulebook.enc.bin`)
  const buf = await res.arrayBuffer()
  const data = new Uint8Array(buf)

  const iv = data.slice(0, 12)
  const ciphertext = data.slice(12)

  const key = await deriveKey(passphrase)
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  )

  cachedPdfData = new Uint8Array(plainBuf)
  return cachedPdfData
}
