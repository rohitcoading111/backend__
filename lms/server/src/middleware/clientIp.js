
import { ipKeyGenerator } from "express-rate-limit";
import { isIP } from "node:net";

// Identify client IP
export const getClientIp = (req) => {
  const cfClientIp = req.get("cf-connecting-ip")?.trim();

  // Use Cloudflare client IP if valid
  if (cfClientIp && isIP(cfClientIp)) {
    return ipKeyGenerator(cfClientIp);
  }

  // Fallback to Express IP
  return ipKeyGenerator(req.ip);
};
