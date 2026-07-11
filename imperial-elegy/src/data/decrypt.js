// Decrypt AES-256-GCM encrypted data using Web Crypto API

async function deriveKey(passphrase) {
  const enc = new TextEncoder()
  const hash = await crypto.subtle.digest('SHA-256', enc.encode(passphrase))
  return crypto.subtle.importKey('raw', hash, 'AES-GCM', false, ['decrypt'])
}

function b64ToArrayBuffer(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

export async function decryptRulebook(passphrase) {
  const base = import.meta.env.BASE_URL || '/'
  const res = await fetch(`${base}rulebook.enc.json`)
  const { iv, data } = await res.json()

  const key = await deriveKey(passphrase)
  const ivBuf = b64ToArrayBuffer(iv)
  const cipherBuf = b64ToArrayBuffer(data)

  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuf },
    key,
    cipherBuf,
  )

  return new TextDecoder().decode(plainBuf)
}
