import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.includes("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("Bạn không phải là Admin");
    }
  },
  // Callbacks chạy trước, nếu callbacks return true thì function middleware được chạy
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        // Nếu token exists, tức là user đã được authenticated (đã đăng nhập)
        // Cho phép pass để tiếp tục thực hiện Authorization
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
