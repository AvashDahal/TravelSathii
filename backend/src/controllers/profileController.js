import Profile from '../models/profileModel.js';

// Create a new profile
const createProfile = async (req, res) => {
  try {
    const { userId, name, location, quote, aboutMe, experience, languages, activities } = req.body;

    

    if (!userId || !name || !location || !quote || !aboutMe || !experience || !languages || !activities) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const profilePicture = req.files?.profilePicture ? req.files.profilePicture[0].path.replace(/\\/g, "/").replace(/^public\//, "") : "";
    const coverImage = req.files?.coverImage ? req.files.coverImage[0].path.replace(/\\/g, "/").replace(/^public\//, "") : "";

    const profile = new Profile({
      userId, // Ensure userId is correctly passed
      name,
      location,
      profilePicture,
      coverImage,
      quote,
      aboutMe,
      experience,
      languages,
      activities,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(400).json({ error: error.message });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfileByGuideId = async (req, res) => {
  const guideId = req.params.guideId;

  try {
    const profile = await Profile.findOne({ userId: guideId });
   
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createProfile,
  getAllProfiles,
  getProfileByGuideId,
};
