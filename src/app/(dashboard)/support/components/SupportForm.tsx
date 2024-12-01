// import React from 'react'

// const SupportForm = () => {
//   return (
//     <div>
//       <form className="max-w-[660px]" onSubmit={handleSubmit}>
//         <div className="space-y-4">
//           <h3 className="text-2xl font-bold mt-2">Get in touch</h3>

          

//           {/* First and Last Name Fields */}
//           <div className="flex flex-col md:flex-row gap-3 w-full">
//             <div className="w-full">
//               <label htmlFor="firstname" className="text-[#7c7c7c]">
//                 First name
//               </label>
//               <input
//                 type="text"
//                 name="firstname"
//                 value={formData.firstname} // Bind value to state
//                 onChange={handleChange} // Handle change
//                 placeholder="First name"
//                 id="firstname"
//                 className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
//               />
//             </div>
//             <div className="w-full">
//               <label htmlFor="lastname" className="text-[#7c7c7c]">
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 name="lastname"
//                 value={formData.lastname} // Bind value to state
//                 onChange={handleChange} // Handle change
//                 placeholder="Last name"
//                 id="lastname"
//                 className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row gap-3 w-full">
//             <div className="w-full">
//               <label htmlFor="email" className="text-[#7c7c7c]">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={} // Bind value to state
//                 onChange={handleChange} // Handle change
//                 placeholder="First name"
//                 id="email"
//                 className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
//               />
//             </div>
//             <div className="w-full">
//               <label htmlFor="phone" className="text-[#7c7c7c]">
//                 Phone
//               </label>
//               <input
//                 type="number"
//                 name="phone"
//                 value={  }
//                 onChange={handleChange} // Handle change
//                 placeholder="Last name"
//                 id="phone"
//                 className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="text-[#7c7c7c]">
//               Your message
//             </label>
//             <textarea
              
//               name="message"
//               value={} // Bind value to state
//               onChange={handleChange} // Handle change
//               placeholder="Enter your message here"
//               id="email"
//               className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default SupportForm
'use client';
import React, { useState } from 'react';

const SupportForm = () => {
  // State for the form fields
  const [formData, setFormData] = useState({
    firstname: 'Olivia',
    lastname: 'Rhye',
    email: 'oliviarhye@com',
    phone: '+61-162-346267',
    message: 'Enter you message here',
  });

  // Handle form field changes
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData); // Log form data when submitted
  };

  return (
    <div>
      <form className="max-w-[660px]" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mt-2">Get in touch</h3>

          {/* First and Last Name Fields */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="firstname" className="text-[#7c7c7c]">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname} // Bind value to state
                onChange={handleChange} // Handle change
                placeholder="First name"
                id="firstname"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="text-[#7c7c7c]">
                Last name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname} // Bind value to state
                onChange={handleChange} // Handle change
                placeholder="Last name"
                id="lastname"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
          </div>

          {/* Email and Phone Fields */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full">
              <label htmlFor="email" className="text-[#7c7c7c]">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email} // Bind value to state
                onChange={handleChange} // Handle change
                placeholder="Email address"
                id="email"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="text-[#7c7c7c]">
                Phone
              </label>
              <input
                type="text" // Changed to text to handle formatted numbers (e.g., with dashes)
                name="phone"
                value={formData.phone} // Bind value to state
                onChange={handleChange} // Handle change
                placeholder="Phone number"
                id="phone"
                className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="text-[#7c7c7c]">
              Your message
            </label>
            <textarea
              name="message"
              value={formData.message} // Bind value to state
              onChange={handleChange} // Handle change
              placeholder="Enter your message here"
              id="message"
              className="peer p-5 text-xl mt-1 block w-full bg-transparent opacity-90 border-[#7c7c7c] rounded-lg placeholder-[#7c7c7c] focus:outline-none border"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[220px] bg-custom-gradient hover:bg-custom-gradient-hover text-xl text-black font-bold rounded-full p-3 mt-8"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportForm;
