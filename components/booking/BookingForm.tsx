import { useState } from 'react';
import { Property, Room } from '@/lib/types';
import AmenitiesList from '../property/AmenitiesList';

interface BookingFormProps {
  property: Property;
  selectedRoom: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  onBookingComplete: (bookingData: any) => void;
}

export default function BookingForm({
  property,
  selectedRoom,
  checkIn,
  checkOut,
  guests,
  onBookingComplete,
}: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bedOption: '2 separate beds',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    breakfastIncluded: selectedRoom.breakfastIncluded,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const bookingData = {
      propertyId: property.id,
      roomId: selectedRoom.id,
      checkIn,
      checkOut,
      guests,
      ...formData,
    };

    onBookingComplete(bookingData);
  };

  const steps = [
    { number: 1, title: 'Property amenities' },
    { number: 2, title: 'Personal data' },
    { number: 3, title: 'Payment details' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Book {property.name}</h2>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                    step >= stepItem.number
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > stepItem.number ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepItem.number
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step >= stepItem.number ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  {stepItem.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition ${
                    step > stepItem.number ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Property amenities</h3>
            <AmenitiesList amenities={property.amenities} />
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.breakfastIncluded}
                  onChange={(e) => setFormData({ ...formData, breakfastIncluded: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span>Breakfast included</span>
              </label>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose bed option</label>
              <select
                value={formData.bedOption}
                onChange={(e) => setFormData({ ...formData, bedOption: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="2 separate beds">2 separate beds</option>
                <option value="1 king size bed">1 king size bed</option>
                <option value="1 queen size bed">1 queen size bed</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal data</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First and Last name</label>
                <input
                  type="text"
                  value={`${formData.firstName} ${formData.lastName}`}
                  onChange={(e) => {
                    const names = e.target.value.split(' ');
                    setFormData({
                      ...formData,
                      firstName: names[0] || '',
                      lastName: names.slice(1).join(' ') || '',
                    });
                  }}
                  placeholder="e.g. Maria Lost"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@email.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+123 001 234 567"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                  placeholder="e.g. Maria Lost"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  placeholder="**** **** **** ****"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid until</label>
                  <input
                    type="text"
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                    placeholder="MM/YY"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    value={formData.cardCVC}
                    onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value })}
                    placeholder="***"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">House rules</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span>🕐</span>
                <span>Check-in time: From {property.checkInTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🕐</span>
                <span>Check-out time: Until {property.checkOutTime}</span>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-2">Beware:</p>
                <div className="space-y-2">
                  {property.houseRules.map((rule, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span>🚫</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition font-medium"
        >
          {step < 3 ? 'Next' : 'Book now'}
        </button>
      </div>
    </form>
  );
}

