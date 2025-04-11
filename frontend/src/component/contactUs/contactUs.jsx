import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPhone, faEnvelope, faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons'

export const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Container */}
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6 md:p-12">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-600 mt-2">We'd love to hear from you! Reach out to us anytime.</p>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your message"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 text-xl" />
              <p className="text-gray-700">123 Street, City, Country</p>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-xl" />
              <p className="text-gray-700">contact@yourwebsite.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPhone} className="text-blue-600 text-xl" />
              <p className="text-gray-700">+123 456 7890</p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-600 text-2xl hover:text-blue-700">
                {/* <FontAwesomeIcon icon={faFacebook} /> */}
              </a>
              <a href="#" className="text-blue-600 text-2xl hover:text-blue-700">
                {/* <FontAwesomeIcon icon={faTwitter} /> */}
              </a>
              <a href="#" className="text-blue-600 text-2xl hover:text-blue-700">
                {/* <FontAwesomeIcon icon={faLinkedin} /> */}
              </a>
            </div>
            
            {/* Google Map (Optional) */}
            <div className="mt-6">
              <iframe
                title="Google Maps"
                className="w-full h-48 rounded-md shadow"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094257!2d144.95373531531686!3d-37.816279742021614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1633689365613!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
