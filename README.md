# MTG Discovery

A React-based web application for exploring and discovering Magic: The Gathering cards. Built with modern web technologies and integrated with the Scryfall API to provide comprehensive card information and search capabilities.

## 🎯 Features

### 🔍 Card Discovery
- **Browse by Sets**: Explore cards from any Magic: The Gathering set with detailed set information including release dates and card counts
- **Filter by Color**: Discover cards by color identity (White, Blue, Black, Red, Green, or Multicolor)
- **Filter by Type**: Browse cards by type (Artifact, Enchantment, Creature, Land, Instant, Planeswalker, Sorcery)
- **Random Discovery**: Get random cards for inspiration and exploration

### 📱 User Interface
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **Card Grid Display**: Beautiful card layouts with hover effects and smooth interactions
- **Search Functionality**: Global search bar to quickly find specific cards
- **Navigation**: Intuitive navigation between different discovery modes

### 🃏 Card Details
- **Comprehensive Information**: View detailed card information including mana cost, rarity, power/toughness, and pricing
- **High-Quality Images**: Display card artwork in high resolution
- **Oracle Text**: Read card rules text and flavor text
- **Set Information**: Track which set each card belongs to

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mtg-discovery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Routing**: React Router DOM 7.6.2
- **Styling**: Tailwind CSS 3.4.17
- **API Integration**: Scryfall API
- **Code Quality**: ESLint with React-specific rules

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.jsx        # Card display component
│   ├── Navbar.jsx      # Navigation bar
│   └── SearchBar.jsx   # Global search functionality
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Discover.jsx    # Card discovery interface
│   ├── YourCards.jsx   # User's card collection (placeholder)
│   └── CardDetail.jsx  # Individual card details
├── styling/            # CSS files for component styling
├── utils/              # Utility functions and helpers
└── assets/             # Static assets and images
```

## 🎮 Usage

### Discovering Cards

1. **Navigate to Discover**: Click on the "Discover" link in the navigation
2. **Choose Discovery Mode**:
   - **Sets**: Browse cards by Magic: The Gathering set
   - **Color**: Filter cards by color identity
   - **Type**: Filter cards by card type
3. **Select Your Criteria**: Choose a specific set, color, or type
4. **Browse Results**: View cards in a responsive grid layout
5. **Load More**: Use pagination to load additional cards (where available)

### Searching for Cards

1. **Use the Search Bar**: Located in the navigation bar
2. **Enter Card Name**: Type the name of the card you're looking for
3. **View Details**: Click on any card to see detailed information

### Card Details

When viewing a card's details, you'll see:
- High-resolution card artwork
- Complete card information (mana cost, type, rarity)
- Oracle text and flavor text
- Pricing information (when available)
- Set information and release details

## 🔧 API Integration

This application integrates with the [Scryfall API](https://scryfall.com/docs/api), a comprehensive Magic: The Gathering card database. The API provides:

- Complete card information and metadata
- High-quality card images
- Set information and release dates
- Pricing data
- Oracle text and rulings

## 🎨 Styling

The application uses Tailwind CSS for styling, providing:
- Responsive design that works on all devices
- Dark theme with modern UI elements
- Smooth animations and hover effects
- Consistent spacing and typography

## 🚧 Future Enhancements

- [ ] User authentication and account management
- [ ] Personal card collection tracking
- [ ] Deck building tools
- [ ] Advanced filtering and sorting options
- [ ] Card price tracking and alerts
- [ ] Social features for sharing discoveries
- [ ] Offline functionality with service workers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Scryfall](https://scryfall.com/) for providing the comprehensive MTG API
- [Wizards of the Coast](https://company.wizards.com/) for Magic: The Gathering
- The React and Vite communities for excellent development tools

---

**Happy card hunting! 🃏✨**
