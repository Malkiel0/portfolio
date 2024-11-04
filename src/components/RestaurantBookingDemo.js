import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Clock, Users, ChevronRight, Search, Award, Star,
  MapPin, Filter, Heart, Share2, Phone, Mail, Menu, DollarSign,
  MessageSquare, Info, Coffee, Wifi, Wind, Sun, ChevronLeft,
  CircleParking // Ajouté ici
} from 'lucide-react';

// Composant de carte restaurant détaillé
const RestaurantCard = ({ restaurant, onBooking, onFavorite, isFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Wifi': <Wifi size={16} />,
      'Parking': <CircleParking size={16} />, // Notez le changement ici
      'Climatisation': <Wind size={16} />,
      'Terrasse': <Sun size={16} />
    };
    return icons[amenity] || <Info size={16} />;
  };

  

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg relative"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onFavorite(restaurant.id)}
            className={`p-2 rounded-full ${
              isFavorite ? 'bg-red-500' : 'bg-gray-800 bg-opacity-80'
            }`}
          >
            <Heart className={isFavorite ? 'text-white' : 'text-gray-300'} size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-800 bg-opacity-80"
          >
            <Share2 className="text-gray-300" size={16} />
          </motion.button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="text-yellow-400 w-4 h-4 mr-1" />
              <span className="text-gray-300">{restaurant.rating}</span>
            </div>
            <span className="text-gray-400">({restaurant.reviewCount} avis)</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-400 mb-2">
          <span>{restaurant.cuisine}</span>
          <span className="mx-2">•</span>
          <span>{restaurant.priceRange}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span>{restaurant.location}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">{restaurant.description}</p>

        {/* Caractéristiques du restaurant */}
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.features.map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-700 pt-4 mb-4"
          >
            {/* Horaires d'ouverture */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Horaires d'ouverture</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                {restaurant.openingHours.map((hour, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{hour.day}</span>
                    <span>{hour.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commodités */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Commodités</h4>
              <div className="grid grid-cols-2 gap-2">
                {restaurant.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-400">
                    {getAmenityIcon(amenity)}
                    <span className="ml-2">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu preview */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Aperçu du menu</h4>
              <div className="grid grid-cols-2 gap-4">
                {restaurant.menuPreview.map((item, index) => (
                  <div key={index} className="text-sm">
                    <div className="text-white">{item.name}</div>
                    <div className="text-gray-400">{item.price} €</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex space-x-2">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            onClick={() => onBooking(restaurant)}
          >
            <span>Réserver</span>
            <ChevronRight size={16} />
          </button>
          <button
            className="px-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Info size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Composant de filtres
const FilterSection = ({ filters, setFilters }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filtres</h3>
        <button
          className="text-blue-400 text-sm"
          onClick={() => setFilters({
            cuisine: [],
            price: [],
            rating: null,
            features: []
          })}
        >
          Réinitialiser
        </button>
      </div>

      {/* Prix */}
      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Prix</h4>
        <div className="flex space-x-2">
          {['$', '$$', '$$$', '$$$$'].map((price) => (
            <button
              key={price}
              className={`px-3 py-1 rounded-lg text-sm ${
                filters.price.includes(price)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => {
                const newPrices = filters.price.includes(price)
                  ? filters.price.filter(p => p !== price)
                  : [...filters.price, price];
                setFilters({ ...filters, price: newPrices });
              }}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine */}
      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Cuisine</h4>
        <div className="flex flex-wrap gap-2">
          {['Française', 'Italienne', 'Japonaise', 'Indienne', 'Végétarienne'].map((cuisine) => (
            <button
              key={cuisine}
              className={`px-3 py-1 rounded-lg text-sm ${
                filters.cuisine.includes(cuisine)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => {
                const newCuisines = filters.cuisine.includes(cuisine)
                  ? filters.cuisine.filter(c => c !== cuisine)
                  : [...filters.cuisine, cuisine];
                setFilters({ ...filters, cuisine: newCuisines });
              }}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Note minimale */}
      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Note minimale</h4>
        <div className="flex space-x-2">
          {[4, 4.5].map((rating) => (
            <button
              key={rating}
              className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                filters.rating === rating
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setFilters({ ...filters, rating })}
            >
              <Star size={14} className="mr-1" />
              {rating}+
            </button>
          ))}
        </div>
      </div>

      {/* Caractéristiques */}
      <div>
        <h4 className="text-sm text-gray-400 mb-2">Caractéristiques</h4>
        <div className="flex flex-wrap gap-2">
          {['Terrasse', 'Parking', 'Wifi', 'Climatisation'].map((feature) => (
            <button
              key={feature}
              className={`px-3 py-1 rounded-lg text-sm ${
                filters.features.includes(feature)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => {
                const newFeatures = filters.features.includes(feature)
                  ? filters.features.filter(f => f !== feature)
                  : [...filters.features, feature];
                setFilters({ ...filters, features: newFeatures });
              }}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant principal
const RestaurantBookingDemo = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: [],
    price: [],
    rating: null,
    features: []
  });
  const [bookingDetails, setBookingDetails] = useState({
    specialRequests: '',
    occasion: '',
    phoneNumber: '',
    email: ''
  });

  const [restaurants] = useState([
    {
      id: 1,
      name: "Le Jardin Secret",
      image: "img/jardin.jpeg",
      rating: 4.8,
      reviewCount: 324,
      cuisine: "Française",
      priceRange: "$$$",
      location: "75008 Paris",
      description: "Une expérience gastronomique unique dans un cadre enchanteur",
      features: ["Vue panoramique", "Cuisine raffinée", "Cave à vins"],
      openingHours: [
        { day: "Lundi-Vendredi", hours: "12:00-23:00" },
        { day: "Samedi-Dimanche", hours: "11:00-00:00" }
      ],
      amenities: ["Wifi", "Parking", "Climatisation", "Terrasse"],
      menuPreview: [
        { name: "Foie Gras Maison", price: 28 },
        { name: "Filet de Bœuf", price: 42 },
        { name: "Soufflé au Chocolat", price: 16 }
      ]
    },
    // Ajoutez plus de restaurants avec la même structure
  ]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 300 }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const handleBooking = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setStep(2);
  };

  const toggleFavorite = (restaurantId) => {
    setFavorites(prev => 
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Wifi': <Wifi size={16} />,
      'Parking': <CircleParking size={16} />,
      'Climatisation': <Wind size={16} />,
      'Terrasse': <Sun size={16} />
    };
    return icons[amenity] || <Info size={16} />;
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.cuisine.length && !filters.cuisine.includes(restaurant.cuisine)) {
      return false;
    }
    if (filters.price.length && !filters.price.includes(restaurant.priceRange)) {
      return false;
    }
    if (filters.rating && restaurant.rating < filters.rating) {
      return false;
    }
    if (filters.features.length && !filters.features.every(feature => 
      restaurant.features.includes(feature)
    )) {
      return false;
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
  <motion.div
    variants={modalVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="bg-gradient-to-br from-gray-900 to-gray-800 w-full h-full overflow-auto"
  >
          {/* Header */}
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                {step === 1 ? "Découvrez les meilleurs restaurants" : 
                 step === 2 ? `Réserver chez ${selectedRestaurant?.name}` :
                 "Confirmation de réservation"}
              </h2>
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-gray-400 text-sm flex items-center mt-2 hover:text-white"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Retour
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="text-gray-400 hover:text-white" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto">
            {step === 1 && (
              <>
                {/* Search and Filter Section */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Rechercher un restaurant..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-3 rounded-lg flex items-center space-x-2 ${
                      showFilters ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    <Filter size={20} />
                    <span>Filtres</span>
                  </button>
                </div>

                {/* Filters */}
                {showFilters && (
                  <FilterSection filters={filters} setFilters={setFilters} />
                )}

                {/* Restaurant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onBooking={handleBooking}
                      onFavorite={toggleFavorite}
                      isFavorite={favorites.includes(restaurant.id)}
                    />
                  ))}
                </div>
              </>
            )}

            {step === 2 && selectedRestaurant && (
              <div className="space-y-6">
                {/* Sélection Date/Heure/Convives */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Détails de la réservation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Heure</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                        >
                          <option value="">Sélectionner une heure</option>
                          {generateTimeSlots().map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Nombre de convives</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'personne' : 'personnes'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations complémentaires */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Informations complémentaires</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Occasion spéciale</label>
                      <select
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                        value={bookingDetails.occasion}
                        onChange={(e) => setBookingDetails({...bookingDetails, occasion: e.target.value})}
                      >
                        <option value="">Sélectionner une occasion</option>
                        <option value="birthday">Anniversaire</option>
                        <option value="anniversary">Anniversaire de mariage</option>
                        <option value="business">Repas d'affaires</option>
                        <option value="date">Rendez-vous romantique</option>
                        <option value="other">Autre occasion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Demandes spéciales</label>
                      <textarea
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 h-24"
                        placeholder="Allergies, préférences alimentaires, demandes particulières..."
                        value={bookingDetails.specialRequests}
                        onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="+33 6 12 34 56 78"
                          value={bookingDetails.phoneNumber}
                          onChange={(e) => setBookingDetails({...bookingDetails, phoneNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="votre@email.com"
                          value={bookingDetails.email}
                          onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton de confirmation */}
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold shadow-lg flex items-center justify-center space-x-2"
                  onClick={() => setStep(3)}
                >
                  <span>Confirmer la réservation</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="bg-green-500 bg-opacity-20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <Award className="text-green-400" size={40} />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Réservation Confirmée!</h3>
                  <p className="text-gray-400">
                    Votre table est réservée chez {selectedRestaurant?.name}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-auto">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date</span>
                      <span className="font-medium">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Heure</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Convives</span>
                      <span className="font-medium">{guests} {guests === 1 ? 'personne' : 'personnes'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Numéro de réservation</span>
                      <span className="font-medium">{generateBookingNumber()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
                    onClick={() => {/* Ajouter au calendrier */}}
                  >
                    <Calendar size={20} />
                    <span>Ajouter au calendrier</span>
                  </button>
                  <button
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg flex items-center space-x-2"
                    onClick={onClose}
                  >
                    <X size={20} />
                    <span>Fermer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Fonctions utilitaires
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 11; hour <= 22; hour++) {
    for (let minute of ['00', '30']) {
      slots.push(`${hour}:${minute}`);
    }
  }
  return slots;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const generateBookingNumber = () => {
  return 'RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default RestaurantBookingDemo;