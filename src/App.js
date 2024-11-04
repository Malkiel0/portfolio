import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Briefcase, GraduationCap, Layout, User, Star,
  Languages, Heart, Github, Linkedin, Mail, Phone,
  Monitor, Server, Database, Globe
} from 'lucide-react';
import RestaurantBookingDemo from './components/RestaurantBookingDemo';
import FoodOrderDemo from './components/FoodOrderDemo';
import HelpdeskDemo from './components/HelpdeskDemo';

// Le reste du code reste identique jusqu'à la section des compétences

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingDemo, setShowBookingDemo] = useState(false);
  const [showFoodOrderDemo, setShowFoodOrderDemo] = useState(false);
  const [showHelpdeskDemo, setShowHelpdeskDemo] = useState(false);


  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="w-12 h-12 bg-blue-500"
        />
      </div>
    );
  }

  const SkillCard = ({ icon: Icon, title, level, color }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-lg shadow-lg ${color}`}
    >
      <Icon className="w-8 h-8 mb-2" />
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="h-2 bg-gray-700 rounded-full">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );

  const ProjectCard = ({ title, description, image, tags, link }) => (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl"
    >
      <img
        src={``}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voir le projet
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      >
        {/* Hero Section avec Parallax */}
        <motion.header
          className="relative h-screen flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center z-10"
          >
            <div className="mb-6">
              <img
                src="/img/emmio.jpg"
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-blue-500 mx-auto object-cover"
              />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Emmeran Malkiel LIMA
            </h1>
            <p className="text-2xl text-gray-300 mb-8">Développeur Web Front-End</p>
            {/* Mise à jour de la section des liens sociaux */}
            <div className="flex justify-center space-x-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700"
                href="https://github.com/Malkiel0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700"
                href="https://www.linkedin.com/in/emmeran-malkiel-lima-2545832b3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700"
                href="mailto:malkiellima@icloud.com"
              >
                <Mail size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-700"
                href="https://wa.me/22952017507"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  y: ["0vh", "100vh"],
                  x: `${Math.random() * 100}vw`,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.header>

        {/* Navigation Améliorée */}
        <nav className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-50 py-4">
          <div className="relative max-w-full">
            <div className="flex justify-start md:justify-center overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-4 md:px-0 space-x-3 md:space-x-6">
              {[
                { id: 'about', icon: User, label: 'À Propos' },
                { id: 'experience', icon: Briefcase, label: 'Expérience' },
                { id: 'skills', icon: Code, label: 'Compétences' },
                { id: 'projects', icon: Layout, label: 'Projets' },
                { id: 'education', icon: GraduationCap, label: 'Formation' }
              ].map(({ id, icon: Icon, label }, index) => (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-colors snap-center ${activeSection === id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  onClick={() => {
                    setActiveSection(id);
                    // Défilement automatique sur mobile
                    const button = document.querySelector(`button[data-section="${id}"]`);
                    if (button && window.innerWidth < 768) {
                      button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }}
                  data-section={id}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="text-sm md:text-base whitespace-nowrap">{label}</span>
                </motion.button>
              ))}
            </div>

            {/* Indicateurs de défilement sur mobile */}
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-900/80 to-transparent w-8 pointer-events-none md:hidden" />
            <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-900/80 to-transparent w-8 pointer-events-none md:hidden" />
          </div>

          {/* Ajout du défilement automatique */}
          <style jsx>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
        </nav>

        {/* Contenu Principal avec Animations */}
        <main className="container mx-auto px-4 py-16">
          <AnimatePresence mode="wait">
            {/* À Propos Amélioré */}
            {activeSection === 'about' && (
              <motion.section
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
                    <motion.div variants={itemVariants} className="mb-8">
                      <h2 className="text-3xl font-bold mb-6">À Propos de Moi</h2>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Passionné par le développement web depuis mes débuts, je combine créativité
                        et expertise technique pour créer des solutions web innovantes.
                        Mon parcours m'a permis d'acquérir une solide expérience en tant que
                        développeur full-stack, avec une spécialisation en frontend.
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Informations</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center space-x-3">
                            <Mail className="text-blue-400" />
                            <span>malkiellima@icloud.com</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <Phone className="text-blue-400" />
                            <span>+229 52017507</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <Globe className="text-blue-400" />
                            <span>Cotonou, Bénin</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Langues</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center space-x-3">
                            <Languages className="text-green-400" />
                            <div>
                              <span className="block">Français</span>
                              <span className="text-sm text-gray-400">Courant</span>
                            </div>
                          </li>
                          <li className="flex items-center space-x-3">
                            <Languages className="text-yellow-400" />
                            <div>
                              <span className="block">Anglais</span>
                              <span className="text-sm text-gray-400">Notions</span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Centres d'Intérêt</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {['Football', 'Basketball', 'Jeux vidéo', 'Animés'].map((interest, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Heart className="text-red-400" size={16} />
                              <span>{interest}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.section>
            )}

            {/* Expérience Améliorée */}
            {activeSection === 'experience' && (
              <motion.section
                key="experience"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-4 sm:px-0"
              >
                <div className="relative max-w-4xl mx-auto">
                  <div className="space-y-8">
                    {[
                      {
                        title: "Développeur Web - DA DIGIT ALL",
                        period: "Mars 2024 - Présent",
                        type: "Stage Professionnel",
                        details: [
                          "Développement d'une application de helpdesk complète",
                          "Création de sites vitrines modernes et responsives",
                          "Optimisation des performances des applications existantes",
                          "Intégration de systèmes de paiement en ligne",
                          "Technologies: Laravel, Livewire, Bootstrap, MySQL"
                        ]
                      },
                      {
                        title: "Développeur Web Full-Stack - AFRICA DIGITALIZER",
                        period: "2023 - 2024",
                        details: [
                          "Conception d'une plateforme de commande de nourriture",
                          "Développement d'un système de réservation de restaurants",
                          "Intégration de tableaux de bord analytiques",
                          "Technologies: React, tailwind"
                        ]
                      }
                    ].map((job, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-gray-800 rounded-xl p-6 shadow-xl"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-blue-400">{job.title}</h3>
                            <p className="text-gray-400">{job.period}</p>
                            {job.type && (
                              <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm mt-2">
                                {job.type}
                              </span>
                            )}
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="bg-gray-700 p-3 rounded-full mt-4 sm:mt-0"
                          >
                            <Briefcase className="text-blue-400" size={24} />
                          </motion.div>
                        </div>
                        <ul className="mt-6 space-y-3">
                          {job.details.map((detail, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start space-x-3"
                            >
                              <Star className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                              <span className="text-gray-300">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* Compétences Améliorées avec les modifications demandées */}
            {activeSection === 'skills' && (
              <motion.section
                key="skills"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                      <h3 className="text-2xl font-bold mb-6 text-blue-400">Frontend</h3>
                      {[
                        { name: "React", level: 85 },
                        { name: "HTML/CSS/Sass", level: 90 },
                        { name: "JavaScript/TypeScript", level: 88 },
                        { name: "Tailwind/Bootstrap", level: 92 }
                      ].map((skill, index) => (
                        <motion.div
                          key={index}
                          className="mb-4"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-blue-400">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full">
                            <motion.div
                              className="h-full bg-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                      <h3 className="text-2xl font-bold mb-6 text-blue-400">Backend</h3>
                      {[
                        { name: "Laravel/Livewire", level: 30 }
                      ].map((skill, index) => (
                        <motion.div
                          key={index}
                          className="mb-4"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-purple-400">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full">
                            <motion.div
                              className="h-full bg-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Projets */}
            {activeSection === 'projects' && (
              <motion.section
                key="projects"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      id: "helpdesk",
                      title: "Application Helpdesk",
                      description: "Système complet de gestion de tickets et support client avec tableau de bord en temps réel",
                      image: "/img/help.png",
                      tags: ["React", "Tailwind"],
                    },
                    {
                      id: "booking",
                      title: "Plateforme de Réservation",
                      description: "Application de réservation de tables de restaurant avec gestion en temps réel",
                      image: "/img/reserver.png",
                      tags: ["React", "Tailwind"],
                    },
                    {
                      id: "ecommerce",
                      title: "E-commerce Food",
                      description: "Plateforme de commande de nourriture en ligne avec paiement intégré",
                      image: "/img/food.png",
                      tags: ["React", "Tailwind"],
                    }
                  ].map((project, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl"
                      whileHover={{ y: -10 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-blue-400">{project.title}</h3>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            if (project.id === 'booking') {
                              setShowBookingDemo(true);
                            } else if (project.id === 'ecommerce') {
                              setShowFoodOrderDemo(true);
                            } else if (project.id === 'helpdesk') {
                              setShowHelpdeskDemo(true);
                            }
                          }}
                        >
                          Voir le projet
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Composants de démo */}
                <RestaurantBookingDemo
                  isOpen={showBookingDemo}
                  onClose={() => setShowBookingDemo(false)}
                />
                <FoodOrderDemo
                  isOpen={showFoodOrderDemo}
                  onClose={() => setShowFoodOrderDemo(false)}
                />
                <HelpdeskDemo
                  isOpen={showHelpdeskDemo}
                  onClose={() => setShowHelpdeskDemo(false)}
                />
              </motion.section>
            )}

            {/* Formation mise à jour avec Tailwind dans les certifications */}
            {activeSection === 'education' && (
              <motion.section
                key="education"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
              >
                <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-8 shadow-xl mb-8">
                  <h2 className="text-3xl font-bold mb-6 text-blue-400">Formation Académique</h2>
                  <div className="space-y-8">
                    <div className="relative pl-8 border-l-2 border-blue-500">
                      <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                      <h3 className="text-xl font-bold">Licence en Développement</h3>
                      <p className="text-gray-400">ESGIS, 2023-2024</p>
                      <p className="text-gray-300 mt-2">Architecture logicielle et développement web avancé</p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-blue-500">
                      <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                      <h3 className="text-xl font-bold">Baccalauréat</h3>
                      <p className="text-gray-400">Collège La Colombe, 2020-2021</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-8 shadow-xl">
                  <h2 className="text-3xl font-bold mb-6 text-blue-400">Certifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "HTML/CSS", platform: "Udemy", date: "2023" },
                      { name: "PHP", platform: "Udemy", date: "2024" },
                      { name: "JavaScript", platform: "Udemy", date: "2024" },
                      { name: "Tailwind CSS", platform: "Udemy", date: "2024" },
                      { name: "Développement Web", platform: "Udemy", date: "2024" }
                    ].map((cert, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-700 rounded-lg p-4 flex items-start space-x-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="text-yellow-400 mt-1" size={20} />
                        <div>
                          <h4 className="font-bold">{cert.name}</h4>
                          <p className="text-gray-400">{cert.platform}, {cert.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default Portfolio;