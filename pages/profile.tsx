import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ProfileSettings from '@/components/profile/ProfileSettings';
import { mockUser } from '@/lib/mockData';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);

  if (status === 'loading') {
    return <div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  if (!session) {
    router.push('/api/auth/signin');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProfileSettings user={userData} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'personal' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal details</h2>
              <p className="text-gray-600 mb-6">Edit your personal details</p>

              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">👤</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="text-gray-600 text-sm">Full name</span>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="text-gray-600 text-sm">Location</span>
                    <p className="font-medium">{userData.location}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="text-gray-600 text-sm">Email</span>
                    <p className="font-medium">
                      <a href={`mailto:${userData.email}`} className="text-primary hover:underline">
                        {userData.email}
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="text-gray-600 text-sm">Nationality</span>
                    <p className="font-medium">{userData.nationality}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <span className="text-gray-600 text-sm">Date of birth</span>
                    <p className="font-medium">{userData.dateOfBirth}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">$</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Pssst!</h3>
                  <p className="text-gray-700 mb-4">
                    Do you want to get secret offers and best prices for amazing stays? Sign up to join our Travel Club!
                  </p>
                  <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium">
                    Sign up now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

