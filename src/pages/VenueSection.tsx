// VenueSection.tsx
import React, { useEffect, useState } from 'react';

interface Venue {
  id: number;
  title: string;
  description?: string;
}

interface Props {
  venues: Venue[];
}

const VenueSection: React.FC<Props> = ({ venues }) => {
  const [venueImages, setVenueImages] = useState<{ [title: string]: string[] }>({});
  const [selectedImage, setSelectedImage] = useState<{ [title: string]: string }>({});

  useEffect(() => {
    const fetchVenueImages = async () => {
      const apiKey = 'AIzaSyBglsrYWBrFp8XOShHwvcD6QIUv8MCbWCE';
      const cx = '5791244d649a24300';

      const images: { [title: string]: string[] } = {};
      for (const venue of venues) {
        try {
          const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(venue.title + ' venue')}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const suggestedImages = data.items.map((item: any) => item.pagemap.cse_image[0].src);
          images[venue.title] = suggestedImages;
          setSelectedImage(prev => ({ ...prev, [venue.title]: suggestedImages[0] }));
        } catch (error) {
          console.error(`Error fetching images for ${venue.title}:`, error);
          // Use a default image if fetching fails
          images[venue.title] = [`https://via.placeholder.com/150?text=${encodeURIComponent(venue.title)}`];
          setSelectedImage(prev => ({ ...prev, [venue.title]: images[venue.title][0] }));
        }
      }
      setVenueImages(images);
    };

    fetchVenueImages();
  }, [venues]);

  const handleImageClick = (title: string, imageUrl: string) => {
    setSelectedImage(prev => ({ ...prev, [title]: imageUrl }));
  };

  return (
    <div>
      {venues.map((venue) => (
        <div key={venue.id} className="mt-4">
          <h3 className="text-lg font-semibold">{venue.title}</h3>
          <div className="flex flex-wrap gap-4">
            {venueImages[venue.title]?.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={venue.title}
                className={`w-24 h-24 rounded-full mx-auto mb-2 cursor-pointer ${selectedImage[venue.title] === imageUrl ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleImageClick(venue.title, imageUrl)}
              />
            ))}
          </div>
          {venue.description && <p className="text-sm">{venue.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default VenueSection;