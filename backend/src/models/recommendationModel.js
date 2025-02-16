import * as tf from '@tensorflow/tfjs';

import Profile from '../models/profileModel.js'; // Adjust path based on your project structure

async function trainModel(profiles) {
  // Using locationValue as the only input feature
  const data = profiles.map(profile => [profile.locationValue]);
  const labels = profiles.map(profile => profile.locationValue); // Using locationValue as label for simplicity

  const xs = tf.tensor2d(data);
  const ys = tf.tensor1d(labels);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  console.log('Training model with data:', data, 'and labels:', labels);
  await model.fit(xs, ys, { epochs: 10 });

  return model;
}

async function recommendUsers(location) {
  try {
    console.log('Fetching profiles for location:', location);
    const profiles = await Profile.find({ location });

    if (profiles.length === 0) {
      throw new Error(`No profiles found in location: ${location}`);
    }

    // Convert location to a numerical value
    const locationValue = convertLocationToValue(location);
    profiles.forEach(profile => {
      profile.locationValue = locationValue;
    });

    console.log('Found profiles:', profiles);
    const model = await trainModel(profiles);

    // Predict scores for each profile based on their location
    const recommendations = profiles.map(profile => {
      const input = tf.tensor2d([[profile.locationValue]]);
      const score = model.predict(input).dataSync()[0];
      console.log('Predicted score for profile', profile._id, ':', score);
      return { profile, score };
    });

    // Sort recommendations by score in descending order
    recommendations.sort((a, b) => b.score - a.score);

    console.log('Sorted recommendations:', recommendations);
    return recommendations.map(rec => rec.profile);
  } catch (error) {
    console.error('Error recommending profiles:', error);
    throw error; // Handle or propagate the error as needed
  }
}

function convertLocationToValue(location) {
  // Convert location to a numerical value using a simple hash function
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = location.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export  {recommendUsers} ;
