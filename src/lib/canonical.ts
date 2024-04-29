// canonicalizePhone canonicalizes a phone number into E.164 format.
export function canonicalizePhoneNumber(phone: string): string {
  return "+" + phone.replace(/[^0-9]/g, "")
}

// hostname returns the hostname of a URL.
export function hostname(url: string): string {
  return new URL(url).hostname
}
