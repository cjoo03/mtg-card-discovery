import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card.jsx';

// CardDetail page fetches and displays details for a single card
const CardDetail = () => {
    // Get the card name from the URL params
    const { cardName } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch card data from Scryfall using the card name
        setLoading(true);
        fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`)
            .then(res => {
                if (!res.ok) throw new Error('Card not found');
                return res.json();
            })
            .then(data => {
                setCard(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [cardName]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!card) return null;

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-8">
            {/* Card image and basic info */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <img src={card.image_uris?.large || card.image_uris?.normal} alt={card.name} className="w-80 rounded shadow" />
                <div>
                    <h1 className="text-3xl font-bold mb-2">{card.name}</h1>
                    <p className="text-lg mb-1">{card.type_line}</p>
                    <p className="mb-1">Set: <span className="font-semibold">{card.set_name}</span></p>
                    <p className="mb-1">Mana Cost: <span className="font-mono">{card.mana_cost}</span></p>
                    <p className="mb-1">Rarity: {card.rarity}</p>
                    {card.prices?.usd && <p className="mb-1">Price (USD): ${card.prices.usd}</p>}
                    {card.power && card.toughness && (
                        <p className="mb-1">Power/Toughness: {card.power}/{card.toughness}</p>
                    )}
                    {card.oracle_text && (
                        <p className="mt-2 italic">{card.oracle_text}</p>
                    )}
                </div>
            </div>
            {/* Additional info */}
            {card.flavor_text && (
                <div className="mt-6 p-4 bg-gray-100 rounded italic text-gray-700">
                    "{card.flavor_text}"
                </div>
            )}
            {/* Legalities, rulings, etc. can be added here */}
        </div>
    );
};

export default CardDetail; 