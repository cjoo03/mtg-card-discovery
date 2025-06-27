// Utility for managing the user's card collection in localStorage
// Collection is stored as an array of card objects (id, name, set, price, quantity, etc.)

const COLLECTION_KEY = 'mtg-discovery-collection';

// Get the current collection from localStorage
export function getCollection() {
  const data = localStorage.getItem(COLLECTION_KEY);
  return data ? JSON.parse(data) : [];
}

// Add a card to the collection (increase quantity if already present)
export function addCardToCollection(card) {
  const collection = getCollection();
  const existing = collection.find(c => c.id === card.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    collection.push({
      id: card.id,
      name: card.name,
      set: card.set_name,
      price: card.prices?.usd || null,
      quantity: 1,
      image: card.image_uris?.normal || '',
      type: card.type_line,
    });
  }
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

// Remove a card from the collection by id
export function removeCardFromCollection(cardId) {
  const collection = getCollection().filter(c => c.id !== cardId);
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

// Update the quantity of a card in the collection
export function updateCardQuantity(cardId, quantity) {
  const collection = getCollection();
  const card = collection.find(c => c.id === cardId);
  if (card) {
    card.quantity = quantity;
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
  }
}

// Clear the entire collection
export function clearCollection() {
  localStorage.removeItem(COLLECTION_KEY);
} 