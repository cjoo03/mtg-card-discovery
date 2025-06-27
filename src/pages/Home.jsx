import React, { useEffect, useState } from 'react';
import '../styling/Home.css';

const Home = () => {
    // State for the random expensive card
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch a random card with price > $50 from Scryfall
    const fetchExpensiveCard = async (retryCount = 0) => {
        setLoading(true);
        setError(null);
        try {
            // Scryfall doesn't support direct random expensive card, so fetch a page and pick a random one with a price
            const res = await fetch('https://api.scryfall.com/cards/search?q=usd%3E50&order=random&unique=prints');
            const data = await res.json();
            if (data.data && data.data.length > 0) {
                // Filter to only cards with a price
                const cardsWithPrice = data.data.filter(c => c.prices && c.prices.usd);
                if (cardsWithPrice.length > 0) {
                    // Pick a random card from those with a price
                    const randomCard = cardsWithPrice[Math.floor(Math.random() * cardsWithPrice.length)];
                    setCard(randomCard);
                } else if (retryCount < 3) {
                    // Retry up to 3 times if no card with price found
                    fetchExpensiveCard(retryCount + 1);
                    return;
                } else {
                    setError('No expensive cards with price found after several tries.');
                }
            } else {
                setError('No expensive cards found.');
            }
        } catch (err) {
            setError('Failed to fetch card.');
        }
        setLoading(false);
    };

    // Fetch a card on mount
    useEffect(() => {
        fetchExpensiveCard();
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white p-8 gap-8">
            {/* Left: Description */}
            <div className="flex-1 max-w-xl">
                <h1 className="text-4xl font-bold mb-4">Welcome to MTG Discovery!</h1>
                <p className="text-lg mb-2">
                    Search, explore, and discover Magic: The Gathering cards. Use the Discover page to browse by set, color, or type, and build your own collection.
                </p>
                <p className="text-md text-gray-300">
                    Find card prices, details, and more. Start your journey by searching for your favorite cards or exploring the latest sets!
                </p>
            </div>
            {/* Right: Random expensive card */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 rounded-lg p-6 shadow-lg min-w-[300px] max-w-xs">
                {loading && <p>Loading a rare card...</p>}
                {error && <p className="text-red-400">{error}</p>}
                {card && (
                    <>
                        <img
                            src={card.image_uris?.normal}
                            alt={card.name}
                            className="rounded mb-4 w-full"
                            style={{ maxHeight: 340 }}
                        />
                        <h2 className="text-xl font-bold mb-2 text-center">{card.name}</h2>
                        {card.prices?.usd
                            ? <p className="text-lg text-green-300 font-semibold mb-1 text-center">${card.prices.usd}</p>
                            : <p className="text-md text-yellow-300 font-semibold mb-1 text-center">Price not available</p>
                        }
                        <p className="text-sm text-gray-300 text-center">{card.set_name}</p>
                    </>
                )}
                {/* Refresh button */}
                <button
                    onClick={() => fetchExpensiveCard()}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh Card'}
                </button>
            </div>
        </div>
    )
}

export default Home;