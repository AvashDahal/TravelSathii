import React, { useState } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    quote: '',
    location: '',
    languages: '',
    activities: '',
    experience: '',
    aboutMe: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profilePicture') {
      setProfilePicture(files[0]);
    } else if (name === 'coverImage') {
      setCoverImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }
    if (coverImage) {
      data.append('coverImage', coverImage);
    }

    const accessToken = localStorage.getItem('accessToken'); // Assuming accessToken is stored in localStorage
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    // Append the userId to the form data
    data.append('userId', userId);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/profile/create',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setServerResponse(response.data);
      setFormData({
        name: '',
        quote: '',
        location: '',
        languages: '',
        activities: '',
        experience: '',
        aboutMe: '',
      });
      setProfilePicture(null);
      setCoverImage(null);
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Set specific error message from server
      } else {
        setError('Something went wrong. Please try again.'); // General error message
      }
      console.error('Error:', error);
    }
  };

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="w-[100%] lg:w-[90%] md:w-[70%] xs:w-[86%] mx-auto flex gap-4">
        <div className="w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div>
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Profile
            </h1>
            <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Cover Image */}
              <div className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                {/* Profile Image */}
                <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <input
                      type="file"
                      name="profilePicture"
                      id="upload_profile"
                      onChange={handleFileChange}
                      hidden=""
                    />
                    <label htmlFor="upload_profile">
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <input
                    type="file"
                    name="coverImage"
                    id="upload_cover"
                    onChange={handleFileChange}
                    hidden=""
                  />
                  <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                    <label htmlFor="upload_cover" className="inline-flex items-center gap-1 cursor-pointer">
                      Cover Image
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <div className="my-4">
                {/* Form fields */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="font-semibold dark:text-white">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-md py-2 px-3 text-gray-800 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="quote" className="font-semibold dark:text-white">Quote</label>
                  <input
                    type="text"
                    id="quote"
                    name="quote"
                    value={formData.quote}
                    onChange={handleChange}
                    className="border rounded-md py-2 px-3 text-gray-800 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="location" className="font-semibold dark:text-white">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border rounded-md py-2 px-3 text-gray-800 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="languages" className="font-semibold dark:text-white">Languages</label>
                  <input
                    type="text"
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="border rounded-md py-2 px-3 text-gray-800 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="activities" className="font-semibold dark:text-white">Activities</label>
                  <input
                    type="text"
                    id="activities"
                    name="activities"
                    value={formData.activities}
                    onChange={handleChange}
                    className="border rounded-md py-2 px-3 text-gray-800 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="experience" className="font-semibold dark:text-white">Experience</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="border rounded-md py-2 px-3 text-gray-800 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="aboutMe" className="font-semibold dark:text-white">About Me</label>
                  <textarea
                    id="aboutMe"
                    name="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleChange}
                    className="border rounded-md py-2 px-3 text-gray-800 dark:bg-gray-800 dark:text-white h-24"
                    required
                  ></textarea>
                </div>
                {/* Add similar JSX for other form fields */}
              </div>
              {/* Submit button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#0f2f5e] text-white p-2 w-2/4 text-xl rounded-lg"
                >
                  Create Profile
                </button>
              </div>
              {/* Error message display */}
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              {/* Success message display */}
              {serverResponse && (
                <div className={`text-green-500 text-sm mt-2`}>{serverResponse.message}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUpdate;
