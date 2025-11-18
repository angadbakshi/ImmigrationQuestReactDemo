import { ForumPostList } from 'core/features/community/ForumPostList';
import { mockPosts } from '../data/mockPosts';
import type { ForumPost } from '../types/community';

export function Community() {
  const handleSelectPost = (post: ForumPost) => {
    console.log('Selected post:', post);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Forum</h1>
      <ForumPostList posts={mockPosts} onSelect={handleSelectPost} />
    </div>
  );
}