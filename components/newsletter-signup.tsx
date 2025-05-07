"use client"

import type React from "react"

import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Facebook, Mail, CheckCircle, Loader2 } from "lucide-react"
import BrandLogo from "@/components/brand-logo"
import { subscribeToNewsletter } from "@/app/actions"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

const initialState = {
  success: false,
  message: "",
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState)
  const [emailError, setEmailError] = useState("")

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError("Email is required")
      return false
    } else if (!regex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!validateEmail(email)) {
      e.preventDefault()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state?.success ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          key="success"
        >
          <Card className="w-full max-w-md shadow-md">
            <CardHeader className="flex flex-col items-center space-y-2 pt-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
              </motion.div>
              <h1 className="text-2xl font-bold text-center">Thank You!</h1>
              <p className="text-center text-muted-foreground">
                You've been successfully subscribed to our newsletter.
              </p>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p>
                We've sent a confirmation email to <span className="font-medium">{email}</span>
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
              >
                Subscribe another email
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          key="form"
        >
          <Card className="w-full max-w-md shadow-md dark:border-purple-800 transition-all duration-300">
            <CardHeader className="flex flex-col items-center space-y-2 pt-6">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <BrandLogo />
              </motion.div>
              <h1 className="text-2xl font-bold text-center">Subscribe to My Newsletter</h1>
              <p className="text-center text-muted-foreground">
                Get the latest updates, tips, and exclusive content delivered straight to your inbox.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center space-x-4">
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Sign up with Twitter"
                    className="transition-all duration-300"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Sign up with Facebook"
                    className="transition-all duration-300"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Sign up with Github"
                    className="transition-all duration-300"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"></div>
                <span className="mx-4 flex-shrink text-xs text-gray-400">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"></div>
              </div>

              <form onSubmit={handleSubmit} action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) validateEmail(e.target.value)
                      }}
                      className={`pl-10 transition-all duration-300 ${
                        emailError ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      aria-invalid={!!emailError}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-500 mt-1"
                    >
                      {emailError}
                    </motion.p>
                  )}
                </div>

                {state?.message && !state.success && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription>{state.message}</AlertDescription>
                  </Alert>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
                <a href="#" className="hover:underline transition-colors duration-300">
                  Terms
                </a>
                <a href="#" className="hover:underline transition-colors duration-300">
                  Privacy
                </a>
                <a href="#" className="hover:underline transition-colors duration-300">
                  Help
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4 dark:border-gray-800 transition-colors duration-300">
              <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
