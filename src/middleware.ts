import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const response = NextResponse.next();

    // Allow requests from specific origins
    response.headers.set("Vary", "Origin");

    response.headers.set("Access-Control-Allow-Origin", "https://localhost:3001"); // Change "*" to your frontend domain
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
}