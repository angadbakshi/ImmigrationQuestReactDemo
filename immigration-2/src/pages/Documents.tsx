import { mockDocuments } from '../data/mockData';
import { Tabs } from 'core/src/components/ui/Tabs';
import {DocumentExamples, DocumentList} from "core/src/features/documents";

export function Documents() {
  const handleSelectDocument = (doc: Document) => {
    console.log('Selected document:', doc);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Management</h1>
      
      <Tabs
        tabs={[
          {
            id: 'documents',
            label: 'My Documents',
            content: <DocumentList documents={mockDocuments} onSelect={handleSelectDocument} />
          },
          {
            id: 'examples',
            label: 'Document Examples',
            content: <DocumentExamples />
          }
        ]}
      />
    </div>
  );
}