import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const guideId = localStorage.getItem('guideId'); 
    const touristId = localStorage.getItem('touristId'); 

    if (!guideId || !touristId) {
      console.error('Guide ID or Tourist ID is missing from localStorage');
      return;
    }

    const reviewData = {
      guide: guideId,
      tourist: touristId,
      rating,
      comment: reviewContent,
    };

    axios.post('http://localhost:3000/api/v1/review/createReview', reviewData)
      .then(response => {
        console.log('Review submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-gray-700 text-1xl font-bold text-center">Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="reviewContent">
            Review Content
          </label>
          <textarea
            id="reviewContent"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="5"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Write your review here..."
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-1">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={`text-2xl ${index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
        </div>
        <input type="hidden" name="guideId" value={localStorage.getItem('guideId')} />
        <input type="hidden" name="touristId" value={localStorage.getItem('touristId')} />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
