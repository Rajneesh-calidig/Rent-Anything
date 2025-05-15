import React from "react";
import Astitva from "../../assets/company-owner/astitva.png";
import Yash from "../../assets/company-owner/yash.jpg";
import Rajneesh from "../../assets/company-owner/raj.jpg";

export const About = () => {
  return (
    <div className="pt-22 min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Container */}
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6 md:p-12">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          About Us
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Learn more about our mission, vision, and what makes us unique.
        </p>

        {/* Section: Mission & Vision */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 mt-2">
              Our mission is to make renting easy, accessible, and affordable
              for everyone. Whether it's tools, vehicles, electronics, or travel
              gear, we connect people to the things they need without the burden
              of ownership.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
            <p className="text-gray-600 mt-2">
              We envision a future where sharing resources is the norm, reducing
              waste and creating a sustainable, connected community through
              rental solutions.
            </p>
          </div>
        </div>

        {/* Section: Why Choose Us */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center text-gray-800">
            Why Choose Us?
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-md rounded">
              <h4 className="text-lg font-semibold">Convenience</h4>
              <p className="text-gray-600 mt-2">
                Rent anything, anytime, anywhere with ease.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded">
              <h4 className="text-lg font-semibold">Affordable</h4>
              <p className="text-gray-600 mt-2">
                Save money by renting instead of buying.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded">
              <h4 className="text-lg font-semibold">Secure Transactions</h4>
              <p className="text-gray-600 mt-2">
                Trust and security are our top priorities.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Our Team */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center text-gray-800">
            Meet Our Team
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {[
              { name: "Astitva Singh Tomar", role: "Quality Analyst", img: Astitva },
              { name: "Yash Kumar", role: "Developer", img: Yash },
              {
                name: "Rajneesh Dadheech",
                role: "Developer",
                img: Rajneesh,
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto object-cover">
                  <img src={member.img} className="w-32 h-32 bg-gray-300 rounded-full mx-auto"/>
                </div>
                <h4 className="mt-3 font-semibold text-gray-800">
                  {member.name}
                </h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Join Us Today</h3>
          <p className="text-gray-600 mt-2">
            Start renting and sharing today. Experience the convenience of renting.
          </p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Get Started
          </button>
        </div> */}
      </div>
    </div>
  );
};
