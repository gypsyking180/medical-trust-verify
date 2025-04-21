
import React from 'react';
import { Heart, User, Hospital, Award } from 'lucide-react';

const Statistics = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-secondary uppercase tracking-wide">Transparent Impact</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Making a difference together
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Through blockchain transparency and community verification, we're changing how medical funding works.
          </p>
        </div>
        
        <div className="mt-20">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-primary px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <Heart className="mr-2 text-primary" size={20} />
                Campaigns Funded
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">217</dd>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-secondary px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <User className="mr-2 text-secondary" size={20} />
                Medical Professionals
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">86</dd>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-blue-500 px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <Hospital className="mr-2 text-blue-500" size={20} />
                Hospitals Connected
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">32</dd>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-yellow-500 px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <Award className="mr-2 text-yellow-500" size={20} />
                Success Rate
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">96.7%</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
