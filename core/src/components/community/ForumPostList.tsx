import React from 'react';
import { Card } from '../../../../core/src/components/ui/Card';
import { Badge } from '../../../../core/src/components/ui/Badge';
import { ThumbsUp, Clock } from 'lucide-react';
import { MessageSquare, type LucideProps } from 'lucide-react';


import {ForumPost} from "../../../../immigration-2/src/types/community";

interface ForumPostListProps {
  posts: ForumPost[];
  onSelect: (post: ForumPost) => void;
}

export function ForumPostList({ posts, onSelect }: ForumPostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="hover:shadow-md cursor-pointer"
          onClick={() => onSelect(post)}
        >
          <div className="flex items-start gap-4">
            <img
              src={post.author.photoUrl}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    by {post.author.name} • {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="default">{post.category}</Badge>
              </div>
              
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {post.content}
              </p>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  <span>{post.comments.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp size={14} />
                  <span>{post.likes}</span>
                </div>
                <div className="flex gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}