import { HelpCircle, MessageSquare, Mail } from 'lucide-react';

export function Support() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <HelpCircle className="w-8 h-8 text-blue-600 mb-4" />
          <h2 className="text-lg font-semibold mb-2">FAQ</h2>
          <p className="text-gray-600 mb-4">Find answers to commonly asked questions</p>
          <button className="text-blue-600 hover:text-blue-700">Browse FAQ →</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <MessageSquare className="w-8 h-8 text-blue-600 mb-4" />
          <h2 className="text-lg font-semibold mb-2">Live Chat</h2>
          <p className="text-gray-600 mb-4">Chat with our support team</p>
          <button className="text-blue-600 hover:text-blue-700">Start Chat →</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Mail className="w-8 h-8 text-blue-600 mb-4" />
          <h2 className="text-lg font-semibold mb-2">Email Support</h2>
          <p className="text-gray-600 mb-4">Send us an email</p>
          <button className="text-blue-600 hover:text-blue-700">Contact Us →</button>
        </div>
      </div>
    </div>
  );
}