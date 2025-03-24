import { NextResponse } from "next/server";
import * as z from "zod";

// Form validation schema - matching the client-side schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(500, { message: "Message cannot exceed 500 characters" }),
});

/**
 * POST handler for contact form submissions
 * Validates the request and simulates sending an email
 * In a real application, you would integrate with an email service
 */
export async function POST(request: Request) {
  try {
    // Parse the request body as JSON
    const body = await request.json();

    // Validate the request body against our schema
    const result = formSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors
      return NextResponse.json({ success: false, errors: result.error.errors }, { status: 400 });
    }

    // Extract validated data
    const { name, email, subject, message } = result.data;

    // In a real application, you would integrate with an email service here
    // Example: await sendEmail({ name, email, subject, message });

    // For demonstration, log the form data
    console.log("Contact form submission:", { name, email, subject, message });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. I'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "There was an error processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
