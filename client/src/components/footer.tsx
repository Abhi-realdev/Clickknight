import { motion } from "framer-motion";
import { Shield, GraduationCap, Mail, Phone, Globe, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink, ChevronUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: "URL Checker", href: "#checker", testId: "link-checker" },
    { name: "Why ClickKnight", href: "#overview", testId: "link-overview" },
    { name: "Our Team", href: "#team", testId: "link-team" },
    { name: "About School", href: "#school", testId: "link-school" }
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook, color: "hover:text-[#1877F2]", testId: "social-facebook" },
    { name: "Twitter", href: "#", icon: Twitter, color: "hover:text-[#1DA1F2]", testId: "social-twitter" },
    { name: "Instagram", href: "#", icon: Instagram, color: "hover:text-[#E4405F]", testId: "social-instagram" },
    { name: "LinkedIn", href: "#", icon: Linkedin, color: "hover:text-[#0A66C2]", testId: "social-linkedin" }
  ];

  return (
    <motion.footer 
      className="relative bg-[#1e3a8a] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl" />
      
      {/* Main Footer Content */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-[#38bdf8] to-[#facc15] rounded-2xl flex items-center justify-center neon-glow"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-2xl text-white mb-1">ClickKnight</h3>
                  <p className="text-[#38bdf8] text-sm font-medium">by SPS International School</p>
                  <p className="text-white/70 text-xs">Palwal, Haryana</p>
                </div>
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed max-w-md mb-6">
                Empowering students with cybersecurity knowledge through innovative URL safety checking and educational insights.
              </p>

              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#facc15]" />
                <span>SPS International School, Palwal, Haryana, India</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-xl text-white mb-6">Quick Links</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="flex items-center gap-2 text-white/70 hover:text-[#38bdf8] transition-colors duration-300 group"
                    data-testid={link.testId}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronUp className="w-3 h-3 rotate-90 group-hover:text-[#facc15] transition-colors" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-xl text-white mb-6">Connect With Us</h4>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <motion.div 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                  data-testid="contact-email"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#38bdf8]/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">info@spspalwal.edu.in</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                  data-testid="contact-phone"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#38bdf8]/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 98765 43210</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                  data-testid="contact-website"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#38bdf8]/20 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-sm">www.spspalwal.edu.in</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-white/60 text-sm mb-4">Follow us on social media</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 ${social.color} group`}
                      data-testid={social.testId}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/60">
              <span>© 2024 SPS International School, Palwal. All rights reserved.</span>
              <div className="hidden md:block w-px h-4 bg-white/20" />
              <span className="font-medium text-[#38bdf8]">ClickKnight Cybersecurity Project</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-[#38bdf8] transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[#38bdf8] transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 bg-[#38bdf8]/20 hover:bg-[#38bdf8]/40 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                data-testid="button-scroll-top"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
