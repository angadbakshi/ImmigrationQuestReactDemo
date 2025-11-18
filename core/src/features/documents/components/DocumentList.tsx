import React from 'react';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import {Badge, Card} from "../../../components";
import { Document } from '../../../types/documents';

interface DocumentListProps {
  documents: Document[];
  onSelect: (doc: Document) => void;
}

export function DocumentList({ documents, onSelect }: DocumentListProps) {
  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="text-green-500" />;
      case 'rejected': return <XCircle className="text-red-500" />;
      case 'uploaded': return <Clock className="text-yellow-500" />;
      case 'approved': return <CheckCircle className="text-green-500" />;
      default: return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card
          key={doc.id}
          className="hover:shadow-md cursor-pointer"
          onClick={() => onSelect(doc)}
        >
          <div className="flex items-start gap-4">
            {getStatusIcon(doc.status)}
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-900">{doc.name}</h3>
                <Badge variant={doc.status === 'verified' ? 'success' : 'default'}>
                  {doc.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
              {doc.uploadDate && (
                <p className="text-xs text-gray-500 mt-2">
                  Uploaded: {doc.uploadDate.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}