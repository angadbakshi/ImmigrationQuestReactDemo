// import { useState, useEffect } from 'react';
// import { Award } from 'lucide-react';
// import { Card } from 'core/src/components/ui/Card';
// import { supabase } from 'core/src/services/supabase/supabase';
// import { useAuth } from '../../../auth/src/context/AuthContext';
//
// interface UserProgress {
//   id: string;  // Changed from user_id to id to match table
//   level: number;
//   points: number;
// }
//
// const DEFAULT_PROGRESS: Omit<UserProgress, 'id'> = {
//   level: 1,
//   points: 0
// };
//
// export function UserProgress() {
//   const { user } = useAuth();
//   const [progress, setProgress] = useState<UserProgress | null>(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     async function fetchOrCreateProgress() {
//       if (!user?.id) {
//         setLoading(false);
//         return;
//       }
//
//       try {
//         // First, try to get existing progress
//         const { data: existingProgress} = await supabase
//             .from('user_progress')
//             .select('*')
//             .eq('id', user.id)
//             .single();
//
//         // If progress exists, use it
//         if (existingProgress) {
//           setProgress(existingProgress);
//           setLoading(false);
//           return;
//         }
//
//         // If no progress exists, create it
//         const { data: newProgress, error: insertError } = await supabase
//             .from('user_progress')
//             .insert([{
//               id: user.id,  // Using id instead of user_id
//               ...DEFAULT_PROGRESS
//             }])
//             .select()
//             .single();
//
//         if (insertError) {
//           console.error('Error creating progress:', insertError);
//           // Use default values if insert fails
//           setProgress({
//             id: user.id,
//             ...DEFAULT_PROGRESS
//           });
//         } else {
//           setProgress(newProgress);
//         }
//       } catch (error) {
//         console.error('Error handling progress:', error);
//         // Show default progress on error
//         setProgress({
//           id: user.id,
//           ...DEFAULT_PROGRESS
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//
//     fetchOrCreateProgress();
//   }, [user?.id]);
//
//   if (loading) {
//     return (
//         <Card className="mb-6">
//           <div className="flex items-center gap-4 p-4">
//             <div className="animate-pulse bg-gray-200 rounded-full w-12 h-12" />
//             <div className="flex-1 space-y-4">
//               <div className="animate-pulse bg-gray-200 h-4 w-1/4 rounded" />
//               <div className="animate-pulse bg-gray-200 h-2 w-full rounded" />
//             </div>
//           </div>
//         </Card>
//     );
//   }
//
//   // Use default values if no progress exists
//   const currentProgress = progress || { id: user?.id || '', ...DEFAULT_PROGRESS };
//   const pointsToNextLevel = currentProgress.level * 200;
//   const progressPercentage = Math.min((currentProgress.points / pointsToNextLevel) * 100, 100);
//
//   return (
//       <Card className="mb-6">
//         <div className="flex items-center gap-4 p-4">
//           <div className="bg-blue-100 p-3 rounded-full">
//             <Award className="w-6 h-6 text-blue-600" />
//           </div>
//           <div className="flex-1">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">{user?.name || 'User'}</h2>
//               <span className="text-sm text-gray-500">Level {currentProgress.level}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                   className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${progressPercentage}%` }}
//               />
//             </div>
//             <div className="flex justify-between text-sm text-gray-500 mt-1">
//               <span>{currentProgress.points} points</span>
//               <span>{pointsToNextLevel - currentProgress.points} points to level {currentProgress.level + 1}</span>
//             </div>
//           </div>
//         </div>
//       </Card>
//   );
// }