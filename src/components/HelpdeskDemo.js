import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, ChevronRight, Clock, Tag, Search, 
  User, Phone, Mail, MessageSquare, AlertCircle,
  CheckCircle, XCircle, Circle, Filter, PieChart,
  Bell, Menu, ArrowLeft, Paperclip, Image
} from 'lucide-react';

const HelpdeskDemo = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Données de démonstration
  const demoTickets = [
    {
      id: 1,
      title: "Problème de connexion",
      status: "open",
      priority: "high",
      customer: "Sophie Martin",
      email: "sophie@example.com",
      created: "Il y a 2h",
      lastUpdate: "Il y a 30min",
      description: "Impossible de me connecter à mon compte depuis ce matin.",
      category: "Authentification",
      messages: [
        { sender: "customer", content: "Bonjour, je n'arrive pas à me connecter.", time: "09:00" },
        { sender: "agent", content: "Bonjour Sophie, pouvez-vous me dire quel message d'erreur vous voyez ?", time: "09:15" },
      ]
    },
    {
      id: 2,
      title: "Bug dans l'interface",
      status: "in_progress",
      priority: "medium",
      customer: "Jean Dupont",
      email: "jean@example.com",
      created: "Il y a 1j",
      lastUpdate: "Il y a 2h",
      description: "Le bouton de validation ne fonctionne pas correctement.",
      category: "Interface",
      messages: [
        { sender: "customer", content: "Le bouton de validation est cassé", time: "Hier" },
        { sender: "agent", content: "Pouvez-vous préciser dans quelle section ?", time: "Hier" },
      ]
    },
    {
      id: 3,
      title: "Question sur la facturation",
      status: "resolved",
      priority: "low",
      customer: "Marie Bernard",
      email: "marie@example.com",
      created: "Il y a 3j",
      lastUpdate: "Il y a 1j",
      description: "Je souhaite modifier mon mode de paiement.",
      category: "Facturation",
      messages: [
        { sender: "customer", content: "Comment puis-je changer ma carte ?", time: "12/03" },
        { sender: "agent", content: "Vous pouvez le faire dans les paramètres.", time: "12/03" },
      ]
    }
  ];

  const [tickets, setTickets] = useState(demoTickets);

  // Stats pour le tableau de bord
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: '2h 15min',
    satisfaction: '4.8/5'
  };

  // Gestion des messages
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      sender: 'agent',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // Filtrage des tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50" // Supprimé le bg-black et bg-opacity-50
  >
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-gray-900 w-full h-screen overflow-hidden" // Changé pour h-screen et supprimé rounded-xl
    >
            {/* Header */}
            <div className="bg-gray-800 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  <Menu size={24} />
                </button>
                <h2 className="text-xl font-bold text-white">Helpdesk Demo</h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative text-gray-400 hover:text-white">
                  <Bell size={24} />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex h-[calc(100vh-64px)]">
              {/* Sidebar */}
              <div className={`
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 transition-transform
                absolute lg:relative z-20 lg:z-0
                w-64 bg-gray-800 h-full overflow-y-auto
              `}>
                <nav className="p-4 space-y-2">
                  {[
                    { id: 'dashboard', icon: PieChart, label: 'Tableau de bord' },
                    { id: 'tickets', icon: MessageSquare, label: 'Tickets' },
                    { id: 'settings', icon: Filter, label: 'Paramètres' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-2 rounded-lg
                        ${activeView === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}
                      `}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto bg-gray-900 relative">
                <AnimatePresence mode="wait">
                  {/* Dashboard View */}
                  {activeView === 'dashboard' && (
                    <motion.div
                      key="dashboard"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6"
                    >
                      <h3 className="text-2xl font-bold mb-6">Tableau de bord</h3>
                      
                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {[
                          { label: 'Tickets Total', value: stats.total, color: 'blue' },
                          { label: 'En attente', value: stats.open, color: 'yellow' },
                          { label: 'En cours', value: stats.inProgress, color: 'purple' },
                          { label: 'Résolus', value: stats.resolved, color: 'green' },
                          { label: 'Temps de réponse moyen', value: stats.avgResponseTime, color: 'pink' },
                          { label: 'Satisfaction client', value: stats.satisfaction, color: 'indigo' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className={`bg-gray-800 p-6 rounded-xl border-l-4 border-${stat.color}-500`}
                          >
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="text-xl font-bold mb-4">Activité récente</h4>
                        <div className="space-y-4">
                          {tickets.slice(0, 5).map(ticket => (
                            <div key={ticket.id} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg">
                              <div className="flex-shrink-0">
                                <User className="text-gray-400" size={24} />
                              </div>
                              <div>
                                <p className="font-medium">{ticket.title}</p>
                                <p className="text-sm text-gray-400">{ticket.customer} - {ticket.lastUpdate}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tickets View */}
                  {activeView === 'tickets' && !selectedTicket && (
                    <motion.div
                      key="tickets"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6"
                    >
                      {/* Search and Filters */}
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            placeholder="Rechercher un ticket..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="px-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">Tous les statuts</option>
                          <option value="open">En attente</option>
                          <option value="in_progress">En cours</option>
                          <option value="resolved">Résolus</option>
                        </select>
                      </div>

                      {/* Tickets List */}
                      <div className="space-y-4">
                        {filteredTickets.map(ticket => (
                          <motion.div
                            key={ticket.id}
                            whileHover={{ scale: 1.01 }}
                            className="bg-gray-800 rounded-xl p-4 cursor-pointer"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-3">
                                  <span className="font-bold">{ticket.title}</span>
                                  <span className={`
                                    px-2 py-1 rounded-full text-xs
                                    ${ticket.status === 'open' ? 'bg-yellow-500/20 text-yellow-500' :
                                      ticket.status === 'in_progress' ? 'bg-blue-500/20 text-blue-500' :
                                      'bg-green-500/20 text-green-500'}
                                  `}>
                                    {ticket.status === 'open' ? 'En attente' :
                                     ticket.status === 'in_progress' ? 'En cours' : 'Résolu'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                  {ticket.customer} - {ticket.email}
                                </p>
                              </div>
                              <div className="text-right text-sm text-gray-400">
                                <p>{ticket.created}</p>
                                <p>Dernière mise à jour: {ticket.lastUpdate}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Ticket Detail View */}
                  {selectedTicket && (
                    <motion.div
                      key="ticket-detail"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="h-full flex flex-col">
                      {/* Header */}
                      <div className="bg-gray-800 p-4 flex items-center space-x-4">
                        <button
                          onClick={() => setSelectedTicket(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          <ArrowLeft size={24} />
                        </button>
                        <div>
                          <h3 className="text-xl font-bold">{selectedTicket.title}</h3>
                          <p className="text-sm text-gray-400">Ticket #{selectedTicket.id}</p>
                        </div>
                      </div>

                      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                        {/* Messages Section */}
                        <div className="flex-1 flex flex-col h-full p-4 overflow-hidden">
                          {/* Messages Container */}
                          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {selectedTicket.messages.map((message, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`
                                  max-w-[80%] p-4 rounded-lg
                                  ${message.sender === 'agent' ? 
                                    'bg-blue-600 ml-8' : 
                                    'bg-gray-800 mr-8'
                                  }
                                `}>
                                  <p>{message.content}</p>
                                  <p className="text-xs text-gray-400 mt-2">{message.time}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Message Input */}
                          <div className="bg-gray-800 rounded-lg p-3">
                            <div className="flex items-end space-x-3">
                              <div className="flex-1">
                                <textarea
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  placeholder="Tapez votre message..."
                                  className="w-full bg-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                  rows="3"
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                  <button className="text-gray-400 hover:text-white">
                                    <Paperclip size={20} />
                                  </button>
                                  <button className="text-gray-400 hover:text-white">
                                    <Image size={20} />
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={handleSendMessage}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                              >
                                <Send size={20} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Ticket Details Sidebar */}
                        <div className="w-full md:w-80 bg-gray-800 p-4 overflow-y-auto">
                          <div className="space-y-6">
                            {/* Status */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-2">Statut</h4>
                              <select
                                value={selectedTicket.status}
                                onChange={(e) => {
                                  const updatedTicket = { ...selectedTicket, status: e.target.value };
                                  setSelectedTicket(updatedTicket);
                                  setTickets(tickets.map(t => 
                                    t.id === selectedTicket.id ? updatedTicket : t
                                  ));
                                }}
                                className="w-full bg-gray-700 rounded-lg p-2 text-white"
                              >
                                <option value="open">En attente</option>
                                <option value="in_progress">En cours</option>
                                <option value="resolved">Résolu</option>
                              </select>
                            </div>

                            {/* Priority */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-2">Priorité</h4>
                              <div className="flex space-x-2">
                                {['low', 'medium', 'high'].map((priority) => (
                                  <button
                                    key={priority}
                                    onClick={() => {
                                      const updatedTicket = { ...selectedTicket, priority };
                                      setSelectedTicket(updatedTicket);
                                      setTickets(tickets.map(t => 
                                        t.id === selectedTicket.id ? updatedTicket : t
                                      ));
                                    }}
                                    className={`
                                      flex-1 py-2 px-3 rounded-lg text-sm
                                      ${selectedTicket.priority === priority ?
                                        'bg-blue-600 text-white' :
                                        'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                      }
                                    `}
                                  >
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-2">Client</h4>
                              <div className="bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                  <User className="text-gray-400" size={24} />
                                  <div>
                                    <p className="font-medium">{selectedTicket.customer}</p>
                                    <p className="text-sm text-gray-400">{selectedTicket.email}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <button className="flex items-center justify-center space-x-2 p-2 bg-gray-600 rounded-lg hover:bg-gray-500">
                                    <Mail size={16} />
                                    <span>Email</span>
                                  </button>
                                  <button className="flex items-center justify-center space-x-2 p-2 bg-gray-600 rounded-lg hover:bg-gray-500">
                                    <Phone size={16} />
                                    <span>Appeler</span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Ticket Details */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-2">Détails</h4>
                              <div className="space-y-3">
                                <div className="bg-gray-700 rounded-lg p-3">
                                  <p className="text-sm text-gray-400">Catégorie</p>
                                  <p>{selectedTicket.category}</p>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-3">
                                  <p className="text-sm text-gray-400">Créé le</p>
                                  <p>{selectedTicket.created}</p>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-3">
                                  <p className="text-sm text-gray-400">Dernière mise à jour</p>
                                  <p>{selectedTicket.lastUpdate}</p>
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-2">Notes internes</h4>
                              <textarea
                                className="w-full bg-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
                                rows="4"
                                placeholder="Ajouter une note..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Settings View */}
                  {activeView === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6"
                    >
                      <h3 className="text-2xl font-bold mb-6">Paramètres</h3>
                      <div className="space-y-6">
                        {/* Notifications */}
                        <div className="bg-gray-800 rounded-xl p-6">
                          <h4 className="text-xl font-bold mb-4">Notifications</h4>
                          <div className="space-y-4">
                            {[
                              "Nouveaux tickets",
                              "Réponses des clients",
                              "Tickets résolus",
                              "Mentions",
                              "Mises à jour système"
                            ].map((setting, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span>{setting}</span>
                                <button className="w-12 h-6 bg-gray-700 rounded-full p-1 duration-300 ease-in-out">
                                  <div className="bg-blue-600 w-4 h-4 rounded-full transform translate-x-6" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Catégories */}
                        <div className="bg-gray-800 rounded-xl p-6">
                          <h4 className="text-xl font-bold mb-4">Catégories de tickets</h4>
                          <div className="space-y-4">
                            {[
                              "Authentification",
                              "Interface",
                              "Facturation",
                              "Technique",
                              "Autres"
                            ].map((category, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span>{category}</span>
                                <div className="flex space-x-2">
                                  <button className="text-blue-500 hover:text-blue-400">
                                    Modifier
                                  </button>
                                  <button className="text-red-500 hover:text-red-400">
                                    Supprimer
                                  </button>
                                </div>
                              </div>
                            ))}
                            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                              Ajouter une catégorie
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelpdeskDemo;