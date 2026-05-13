import { NextRequest, NextResponse } from "next/server";

const username = process.env.DASHBOARD_USER ?? "";
const password = process.env.DASHBOARD_PASS ?? "";

function decodeBasicAuth(value: string) {
  try {
    return atob(value);
  } catch {
    return "";
  }
}

export function proxy(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const [user, pass] = decodeBasicAuth(encoded).split(":");
      if (user === username && pass === password && username && password) {
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
