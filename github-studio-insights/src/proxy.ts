import { NextRequest, NextResponse } from "next/server";

const username = process.env.DASHBOARD_USER ?? "";
const password = process.env.DASHBOARD_PASS ?? "";
const encoder = new TextEncoder();

function decodeBasicAuth(value: string) {
  try {
    return atob(value);
  } catch {
    return "";
  }
}

async function hashValue(value: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

async function safeEqual(left: string, right: string) {
  const [leftHash, rightHash] = await Promise.all([hashValue(left), hashValue(right)]);
  let diff = leftHash.length ^ rightHash.length;

  for (let i = 0; i < Math.max(leftHash.length, rightHash.length); i += 1) {
    diff |= (leftHash[i] ?? 0) ^ (rightHash[i] ?? 0);
  }

  return diff === 0;
}

export async function proxy(req: NextRequest) {
  if (!username || !password) {
    return new NextResponse("Dashboard authentication is not configured.", {
      status: 503,
    });
  }

  const auth = req.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = decodeBasicAuth(encoded);
      const separatorIndex = decoded.indexOf(":");
      const user = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : decoded;
      const pass = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : "";
      const isAuthorized = (await safeEqual(user ?? "", username)) && (await safeEqual(pass ?? "", password));

      if (isAuthorized) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="GitHub Studio Insights", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
