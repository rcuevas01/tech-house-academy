// ProfileEditor.tsx
import React, { useState } from 'react';
import VenueSection from './VenueSection'; // Import the VenueSection component

interface ProfileData {
  name: string;
  venues: Venue[];
  // Add more fields as needed
}

interface Venue {
  id: number;
  photo: string; // URL for the photo
  title: string;
  description?: string; // Optional description
}

function ProfileEditor() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Your Name',
    venues: [],
    // Add more fields as needed
  });
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const [venueInput, setVenueInput] = useState<Venue>({
    id: 0,
    photo: '',
    title: '',
    description: '',
  });
  const [showVenueSection, setShowVenueSection] = useState<boolean>(false); // Track whether to show venue section

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBackgroundChange = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setBackgroundColor(randomColor);
  };

  const handleVenueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData((prevData) => ({
      ...prevData,
      venues: [...prevData.venues, { ...venueInput, id: prevData.venues.length + 1 }],
    }));
    setVenueInput({
      id: 0,
      photo: '',
      title: '',
      description: '',
    });
  };

  const handleVenueInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVenueInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div style={{ backgroundColor }} className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-80 p-6 rounded-lg bg-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 cursor-pointer" contentEditable onBlur={(e) => setProfileData((prevData) => ({ ...prevData, name: e.target.textContent || '' }))}>
          {profileData.name}
        </h2>
        <form onSubmit={handleVenueSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
            <input
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Venue Title:</label>
            <input
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
              type="text"
              name="title"
              value={venueInput.title}
              onChange={handleVenueInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description:</label>
            <textarea
              className="w-full h-20 resize-none bg-gray-100 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
              name="description"
              value={venueInput.description}
              onChange={handleVenueInputChange}
            />
          </div>
          {/* Add photo input field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Photo:</label>
            <input
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
              type="text"
              name="photo"
              value={venueInput.photo}
              onChange={handleVenueInputChange}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300" type="submit" onClick={handleBackgroundChange}>Add Venue</button>
        </form>
        {/* Add button to navigate to venue section */}
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300" onClick={() => setShowVenueSection(true)}>View Venues</button>
      </div>
      {/* Render venue section if showVenueSection is true */}
      {showVenueSection && <VenueSection venues={profileData.venues} />}
    </div>
  );
}

export default ProfileEditor;