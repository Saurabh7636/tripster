# Tripster - Hotel Booking Application

A modern, full-featured hotel booking platform built with Next.js, TypeScript, and Tailwind CSS. Tripster allows users to search, filter, and book hotel rooms with an intuitive user interface.

## Features

- 🏨 **Browse Hotels** - Explore a wide selection of hotels with detailed information
- 🔍 **Advanced Search** - Filter by location, price, rating, amenities, and more
- 📅 **Date-based Booking** - Search and book hotels for specific dates
- 💳 **Secure Booking Process** - Multi-step booking form with payment details
- 👤 **User Authentication** - Secure login and user profiles with NextAuth.js
- ⭐ **Reviews & Ratings** - View detailed reviews and ratings for each property
- 🛏️ **Room Selection** - Browse available rooms with detailed specifications
- 📱 **Responsive Design** - Fully responsive design that works on all devices
- 🎨 **Modern UI** - Beautiful, modern interface with smooth animations
- 🎠 **Interactive Carousels** - Swiper.js powered carousels for rooms and featured hotels

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Image Optimization**: Next.js Image Component
- **Carousel**: Swiper.js
- **Icons**: Emoji-based icons (can be replaced with icon library)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd tripster
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
```

**Generate a secret key:**
```bash
openssl rand -base64 32
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
tripster/
├── components/              # React components
│   ├── layout/             # Header, Footer
│   ├── search/              # SearchForm, PropertyCard, FilterSidebar
│   ├── property/            # ImageGallery, RoomsCarousel, ReviewsSection, etc.
│   ├── booking/             # BookingForm, BookingSummary
│   └── profile/             # Profile components
├── lib/                     # Utilities and types
│   ├── types.ts            # TypeScript interfaces
│   ├── mockData.ts         # Mock data for hotels, rooms, reviews
│   └── utils.ts            # Helper functions
├── pages/                   # Next.js pages
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth.js configuration
│   │   ├── properties.ts   # Properties API
│   │   ├── search.ts       # Search API
│   │   └── bookings/       # Bookings API
│   ├── index.tsx           # Homepage
│   ├── search.tsx          # Search results page
│   ├── property/[id].tsx   # Property detail page
│   ├── booking/[id].tsx    # Booking process page
│   ├── booking/confirmation/[id].tsx  # Booking confirmation
│   └── profile.tsx         # User profile
├── styles/                  # Global styles
│   └── globals.css         # Tailwind imports and custom styles
├── types/                   # TypeScript type definitions
│   └── next-auth.d.ts     # NextAuth type extensions
└── public/                  # Static assets
```

## Key Features Explained

### Search & Filtering

- Search by location (city or country)
- Filter by price range, rating, star rating, and amenities
- Sort by price, rating, or distance
- Pagination support (6 items per page)

### Property Details

- Image gallery with main image and thumbnails
- Room carousel with detailed room information
- Reviews section with rating breakdown
- Amenities list
- House rules and policies

### Booking Process

- Multi-step booking form:
  1. Property amenities and bed selection
  2. Personal information
  3. Payment details
- Booking summary sidebar
- Real-time price calculation

### Authentication

The app uses NextAuth.js with a credentials provider. For demo purposes, any email/password combination will work. In production, you should:

- Connect to a real authentication provider
- Implement proper password hashing
- Add OAuth providers (Google, GitHub, etc.)

## API Documentation

For detailed API documentation, see [API.md](./API.md).

### Quick API Reference

- `GET /api/properties` - Get all properties or a specific property
- `GET /api/search` - Search and filter properties
- `POST /api/bookings` - Create a new booking (requires auth)
- `GET /api/bookings` - Get user's bookings (requires auth)
- `GET /api/bookings/[id]` - Get specific booking (requires auth)

## Mock Data

The application uses mock data stored in `lib/mockData.ts`. This includes:

- 10+ sample properties
- Multiple rooms per property
- Reviews and ratings
- Popular destinations

**Note:** In production, replace this with a real database (PostgreSQL, MongoDB, etc.).

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Building for Production

1. **Build the application**:
```bash
npm run build
```

2. **Start the production server**:
```bash
npm start
```

3. **Deploy** to your preferred hosting platform:
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS
   - Any Node.js hosting service

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6', // Change primary color
      // ... other colors
    }
  }
}
```

### Adding New Properties

Add properties to `lib/mockData.ts` in the `mockProperties` array.

### Styling

- Global styles: `styles/globals.css`
- Component styles: Use Tailwind classes in components
- Custom CSS: Add to `globals.css` or create component-specific CSS files

## Known Limitations

- Bookings are stored in-memory and will be lost on server restart
- Authentication accepts any credentials (demo mode)
- No real payment processing
- Images are from Unsplash (replace with your own in production)

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real payment processing (Stripe, PayPal)
- [ ] Email notifications
- [ ] Booking cancellation
- [ ] User favorites/wishlist
- [ ] Advanced search filters
- [ ] Map integration
- [ ] Multi-language support
- [ ] Admin dashboard

## Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## License

This project is for demonstration purposes.

## Support

For API documentation, see [API.md](./API.md).

For issues or questions:
1. Check the documentation
2. Review the code comments
3. Open an issue in the repository (if applicable)

