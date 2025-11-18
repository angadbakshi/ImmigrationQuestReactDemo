import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import {Card} from "../../../components";

interface DocumentExample {
  title: string;
  description: string;
  imageUrl: string;
  notes?: string[];
}

interface DocumentCategoryProps {
  title: string;
  examples: DocumentExample[];
}

function DocumentCategory({ title, examples }: DocumentCategoryProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={example.imageUrl}
                alt={example.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                {example.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{example.description}</p>
              {example.notes && (
                <div className="space-y-2">
                  {example.notes.map((note, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-500">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function DocumentExamples() {
  const sponsorDocuments: DocumentExample[] = [
    {
      title: "Canadian Passport",
      description: "Valid Canadian passport showing citizenship status",
      imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800",
      notes: ["Must be valid", "Clear photo page required"]
    },
    {
      title: "Notice of Assessment",
      description: "Tax assessment documents from CRA",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      notes: ["Last 3 years required", "Must show income details"]
    },
    {
      title: "Employment Letter",
      description: "Current employment verification on company letterhead",
      imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
      notes: ["Include position and salary", "Recent within 30 days"]
    }
  ];

  const spouseDocuments: DocumentExample[] = [
    {
      title: "Indian Passport",
      description: "Valid passport with minimum 2 years validity",
      imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800",
      notes: ["Must have 2+ years validity", "All pages must be clear"]
    },
    {
      title: "Marriage Certificate",
      description: "Official marriage certificate with translation",
      imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
      notes: ["Original and translated copy", "Must be authenticated"]
    },
    {
      title: "Police Clearance",
      description: "Police clearance certificate from India",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      notes: ["Recent within 6 months", "All regions of residence"]
    }
  ];

  const relationshipProof: DocumentExample[] = [
    {
      title: "Wedding Photos",
      description: "Photos showing wedding ceremony and celebrations",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      notes: ["Multiple ceremony photos", "Family group photos"]
    },
    {
      title: "Travel History",
      description: "Evidence of visits and travel together",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
      notes: ["Boarding passes", "Hotel bookings", "Photos from trips"]
    },
    {
      title: "Communication History",
      description: "Proof of ongoing communication",
      imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800",
      notes: ["Chat histories", "Call logs", "Email threads"]
    }
  ];

  return (
    <div className="space-y-8">
      <DocumentCategory title="Sponsor Documents (Canadian Husband)" examples={sponsorDocuments} />
      <DocumentCategory title="Spouse Documents (Indian Wife)" examples={spouseDocuments} />
      <DocumentCategory title="Relationship Evidence" examples={relationshipProof} />
    </div>
  );
}