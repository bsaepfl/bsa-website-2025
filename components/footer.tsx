import { Twitter, Github, Linkedin, Instagram, Youtube, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="text-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap gap-3 justify-center justify-items-center">
          <a
            href="https://instagram.com/bsaepfl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>

          <a
            href="https://twitter.com/bsaepfl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            <Twitter className="w-5 h-5" />
          </a>

          <a
            href="https://t.me/+1VsSQpBLMkI5ZGM0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            {/* Telegram → Lucide’s "Send" icon (closest equivalent) */}
            <Send className="w-5 h-5" />
          </a>

          <a
            href="https://linkedin.com/company/bsaepfl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="https://github.com/bsaepfl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>

          {/*<a*/}
          {/*  href="https://www.youtube.com/channel/UCk24QUxKrSrJNxmp9EHICAg"*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"*/}
          {/*>*/}
          {/*  <Youtube className="w-5 h-5" />*/}
          {/*</a>*/}

        </div>

      </div>
    </footer>
  )
}

