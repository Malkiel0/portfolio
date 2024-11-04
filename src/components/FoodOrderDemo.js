import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Ajout de cet import
import {
    X, ShoppingCart, Plus, Minus, ArrowRight, Search,
    Filter, Star, Clock, MapPin, ChevronDown, Heart,
    CheckCircle, AlertCircle, Phone, Mail
} from 'lucide-react';

const FoodOrderDemo = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        price: 'all',
        rating: 'all',
        dietary: []
    });
    const [orderStatus, setOrderStatus] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [deliveryTime, setDeliveryTime] = useState('asap');
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: 'all', name: 'Tout' },
        { id: 'popular', name: 'Populaire' },
        { id: 'burgers', name: 'Burgers' },
        { id: 'pizza', name: 'Pizzas' },
        { id: 'salads', name: 'Salades' },
        { id: 'desserts', name: 'Desserts' },
        { id: 'drinks', name: 'Boissons' }
    ];

    const menuItems = [
        // Burgers
        {
            id: 1,
            name: 'Burger Classic',
            price: 9.99,
            image: '/img/classic.webp',
            category: 'burgers',
            description: 'Bœuf frais, salade, tomate, oignon, fromage, sauce maison',
            rating: 4.5,
            reviews: 128,
            calories: 650,
            preparationTime: '15-20',
            dietary: ['halal'],
            customizations: [
                { name: 'Fromage supplémentaire', price: 1 },
                { name: 'Bacon', price: 2 },
                { name: 'Oignons caramélisés', price: 1.5 }
            ],
            popular: true
        },
        {
            id: 2,
            name: 'Burger Végétarien',
            price: 8.99,
            image: '/img/vegetarien.webp',
            category: 'burgers',
            description: 'Steak végétal, avocat, roquette, tomate, sauce végane',
            rating: 4.3,
            reviews: 85,
            calories: 450,
            preparationTime: '15-20',
            dietary: ['vegetarian', 'vegan'],
            customizations: [
                { name: 'Fromage végétal', price: 1.5 },
                { name: 'Champignons grillés', price: 1 }
            ]
        },
        // Pizzas
        {
            id: 3,
            name: 'Pizza Margherita',
            price: 12.99,
            image: '/img/margherita.jpg',
            category: 'pizza',
            description: 'Sauce tomate, mozzarella, basilic frais',
            rating: 4.7,
            reviews: 156,
            calories: 800,
            preparationTime: '20-25',
            dietary: ['vegetarian'],
            customizations: [
                { name: 'Pâte fine', price: 0 },
                { name: 'Extra fromage', price: 2.5 }
            ],
            popular: true
        },
        {
            id: 4,
            name: 'Pizza 4 Fromages',
            price: 14.99,
            image: '/img/fromage.jpg',
            category: 'pizza',
            description: 'Mozzarella, gorgonzola, parmesan, chèvre',
            rating: 4.4,
            reviews: 92,
            calories: 900,
            preparationTime: '20-25',
            dietary: ['vegetarian'],
            customizations: [
                { name: 'Pâte épaisse', price: 0 },
                { name: 'Miel', price: 1 }
            ]
        },
        // Salades
        {
            id: 5,
            name: 'Salade César',
            price: 8.99,
            image: '/img/cesar.webp',
            category: 'salads',
            description: 'Laitue romaine, poulet grillé, croûtons, parmesan',
            rating: 4.2,
            reviews: 73,
            calories: 380,
            preparationTime: '10-15',
            customizations: [
                { name: 'Sans poulet', price: -2 },
                { name: 'Extra poulet', price: 3 }
            ]
        },
        // Desserts
        {
            id: 6,
            name: 'Tiramisu',
            price: 6.99,
            image: '/img/tiramisu.jpg',
            category: 'desserts',
            description: 'Mascarpone, café, cacao, biscuits',
            rating: 4.8,
            reviews: 164,
            calories: 420,
            preparationTime: '5-10',
            dietary: ['vegetarian'],
            popular: true
        },
        // Boissons
        {
            id: 7,
            name: 'Smoothie Fruits Rouges',
            price: 4.99,
            image: '/img/rouge.webp',
            category: 'drinks',
            description: 'Fraises, framboises, myrtilles, yaourt',
            rating: 4.6,
            reviews: 89,
            calories: 180,
            preparationTime: '5-10',
            dietary: ['vegetarian'],
            customizations: [
                { name: 'Protéine végétale', price: 1.5 },
                { name: 'Sans sucre', price: 0 }
            ]
        }
    ];

    const addresses = [
        {
            id: 1,
            type: 'home',
            street: '123 Rue Principale',
            city: 'Cotonou',
            details: 'Appartement 4B',
            default: true
        },
        {
            id: 2,
            type: 'work',
            street: '45 Avenue des Affaires',
            city: 'Cotonou',
            details: 'Bureau 302',
            default: false
        }
    ];

    const promoCodes = {
        'BIENVENUE': 10,
        'SUMMER2024': 15
    };

    useEffect(() => {
        if (selectedAddress === null && addresses.length > 0) {
            setSelectedAddress(addresses.find(addr => addr.default) || addresses[0]);
        }
    }, []);

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'all'
            ? true
            : selectedCategory === 'popular'
                ? item.popular
                : item.category === selectedCategory;

        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPrice = activeFilters.price === 'all' ? true :
            activeFilters.price === 'low' ? item.price < 10 :
                activeFilters.price === 'medium' ? item.price >= 10 && item.price < 15 :
                    item.price >= 15;

        const matchesRating = activeFilters.rating === 'all' ? true :
            item.rating >= parseInt(activeFilters.rating);

        const matchesDietary = activeFilters.dietary.length === 0 ? true :
            activeFilters.dietary.every(diet => item.dietary?.includes(diet));

        return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesDietary;
    });

    const addToCart = (item, customizations = []) => {
        const cartItem = {
            ...item,
            customizations,
            quantity: 1,
            totalPrice: item.price + customizations.reduce((sum, c) => sum + c.price, 0)
        };

        const existingItemIndex = cart.findIndex(i =>
            i.id === item.id &&
            JSON.stringify(i.customizations) === JSON.stringify(customizations)
        );

        if (existingItemIndex !== -1) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity += 1;
            setCart(newCart);
        } else {
            setCart([...cart, cartItem]);
        }
    };

    const removeFromCart = (item) => {
        const existingItemIndex = cart.findIndex(i =>
            i.id === item.id &&
            JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
        );

        if (cart[existingItemIndex].quantity === 1) {
            setCart(cart.filter((_, index) => index !== existingItemIndex));
        } else {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity -= 1;
            setCart(newCart);
        }
    };

    const toggleFavorite = (itemId) => {
        if (favorites.includes(itemId)) {
            setFavorites(favorites.filter(id => id !== itemId));
        } else {
            setFavorites([...favorites, itemId]);
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
    const deliveryFee = 2.99;
    const discount = (subtotal * promoDiscount) / 100;
    const total = subtotal + deliveryFee - discount;

    const applyPromoCode = () => {
        if (promoCodes[promoCode]) {
            setPromoDiscount(promoCodes[promoCode]);
        } else {
            setPromoDiscount(0);
        }
    };

    const simulateOrder = () => {
        setLoading(true);
        setTimeout(() => {
            setOrderStatus('confirmed');
            setLoading(false);
            setStep(3); // Passer à l'étape de confirmation
        }, 2000);
    };

    const ProductCard = ({ item }) => (
        <div className="bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="relative mb-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                />
                <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-2 right-2 p-2 bg-gray-900 rounded-full"
                >
                    <Heart
                        className={`w-5 h-5 ${favorites.includes(item.id) ? 'text-red-500 fill-current' : 'text-gray-300'}`}
                    />
                </button>
            </div>

            {/* Ajout d'une div pour gérer le badge populaire et le titre */}
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-lg flex-1">{item.name}</h3>
                <div className="flex items-center gap-2">
                    {item.popular && (
                        <span className="bg-blue-600 text-sm px-2 py-1 rounded-full whitespace-nowrap">
                            Populaire
                        </span>
                    )}
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{item.rating}</span>
                        <span className="text-gray-400 text-sm ml-1">({item.reviews})</span>
                    </div>
                </div>
            </div>

            <p className="text-gray-400 text-sm mb-2">{item.description}</p>

            <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{item.preparationTime} min</span>
                </div>
                <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span>{item.calories} cal</span>
                </div>
            </div>

            {item.dietary && (
                <div className="flex gap-2 mb-3">
                    {item.dietary.map(diet => (
                        <span
                            key={diet}
                            className="text-xs px-2 py-1 bg-gray-700 rounded-full"
                        >
                            {diet}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-400">${item.price}</span>
                <button
                    onClick={() => addToCart(item)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Ajouter
                </button>
            </div>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="w-full h-full bg-gray-900 overflow-y-auto">


                {/* Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm z-10 p-6 border-b border-gray-800">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Ajoutez ceci juste après le bouton de fermeture dans le header */}
                    <div className="absolute top-4 right-16">
                        <button
                            onClick={() => cart.length > 0 && setStep(1)}
                            className={`p-2 rounded-full relative ${cart.length > 0 ? 'hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'}`}
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    <h2 className="text-3xl font-bold mb-4">Food Express</h2>
                    <div className="flex gap-6">
                        {/* Dans la partie du header, modifiez la boucle map */}
                        {['Menu', 'Panier', 'Livraison', 'Confirmation'].map((s, i) => (
                            <div
                                key={i}
                                className={`flex items-center ${i < step ? 'text-green-500' :
                                    i === step ? 'text-blue-500' :
                                        'text-gray-500'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 relative
      ${i < step ? 'border-green-500 bg-green-500/20' :
                                        i === step ? 'border-blue-500 bg-blue-500/20' : 'border-gray-500'}`}
                                >
                                    {i < step ? <CheckCircle className="w-5 h-5" /> : i + 1}
                                    {/* Badge pour l'étape Panier */}
                                    {s === 'Panier' && cart.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    )}
                                </div>
                                <span className="ml-2">{s}</span>
                                {i < 3 && <ArrowRight className="ml-2" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu Step */}
                {step === 0 && (
                    <div>
                        {/* Search and Filters */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex-1 min-w-[300px]">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un plat..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex gap-4 flex-wrap">
                                <select
                                    value={activeFilters.price}
                                    onChange={(e) => setActiveFilters({ ...activeFilters, price: e.target.value })}
                                    className="bg-gray-800 rounded-lg px-4 py-2"
                                >
                                    <option value="all">Prix: Tous</option>
                                    <option value="low">Prix: € &lt; 10</option>
                                    <option value="medium">Prix: € 10-15</option>
                                    <option value="high">Prix: € &gt; 15</option>
                                </select>

                                <select
                                    value={activeFilters.rating}
                                    onChange={(e) => setActiveFilters({ ...activeFilters, rating: e.target.value })}
                                    className="bg-gray-800 rounded-lg px-4 py-2"
                                >
                                    <option value="all">Note: Tous</option>
                                    <option value="4">4+ étoiles</option>
                                    <option value="4.5">4.5+ étoiles</option>
                                </select>

                                <div className="relative">
                                    <button
                                        onClick={() => document.getElementById('dietary-menu').classList.toggle('hidden')}
                                        className="bg-gray-800 rounded-lg px-4 py-2 flex items-center gap-2"
                                    >
                                        <Filter className="w-4 h-4" />
                                        Régimes
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                    <div
                                        id="dietary-menu"
                                        className="hidden absolute top-full mt-2 bg-gray-800 rounded-lg p-2 shadow-xl z-10"
                                    >
                                        {['vegetarian', 'vegan', 'halal'].map(diet => (
                                            <label key={diet} className="flex items-center p-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={activeFilters.dietary.includes(diet)}
                                                    onChange={(e) => {
                                                        const newDietary = e.target.checked
                                                            ? [...activeFilters.dietary, diet]
                                                            : activeFilters.dietary.filter(d => d !== diet);
                                                        setActiveFilters({ ...activeFilters, dietary: newDietary });
                                                    }}
                                                    className="mr-2"
                                                />
                                                {diet.charAt(0).toUpperCase() + diet.slice(1)}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="mb-6 overflow-x-auto">
                            <div className="flex gap-4 pb-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category.id
                                            ? 'bg-blue-600'
                                            : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Menu Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map(item => (
                                <ProductCard key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Ajoutez le bouton flottant du panier ici */}
                        {cart.length > 0 && (
                            <div className="fixed bottom-6 right-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    <div className="relative">
                                        <ShoppingCart className="w-6 h-6" />
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    </div>
                                    <span className="font-semibold">Voir le panier</span>
                                    <span className="font-bold">${total.toFixed(2)}</span>
                                </button>
                            </div>
                        )}

                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-400">Aucun résultat trouvé</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Cart Step */}
                {step === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {cart.map((item, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg p-4 flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-bold">{item.name}</h3>
                                                <span className="text-blue-400">
                                                    ${(item.totalPrice * item.quantity).toFixed(2)}
                                                </span>
                                            </div>

                                            {item.customizations?.length > 0 && (
                                                <div className="text-sm text-gray-400 mt-1">
                                                    {item.customizations.map((c, i) => (
                                                        <span key={i}>
                                                            {c.name} (+${c.price})
                                                            {i < item.customizations.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center gap-2 bg-gray-700 rounded-lg">
                                                    <button
                                                        onClick={() => removeFromCart(item)}
                                                        className="p-2 hover:bg-gray-600 rounded-l-lg"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addToCart(item, item.customizations)}
                                                        className="p-2 hover:bg-gray-600 rounded-r-lg"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {cart.length === 0 && (
                                    <div className="text-center py-12">
                                        <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                        <p className="text-gray-400">Votre panier est vide</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4">Résumé de la commande</h3>

                                {/* Promo Code */}
                                <div className="flex gap-2 mb-6">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        placeholder="Code promo"
                                        className="flex-1 bg-gray-700 rounded-lg px-4 py-2"
                                    />
                                    <button
                                        onClick={applyPromoCode}
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                                    >
                                        Appliquer
                                    </button>
                                </div>

                                {/* Order Summary */}
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex justify-between">
                                        <span>Sous-total</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Livraison</span>
                                        <span>${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    {promoDiscount > 0 && (
                                        <div className="flex justify-between text-green-500">
                                            <span>Réduction ({promoDiscount}%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delivery Step */}
                {step === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Delivery Address */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4">Adresse de livraison</h3>
                                <div className="space-y-4">
                                    {addresses.map(address => (
                                        <div
                                            key={address.id}
                                            onClick={() => setSelectedAddress(address)}
                                            className={`p-4 rounded-lg cursor-pointer border-2 ${selectedAddress?.id === address.id
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-gray-700 hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-bold">
                                                        {address.type === 'home' ? 'Domicile' : 'Bureau'}
                                                    </h4>
                                                    <p className="text-gray-400">{address.street}</p>
                                                    <p className="text-gray-400">{address.city}</p>
                                                    {address.details && (
                                                        <p className="text-gray-400">{address.details}</p>
                                                    )}
                                                </div>
                                                {address.default && (
                                                    <span className="bg-blue-600 px-2 py-1 rounded-full text-sm">
                                                        Par défaut
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => setShowAddressModal(true)}
                                        className="w-full p-4 rounded-lg border-2 border-dashed border-gray-700 hover:border-gray-600 text-center"
                                    >
                                        + Ajouter une nouvelle adresse
                                    </button>
                                </div>
                            </div>

                            {/* Delivery Time */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4">Heure de livraison</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            checked={deliveryTime === 'asap'}
                                            onChange={() => setDeliveryTime('asap')}
                                            className="form-radio"
                                        />
                                        <span>Dès que possible (25-35 min)</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            checked={deliveryTime === 'scheduled'}
                                            onChange={() => setDeliveryTime('scheduled')}
                                            className="form-radio"
                                        />
                                        <span>Planifier pour plus tard</span>
                                    </label>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4">Informations de contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm mb-2">Téléphone</label>
                                        <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
                                            <Phone className="w-5 h-5 mr-2 text-gray-400" />
                                            <input
                                                type="tel"
                                                placeholder="+229 XXXXXXXX"
                                                className="bg-transparent flex-1"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">Email</label>
                                        <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
                                            <Mail className="w-5 h-5 mr-2 text-gray-400" />
                                            <input
                                                type="email"
                                                placeholder="votre@email.com"
                                                className="bg-transparent flex-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
                                <h3 className="text-xl font-bold mb-4">Résumé de la commande</h3>

                                <div className="space-y-4 mb-6">
                                    {cart.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>
                                                {item.quantity}x {item.name}
                                            </span>
                                            <span>${(item.totalPrice * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 text-gray-300">
                                    <div className="flex justify-between">
                                        <span>Sous-total</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Livraison</span>
                                        <span>${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    {promoDiscount > 0 && (
                                        <div className="flex justify-between text-green-500">
                                            <span>Réduction ({promoDiscount}%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Order Confirmation Step */}
                {step === 3 && (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-gray-800 rounded-lg p-8">
                            {orderStatus === 'confirmed' ? (
                                <>
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Commande confirmée!</h3>
                                    <p className="text-gray-400 mb-6">
                                        Votre commande a été confirmée et est en cours de préparation.
                                        Vous recevrez des mises à jour sur son statut par SMS et email.
                                    </p>
                                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                                        <p className="font-bold mb-2">Numéro de commande</p>
                                        <p className="text-blue-400">#FE{Math.floor(Math.random() * 100000)}</p>
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Temps de livraison estimé</span>
                                            <span>25-35 minutes</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Adresse de livraison</span>
                                            <span className="text-right">
                                                {selectedAddress?.street}<br />
                                                {selectedAddress?.city}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
                                    >
                                        Fermer
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        animate={{
                                            rotate: 360
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                                    />
                                    <p>Traitement de votre commande...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                {step < 3 && (
                    <div className="mt-6 flex justify-between">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                            >
                                Retour
                            </button>
                        )}
                        {cart.length > 0 && (
                            <button
                                onClick={() => {
                                    if (step === 2) {
                                        simulateOrder();
                                    } else {
                                        setStep(step + 1);
                                    }
                                }}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg ml-auto flex items-center gap-2"
                            >
                                {step === 0 && (
                                    <>
                                        Voir le panier
                                        <ShoppingCart className="w-4 h-4" />
                                    </>
                                )}
                                {step === 1 && "Continuer vers la livraison"}
                                {step === 2 && (
                                    <>
                                        {loading ? (
                                            <span>Traitement...</span>
                                        ) : (
                                            <>Confirmer la commande (${total.toFixed(2)})</>
                                        )}
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                )}

                {/* New Address Modal */}
                {showAddressModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">Ajouter une nouvelle adresse</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-2">Type d'adresse</label>
                                    <select className="w-full bg-gray-800 rounded-lg px-4 py-2">
                                        <option value="home">Domicile</option>
                                        <option value="work">Bureau</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Rue</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                                        placeholder="123 Rue Principale"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Ville</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                                        placeholder="Cotonou"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Détails (Optionnel)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                                        placeholder="Appartement, étage, etc."
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <input type="checkbox" id="default-address" className="mr-2" />
                                    <label htmlFor="default-address">Définir comme adresse par défaut</label>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddressModal(false)}
                                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddressModal(false)}
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                                    >
                                        Sauvegarder
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodOrderDemo;