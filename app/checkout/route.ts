import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
	accessToken: process.env.POLAR_ACCESS_TOKEN!,
	successUrl: "http://localhost:3000/payment/success",
	server: "sandbox",
});
