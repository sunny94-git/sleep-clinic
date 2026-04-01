import { auth } from "@/lib/auth";

export default auth((req) => {
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  
  if (isAdminPage && !isLoginPage) {
    const isLoggedIn = !!req.auth;
    const isAdmin = (req.auth?.user as any)?.role === 'admin';
    
    if (!isLoggedIn || !isAdmin) {
      return Response.redirect(new URL("/admin/login", req.nextUrl.origin));
    }
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
