# Tripster API Documentation

This document describes all available API endpoints in the Tripster application.

## Base URL

All API endpoints are prefixed with `/api`:
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication via NextAuth.js. Include the session cookie in your requests, or use the `Authorization` header where applicable.

---

## Properties API

### Get All Properties

Retrieve a list of all properties or a specific property by ID.

**Endpoint:** `GET /api/properties`

**Query Parameters:**
- `id` (optional, string): Property ID to retrieve a single property

**Response:**

**Success (200 OK) - All Properties:**
```json
[
  {
    "id": "1",
    "name": "Hotel Norrebro",
    "description": "A cozy hotel in the heart of Copenhagen",
    "location": "Norrebro, Copenhagen",
    "city": "Copenhagen",
    "country": "Denmark",
    "pricePerNight": 180,
    "rating": 9.6,
    "reviewCount": 1240,
    "starRating": 4,
    "image": "https://images.unsplash.com/photo-...",
    "images": ["https://..."],
    "amenities": ["Free WiFi", "Breakfast included", "Free cancellation"],
    "tags": ["Budget", "Good"],
    "distanceFromCenter": "0.4 km",
    "checkInTime": "14:00",
    "checkOutTime": "11:00",
    "houseRules": ["No smoking", "No pets"],
    "rooms": [...],
    "reviews": [...]
  }
]
```

**Success (200 OK) - Single Property:**
```json
{
  "id": "1",
  "name": "Hotel Norrebro",
  ...
}
```

**Error (404 Not Found):**
```json
{}
```

**Example Request:**
```bash
# Get all properties
curl http://localhost:3000/api/properties

# Get specific property
curl http://localhost:3000/api/properties?id=1
```

---

## Search API

Search and filter properties based on various criteria.

**Endpoint:** `GET /api/search`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `location` | string | Filter by city or country | `Copenhagen` |
| `priceRange` | object/string | Min/max price range | `{"min": 100, "max": 200}` or JSON string |
| `rating` | number/string | Minimum rating | `8.0` |
| `propertyClass` | number/string | Star rating | `4` |
| `amenities` | string/array | Required amenities | `["Free WiFi", "Breakfast included"]` |
| `sortBy` | string | Sort order: `price` or `rating` | `price` |
| `page` | number/string | Page number (default: 1) | `1` |
| `limit` | number/string | Items per page (default: 10) | `10` |

**Response:**

**Success (200 OK):**
```json
{
  "properties": [
    {
      "id": "1",
      "name": "Hotel Norrebro",
      ...
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

**Example Request:**
```bash
# Search by location
curl "http://localhost:3000/api/search?location=Copenhagen"

# Search with filters
curl "http://localhost:3000/api/search?location=Copenhagen&rating=8.0&sortBy=price&page=1&limit=10"

# Search with price range
curl "http://localhost:3000/api/search?priceRange=%7B%22min%22%3A100%2C%22max%22%3A200%7D"
```

---

## Bookings API

### Create a Booking

Create a new booking for a property and room.

**Endpoint:** `POST /api/bookings`

**Authentication:** Required

**Request Body:**
```json
{
  "propertyId": "1",
  "roomId": "r1",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-18",
  "guests": 2,
  "email": "user@example.com" // Optional, uses session email if not provided
}
```

**Response:**

**Success (201 Created):**
```json
{
  "id": "booking-1704067200000",
  "propertyId": "1",
  "propertyName": "Hotel Norrebro",
  "roomId": "r1",
  "roomName": "Double standard room",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-18",
  "guests": 2,
  "totalPrice": 620,
  "status": "confirmed",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "userEmail": "user@example.com"
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Property not found"
}
```
or
```json
{
  "error": "Room not found"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "propertyId": "1",
    "roomId": "r1",
    "checkIn": "2024-01-15",
    "checkOut": "2024-01-18",
    "guests": 2
  }'
```

---

### Get User Bookings

Retrieve all bookings for the authenticated user.

**Endpoint:** `GET /api/bookings`

**Authentication:** Required

**Response:**

**Success (200 OK):**
```json
[
  {
    "id": "booking-1704067200000",
    "propertyId": "1",
    "propertyName": "Hotel Norrebro",
    "roomId": "r1",
    "roomName": "Double standard room",
    "checkIn": "2024-01-15",
    "checkOut": "2024-01-18",
    "guests": 2,
    "totalPrice": 620,
    "status": "confirmed",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "userEmail": "user@example.com"
  }
]
```

**Example Request:**
```bash
curl http://localhost:3000/api/bookings \
  -H "Cookie: next-auth.session-token=..."
```

---

### Get Booking by ID

Retrieve a specific booking by its ID.

**Endpoint:** `GET /api/bookings/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string): Booking ID

**Response:**

**Success (200 OK):**
```json
{
  "id": "booking-1704067200000",
  "propertyId": "1",
  "propertyName": "Hotel Norrebro",
  "roomId": "r1",
  "roomName": "Double standard room",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-18",
  "guests": 2,
  "totalPrice": 620,
  "status": "confirmed",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "userEmail": "user@example.com"
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

**Error (403 Forbidden):**
```json
{
  "error": "Forbidden"
}
```
*Returned when the booking does not belong to the authenticated user*

**Error (404 Not Found):**
```json
{
  "error": "Booking not found"
}
```

**Example Request:**
```bash
curl http://localhost:3000/api/bookings/booking-1704067200000 \
  -H "Cookie: next-auth.session-token=..."
```

---

## Authentication API

### NextAuth.js Endpoints

The application uses NextAuth.js for authentication. The following endpoints are available:

- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/signin` - Sign in handler
- `GET /api/auth/signout` - Sign out handler
- `GET /api/auth/callback/[provider]` - OAuth callback
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - Get CSRF token

**Note:** For demo purposes, the credentials provider accepts any email/password combination.

---

## Data Models

### Property

```typescript
interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  starRating: number;
  image: string;
  images: string[];
  amenities: string[];
  tags: string[];
  distanceFromCenter: string;
  checkInTime: string;
  checkOutTime: string;
  houseRules: string[];
  rooms: Room[];
  reviews: Review[];
}
```

### Room

```typescript
interface Room {
  id: string;
  name: string;
  size: string;
  capacity: number;
  bedType: string;
  price: number;
  image: string;
  breakfastIncluded: boolean;
  refundable: boolean;
}
```

### Booking

```typescript
interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  roomId: string;
  roomName: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string; // ISO date string
  userEmail: string;
}
```

### Review

```typescript
interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  pros: string[];
  cons: string[];
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `405 Method Not Allowed` - HTTP method not supported

---

## Rate Limiting

Currently, there are no rate limits implemented. In production, consider implementing rate limiting to prevent abuse.

---

## Notes

- All bookings are stored in-memory and will be lost on server restart. In production, use a persistent database.
- The application uses mock data from `lib/mockData.ts`. Replace with a real database in production.
- Date formats should be ISO 8601 strings (YYYY-MM-DD) for consistency.
- Price calculations include room price, taxes, and fees automatically.

---

## Support

For issues or questions, please refer to the main README.md file or open an issue in the project repository.

