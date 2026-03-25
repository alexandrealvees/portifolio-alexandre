import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { GiRobotGolem } from "react-icons/gi";


const Links = [
  { icon: FiGithub, href: 'https://github.com/alexandrealvees', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/alexandre-alvees', label: 'LinkedIn' },
]


export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
          </div>

          <div className="flex items-center gap-4">
            {Links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-500 hover:text-neon-cyan transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-600 flex items-center gap-1">
          <GiRobotGolem className="text-neon-purple" size={20} /> Tron Security &copy; {new Date().getFullYear()} <GiRobotGolem className="text-neon-purple" size={20} />
            
          </p>
        </div>
      </div>
    </footer>
  )
}
