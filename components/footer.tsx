import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="text-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1">
          <div className="lg:col-span-1">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://twitter.com/bsaepfl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xl flex items-center justify-center text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-300 hover-lift"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://github.com/bsaepfl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xl flex items-center justify-center text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-300 hover-lift"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/bsaepfl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xl flex items-center justify-center text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-300 hover-lift"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://t.me/+1VsSQpBLMkI5ZGM0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xl flex items-center justify-center text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-300 hover-lift"
              >
                <span className="sr-only">Telegram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              {/*<a*/}
              {/*  href="https://www.youtube.com/channel/UCk24QUxKrSrJNxmp9EHICAg"*/}
              {/*  target="_blank"*/}
              {/*  rel="noopener noreferrer"*/}
              {/*  className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xl flex items-center justify-center text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-300 hover-lift"*/}
              {/*>*/}
              {/*  <span className="sr-only">YouTube</span>*/}
              {/*  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">*/}
              {/*    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>*/}
              {/*  </svg>*/}
              {/*</a>*/}
              <a
                href="https://www.instagram.com/bsaepfl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xl flex items-center justify-center text-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-300 hover-lift"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.718.302 4.019.57a5.962 5.962 0 0 0-2.153 1.4A5.962 5.962 0 0 0 .466 4.123C.198 4.822.023 5.63-.032 6.86-.088 8.094-.104 8.5-.104 12.121s.016 4.027.072 5.261c.055 1.23.23 2.038.498 2.737a5.962 5.962 0 0 0 1.4 2.153 5.962 5.962 0 0 0 2.153 1.4c.699.268 1.507.443 2.737.498 1.234.056 1.64.072 5.261.072s4.027-.016 5.261-.072c1.23-.055 2.038-.23 2.737-.498a5.962 5.962 0 0 0 2.153-1.4 5.962 5.962 0 0 0 1.4-2.153c.268-.699.443-1.507.498-2.737.056-1.234.072-1.64.072-5.261s-.016-4.027-.072-5.261c-.055-1.23-.23-2.038-.498-2.737a5.962 5.962 0 0 0-1.4-2.153A5.962 5.962 0 0 0 19.881.57C19.182.302 18.374.127 17.144.072 15.91.016 15.504 0 11.883 0h.134zm-.283 2.178c.362-.003.766-.003 1.266-.003 3.584 0 4.011.016 5.426.071 1.309.059 2.021.274 2.496.456.628.244 1.077.536 1.548 1.007.471.471.763.92 1.007 1.548.182.475.397 1.187.456 2.496.055 1.415.071 1.842.071 5.426s-.016 4.011-.071 5.426c-.059 1.309-.274 2.021-.456 2.496-.244.628-.536 1.077-1.007 1.548-.471.471-.92.763-1.548 1.007-.475.182-1.187.397-2.496.456-1.415.055-1.842.071-5.426.071s-4.011-.016-5.426-.071c-1.309-.059-2.021-.274-2.496-.456a4.168 4.168 0 0 1-1.548-1.007 4.168 4.168 0 0 1-1.007-1.548c-.182-.475-.397-1.187-.456-2.496-.055-1.415-.071-1.842-.071-5.426s.016-4.011.071-5.426c.059-1.309.274-2.021.456-2.496.244-.628.536-1.077 1.007-1.548a4.168 4.168 0 0 1 1.548-1.007c.475-.182 1.187-.397 2.496-.456 1.238-.056 1.718-.071 4.426-.071zm.283 3.822a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 9.9a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.441 1.441 0 0 1 2.88 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Blockchain Student Association. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

