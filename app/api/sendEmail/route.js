import { Resend } from "resend";
import { Email } from "./email";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API);

export async function POST(req) {
  const res = await req.json();
  try {
    const data = await resend.emails.send({
      from: "health-care",
      to: "user@gmail.com",
      subject: "hello world",
      react: <Email url="https://example.com" />,
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
