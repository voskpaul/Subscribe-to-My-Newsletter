"use server"

import { z } from "zod"

// Email validation schema
const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type SubscribeResult = {
  success: boolean
  message: string
}

export async function subscribeToNewsletter(prevState: any, formData: FormData): Promise<SubscribeResult> {
  try {
    // Extract email from form data
    const email = formData.get("email") as string

    // Validate email
    const result = subscribeSchema.safeParse({ email })

    if (!result.success) {
      return {
        success: false,
        message: result.error.errors[0].message,
      }
    }

    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send this to your API or email service
    console.log("Subscribing email:", email)

    // Return success response
    return {
      success: true,
      message: "You've been successfully subscribed!",
    }
  } catch (error) {
    console.error("Subscription error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
