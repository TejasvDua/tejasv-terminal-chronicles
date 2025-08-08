import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Terminal as TerminalIcon } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string;
  type: 'success' | 'error' | 'info';
}

export function Terminal() {
  const { theme, toggleTheme } = useTheme();
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const resumeData = {
    name: 'Tejasv Dua',
    title: 'Security Researcher & Full-Stack Developer',
    email: 'tejasvdua@example.com',
    education: {
      degree: 'BTech in Computer Science (Information Security)',
      university: 'Vellore Institute of Technology',
      period: 'July 2021 - July 2025',
      highSchool: 'Class 12th - Central Board of Secondary Education (April 2019 - April 2021)'
    },
    experience: [
      {
        title: 'Web Developer Intern',
        company: 'Collab Junction',
        period: 'Sept 2024 - present',
        description: 'Built and maintained responsive web applications using React.js, integrated RESTful APIs, collaborated using Git/GitHub.'
      },
      {
        title: 'Security Audit Intern',
        company: 'M.P. State Electronics Development Corporation Ltd (MPSEDC)',
        period: 'July 2024 - July 2025',
        description: 'Conducted security audits and assessments.'
      },
      {
        title: 'RVDP Contributor and Security Researcher',
        company: 'NCIIPC India (A unit of NTRO)',
        period: 'July 2025',
        description: 'Contributed to vulnerability research and development programs.'
      },
      {
        title: 'Summer Intern',
        company: 'Airports Authority of India (AAI)',
        period: 'Sept 2023 - Oct 2023',
        description: 'Performed vulnerability assessments, malware analysis, developed security policies, conducted security awareness training.'
      }
    ],
    projects: [
      {
        name: 'Skin Disease Classification',
        description: 'Classification of Skin Disease Using Transfer Learning in CNNs',
        details: 'Developed and trained image classification models (ResNet50, Inception V4) to detect 23 types of skin diseases, with a real-time prediction interface.'
      },
      {
        name: 'Malware Classification',
        description: 'Malware Classification using Opcode Sequence Analysis with Machine Learning',
        details: 'Built a malware classification model using machine learning on opcode sequences extracted from .asm files, implementing a TF-IDF-based vectorization pipeline.'
      }
    ],
    skills: {
      languages: ['Python', 'Java', 'C', 'SQL', 'Assembly programming'],
      tools: ['VS Code', 'Git', 'GitHub', 'R Studio', 'SPSS'],
      networking: ['TCP/IP', 'UDP', 'DNS', 'IPv4', 'IPv6', 'Subnetting', 'VLAN', 'MPLS', 'Routing Protocols', 'Switching', 'Network Automation', 'VPN', 'Proxy Servers'],
      security: ['IDA Pro', 'Wireshark', 'Ghidra', 'Sandbox', 'VirusTotal', 'PEiD', 'Burp Suite', 'Metasploit', 'Nmap', 'Snort', 'OllyDbg', 'OpenSSL', 'Threat Intelligence Platforms', 'SIEM tools', 'Endpoint Detection and Response (EDR)', 'Dynamic and static analysis'],
      technologies: ['Linux', 'Machine Learning', 'Node.js', 'CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions']
    }
  };

  const commands = {
    help: () => `Available commands:
  help          - Show this help message
  about         - About ${resumeData.name}
  education     - Education background
  experience    - Work experience
  projects      - Project portfolio
  skills        - Technical skills
  contact       - Contact information
  clear         - Clear terminal
  theme         - Toggle light/dark mode
  whoami        - Display current user
  pwd           - Print working directory
  ls            - List directory contents
  cat <file>    - Display file contents
  
Type any command to get started!`,

    about: () => `${resumeData.name}
${resumeData.title}

A passionate security researcher and full-stack developer with expertise in 
cybersecurity, machine learning, and web development. Currently pursuing BTech 
in Computer Science with specialization in Information Security from VIT.

Key Focus Areas:
• Cybersecurity & Vulnerability Research
• Machine Learning & AI Applications
• Full-Stack Web Development
• Security Tool Development`,

    education: () => `📚 Education:

🎓 ${resumeData.education.degree}
   ${resumeData.education.university}
   ${resumeData.education.period}

🎓 ${resumeData.education.highSchool}`,

    experience: () => resumeData.experience.map(exp => 
      `💼 ${exp.title}
   ${exp.company}
   ${exp.period}
   
   ${exp.description}
   `
    ).join('\n'),

    projects: () => resumeData.projects.map(project => 
      `🚀 ${project.name}
   ${project.description}
   
   ${project.details}
   `
    ).join('\n'),

    skills: () => `🛠️ Technical Skills:

💻 Programming Languages:
   ${resumeData.skills.languages.join(' • ')}

🔧 Developer Tools:
   ${resumeData.skills.tools.join(' • ')}

🌐 Network Security Tools & Protocols:
   ${resumeData.skills.networking.join(' • ')}

🔒 Information Security Tools/Frameworks:
   ${resumeData.skills.security.join(' • ')}

⚡ Technologies/Frameworks:
   ${resumeData.skills.technologies.join(' • ')}`,

    contact: () => `📞 Contact Information:

📧 Email: ${resumeData.email}
🌐 GitHub: github.com/tejasvdua
💼 LinkedIn: linkedin.com/in/tejasvdua
📱 Portfolio: tejasvdua.dev

Feel free to reach out for collaborations, opportunities, or just to chat about cybersecurity and technology!`,

    clear: () => 'CLEAR',
    theme: () => 'THEME_TOGGLE',
    whoami: () => 'tejasv@portfolio:~$ visitor',
    pwd: () => '/home/tejasv/portfolio',
    ls: () => `total 7
drwxr-xr-x  2 tejasv users  4096 Dec  8 2024 about
drwxr-xr-x  2 tejasv users  4096 Dec  8 2024 education
drwxr-xr-x  2 tejasv users  4096 Dec  8 2024 experience
drwxr-xr-x  2 tejasv users  4096 Dec  8 2024 projects
drwxr-xr-x  2 tejasv users  4096 Dec  8 2024 skills
drwxr-xr-x  2 tejasv users  4096 Dec  8 2024 contact
-rw-r--r--  1 tejasv users   102 Dec  8 2024 README.md`,

    cat: (args: string) => {
      const file = args.trim().toLowerCase();
      switch (file) {
        case 'readme.md':
          return `# ${resumeData.name}'s Portfolio Terminal

Welcome to my interactive portfolio! Use the available commands to explore my background, skills, and projects.

Type 'help' to see all available commands.`;
        case 'about':
        case 'education':
        case 'experience':
        case 'projects':
        case 'skills':
        case 'contact':
          const commandFn = commands[file as keyof typeof commands];
          return typeof commandFn === 'function' ? (commandFn as () => string)() : `cat: ${file}: No such file or directory`;
        default:
          return `cat: ${file}: No such file or directory`;
      }
    }
  };

  const executeCommand = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const [command, ...args] = trimmed.toLowerCase().split(' ');
    
    setIsTyping(true);

    let output = '';
    let type: 'success' | 'error' | 'info' = 'info';

    if (command === 'clear') {
      setHistory([]);
      setIsTyping(false);
      return;
    }

    if (command === 'theme') {
      toggleTheme();
      output = `Theme switched to ${theme === 'dark' ? 'light' : 'dark'} mode`;
      type = 'success';
    } else if (command === 'cat') {
      output = commands.cat(args.join(' '));
      type = args.join(' ').trim() === '' || !args.length ? 'error' : 'info';
    } else if (command in commands && command !== 'cat') {
      const commandFn = commands[command as keyof typeof commands];
      if (typeof commandFn === 'function') {
        output = (commandFn as () => string)();
        type = 'success';
      }
    } else if (trimmed === '') {
      output = '';
    } else {
      output = `bash: ${command}: command not found. Type 'help' for available commands.`;
      type = 'error';
    }

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const newEntry: CommandOutput = {
      command: trimmed,
      output,
      type
    };

    setHistory(prev => [...prev, newEntry]);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setIsTyping(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Welcome message
  useEffect(() => {
    const welcomeMessage = `Welcome to ${resumeData.name}'s Portfolio Terminal!

Type 'help' to see available commands or 'about' to get started.
`;

    setHistory([{
      command: '',
      output: welcomeMessage,
      type: 'success'
    }]);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="flex items-center space-x-3">
              <div className="terminal-controls">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
              </div>
              <div className="flex items-center space-x-2">
                <TerminalIcon size={16} className="text-terminal-prompt" />
                <span className="text-sm font-medium">tejasv@portfolio:~</span>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div ref={terminalRef} className="terminal-content">
            {history.map((entry, index) => (
              <div key={index} className="animate-slide-up">
                {entry.command && (
                  <div className="flex items-center mb-1">
                    <span className="terminal-prompt">tejasv@portfolio</span>
                    <span className="text-terminal-text">:</span>
                    <span className="text-terminal-command">~</span>
                    <span className="text-terminal-text">$ </span>
                    <span className="terminal-command">{entry.command}</span>
                  </div>
                )}
                {entry.output && (
                  <pre className={`mb-4 ${
                    entry.type === 'error' ? 'terminal-error' : 
                    entry.type === 'success' ? 'terminal-success' : 
                    'terminal-output'
                  }`}>
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}

            <div className="flex items-center">
              <span className="terminal-prompt">tejasv@portfolio</span>
              <span className="text-terminal-text">:</span>
              <span className="text-terminal-command">~</span>
              <span className="text-terminal-text">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="command-input"
                placeholder={isTyping ? "Processing..." : "Type 'help' for commands"}
                disabled={isTyping}
                autoComplete="off"
              />
              {!isTyping && <span className="typing-cursor"></span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}