import Link from "next/link"
import { Mail, Linkedin, Instagram, MessageCircle } from "lucide-react"

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4 text-foreground">
      <Link
        href="https://wa.me/918454055228"
        target="_blank"
        aria-label="WhatsApp"
        className="hover:text-green-500 transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
      </Link>

      <Link
        href="mailto:yashwant@thecodelawyers.com"
        aria-label="Email"
        className="hover:text-blue-500 transition-colors"
      >
        <Mail className="h-5 w-5" />
      </Link>

      <Link
        href="https://www.linkedin.com/company/111461921/"
        target="_blank"
        aria-label="LinkedIn"
        className="hover:text-blue-600 transition-colors"
      >
        <Linkedin className="h-5 w-5" />
      </Link>

      <Link
        href="https://www.instagram.com/thecodelawyers/"
        target="_blank"
        aria-label="Instagram"
        className="hover:text-pink-500 transition-colors"
      >
        <Instagram className="h-5 w-5" />
      </Link>
    </div>
  )
}
