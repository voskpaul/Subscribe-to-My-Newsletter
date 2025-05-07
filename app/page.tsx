import NewsletterSignup from "@/components/newsletter-signup"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 dark:from-purple-950 dark:via-purple-900 dark:to-purple-950 p-4 transition-colors duration-300 relative">
      <ThemeToggle />
      <NewsletterSignup />
    </main>
  )
}
