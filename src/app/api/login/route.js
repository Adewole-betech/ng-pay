import executeQuery from "@/app/lib/db";
import md5 from "md5";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const email = body?.email;
    const password = md5(body?.password);
    let result = await executeQuery({
      query: `SELECT DISTINCT username FROM client_user WHERE username='${email}'`,
    });
    if (result.length === 0) {
      return NextResponse.json(
        { email: `User not found` },
        { status: 404 }
      );
    } else {
      result = await executeQuery({
        query: `SELECT DISTINCT username FROM client_user WHERE username='${email}' AND password='${password}'`,
      });
      if (result.length === 0) {
        return NextResponse.json(
          { password: `Password is incorrect` },
          { status: 400 }
        );
      } else {
        return NextResponse.json(error, { status: 200 });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
