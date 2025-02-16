// controllers/guideController.js
import { recommendUsers } from '../models/recommendationModel.js'; // Adjust the path based on your project structure

const getRecommendedUsers = async (req, res) => {
  console.log('Getting recommended users');
  try {
    const { location } = req.query; // Assuming location is provided as a query parameter

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const recommendedProfiles = await recommendUsers(location);
    res.json(recommendedProfiles);
  } catch (error) {
    console.error('Error getting recommended profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getRecommendedUsers };
