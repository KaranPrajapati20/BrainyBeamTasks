import React, { useState } from 'react';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [errors, setErrors] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
      setErrors('');
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    if (currentStep === 1 && !formData.name) {
      setErrors('Name is required.');
      return false;
    }
    if (currentStep === 2 && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))) {
      setErrors('A valid email is required.');
      return false;
    }
    if (currentStep === 3 && (!formData.age || isNaN(formData.age) || formData.age <= 0)) {
      setErrors('A valid age is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setCurrentStep(1);
      setFormData({
        name: '',
        email: '',
        age: '',
      });
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
          Multi-Step Form
        </h1>
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Step 1: Name</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Step 2: Email</h2>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Step 3: Age</h2>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        )}
        {errors && <p className="text-red-500 mt-4">{errors}</p>}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-sm w-full">
            <h2 className="text-xl font-bold text-green-500">Submission Successful!</h2>
            <p className="mt-4 text-gray-700">Your form has been submitted successfully.</p>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
