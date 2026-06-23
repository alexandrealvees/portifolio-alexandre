import imgSolyd from '../images/premios/solyd.png'
import imgGohacking from '../images/premios/gohacking.png'
import imgHackviser from '../images/premios/hackviser.png'
import imgHunterspay from '../images/premios/hunterspay.png'

// Fonte única das conquistas (CTFs / rankings), consumida pela seção Achievements.
export const achievements = [
  {
    id: 'hackviser',
    image: imgHackviser,
    medal: '🥇',
    rankKey: 'ach.a3_rank',
    platformKey: 'ach.a3_platform',
    titleKey: 'ach.a3_title',
    descKey: 'ach.a3_desc',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg,#f43f5e,#fb923c)',
    glow: 'rgba(244,63,94,0.22)',
    tags: ['CTF', 'World #1', 'Web', 'Pentest'],
  },
  {
    id: 'solyd',
    image: imgSolyd,
    medal: '🥈',
    rankKey: 'ach.a1_rank',
    platformKey: 'ach.a1_platform',
    titleKey: 'ach.a1_title',
    descKey: 'ach.a1_desc',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg,#00d4ff,#3b82f6)',
    glow: 'rgba(0,212,255,0.22)',
    tags: ['Web', 'Network', 'Exploitation', 'Post-Exploitation'],
  },
  {
    id: 'gohacking',
    image: imgGohacking,
    medal: '🎯',
    rankKey: 'ach.a2_rank',
    platformKey: 'ach.a2_platform',
    titleKey: 'ach.a2_title',
    descKey: 'ach.a2_desc',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg,#6366f1,#818cf8)',
    glow: 'rgba(99,102,241,0.22)',
    tags: ['Forensics', 'Reversing', 'Mobile', 'Crypto', 'OT/Modbus', 'PCAP'],
  },
  {
    id: 'hunterspay',
    image: imgHunterspay,
    medal: '🏆',
    rankKey: 'ach.a4_rank',
    platformKey: 'ach.a4_platform',
    titleKey: 'ach.a4_title',
    descKey: 'ach.a4_desc',
    color: '#10b981',
    gradient: 'linear-gradient(135deg,#10b981,#34d399)',
    glow: 'rgba(16,185,129,0.22)',
    tags: ['Bug Bounty', 'IDOR', 'XSS', 'SSRF', 'Auth Bypass'],
  },
]
