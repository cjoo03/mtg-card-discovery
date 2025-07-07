// Utility for managing the user's card collection in localStorage
// Collection is stored as an array of card objects with complete card data

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
      ...card, // Store complete card data
      quantity: 1,
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

// Import cards from a decklist (merge with existing collection)
export function importCardsToCollection(cards) {
  const collection = getCollection();
  cards.forEach(card => {
    const existing = collection.find(c => c.id === card.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + (card.quantity || 1);
    } else {
      collection.push({
        ...card,
        quantity: card.quantity || 1,
      });
    }
  });
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

// Export collection to CSV
export function exportCollectionToCSV(collection) {
  const headers = ['Name', 'Set', 'Type', 'Price (USD)', 'Quantity', 'Rarity'];
  const rows = collection.map(card => [
    card.name,
    card.set_name || card.set || '',
    card.type_line || card.type || '',
    card.prices?.usd || '',
    card.quantity || 1,
    card.rarity || ''
  ]);
  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mtg-collection.csv';
  a.click();
  URL.revokeObjectURL(url);
}