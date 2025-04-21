import React from 'react';
import { Check, Shield, Zap, Heart, Lock, Users } from 'lucide-react';

const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-secondary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose careBridge?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform combines blockchain security with medical expertise to ensure transparent and effective medical crowdfunding.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                      <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Medical Verification</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Each campaign is verified by licensed healthcare professionals to ensure the legitimacy of medical needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-secondary rounded-md shadow-lg">
                      <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Blockchain Security</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Smart contracts ensure funds go directly to verified recipients, with complete transparency of all transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <Heart className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Community Governance</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our platform is governed by the community of healthcare professionals and verified members to maintain integrity.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-yellow-500 rounded-md shadow-lg">
                      <Lock className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Private & Secure</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Patient privacy is protected through selective disclosure controls while maintaining verification transparency.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <Check className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Donation Tracking</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Track your donations in real-time and see the impact of your contribution on patient treatment progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-pink-500 rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Emergency Support</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Critical cases receive expedited verification and funding support through our emergency protocol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
