import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ image, category, title, rating, price, highlighted = false }) => {
  return (
    <div
      className={`${
        highlighted
          ? 'bg-gradient-to-br from-green-50/60 to-green-100/40 border-green-200/50'
          : 'bg-white/40 border-gray-200/30'
      } backdrop-blur-sm rounded-2xl p-4 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      <div className="flex items-start space-x-3 mb-4">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div className="flex-1">
          <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wide mb-0.5">
            {category}
          </p>
          <h3 className="text-gray-900 text-sm font-semibold leading-tight">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-0.5">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? 'fill-orange-400 text-orange-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-900 text-lg font-bold">
          ${price}
        </p>
      </div>
    </div>
  );
};

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      category: 'PLUMBING',
      title: 'Fix kitchen sink',
      rating: 5,
      price: 75
    },
    {
      id: 2,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      category: 'COOKING',
      title: 'Meal prep service',
      rating: 5,
      price: 40,
      highlighted: true
    },
    {
      id: 3,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      category: 'PLUMBING',
      title: 'Bathroom repair',
      rating: 4,
      price: 90
    },
    {
      id: 4,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      category: 'COOKING',
      title: 'Private chef',
      rating: 5,
      price: 120
    },
    {
      id: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      category: 'ELECTRICIAN',
      title: 'Wiring installation',
      rating: 4,
      price: 85
    },
    {
      id: 6,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      category: 'CLEANING',
      title: 'Deep clean',
      rating: 5,
      price: 95
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 scroll-mt-28" id="reviews">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center mb-12 leading-tight">
          See what others are
          <br />
          getting done
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              image={review.image}
              category={review.category}
              title={review.title}
              rating={review.rating}
              price={review.price}
              highlighted={review.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
