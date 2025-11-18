import React from 'react';
import { Plus, Clock, Star } from 'lucide-react';

export function QuickActions() {
  return (
      <div className="w-12 float-right">
          <div className="fixed right-6 bottom-6 flex flex-col gap-3 max-w-[40px] items-center">
              <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
                  <Plus className="w-6 h-6"/>
              </button>
              <button className="bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50">
                  <Clock className="w-6 h-6"/>
              </button>
              <button className="bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50">
                  <Star className="w-6 h-6"/>
              </button>
          </div>
      </div>
  );
}