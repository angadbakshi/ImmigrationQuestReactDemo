import React, { useState } from 'react';
import { Send } from 'lucide-react';
import {Card} from "../../../components";

interface NotificationFormProps {
  onSubmit: (message: string) => void;
}

export function NotificationForm({ onSubmit }: NotificationFormProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="Enter your message here..."
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Send className="w-4 h-4" />
          Send Notification
        </button>
      </form>
    </Card>
  );
}