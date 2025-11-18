import { useEffect, useState } from 'react';
import { MapPin, Flag, Award, Target, User } from 'lucide-react';
import {useAuth} from "../../../../../auth/src";
import {Card} from "../../../components";
import {supabase} from "../../../services";
import {useToast} from "../../../../../immigration-2/src/context/ToastContext";

interface ExtendedProfile {
id: string;
  full_name: string;
  nationality: string | null;
  destination_country: string | null;
  goals: string[];
  photo_url?: string;
  selected_program: {
    id: string;
    name: string;
    type: string;
  } | null;
}

// Default values
const DEFAULT_PROFILE: Omit<ExtendedProfile, 'id'> = {
  full_name: 'Guest User',
  nationality: 'Not specified',
  destination_country: 'Canada',
  goals: ['Complete profile to set goals'],
  photo_url: undefined,
  selected_program: null
};

export function UserProfileCard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define and immediately invoke the async function
    async function fetchProfile() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select(`
            id,
            full_name,
            nationality,
            destination_country,
            goals,
            selected_program:immigration_programs!selected_program_id (
              id,
              name,
              type
            )
          `)
            .eq('id', user.id)
            .single();

        if (profileError) {
          // Handle specific database errors
          if (profileError.code === '42703') {
            // Column doesn't exist - use default values
            setProfile({
              id: user.id,
              ...DEFAULT_PROFILE
            });
          } else {
            throw profileError;
          }
          return;
        }

        // Format and set profile data with fallbacks
        setProfile({
          id: profileData.id,
          full_name: profileData.full_name || DEFAULT_PROFILE.full_name,
          nationality: profileData.nationality || DEFAULT_PROFILE.nationality,
          destination_country: profileData.destination_country || DEFAULT_PROFILE.destination_country,
          goals: Array.isArray(profileData.goals) ? profileData.goals : DEFAULT_PROFILE.goals,
          selected_program: Array.isArray(profileData.selected_program)
              ? profileData.selected_program[0] || null
              : (profileData.selected_program || null)
        });

      } catch (error) {
        console.error('Error fetching profile:', error);
        // Use default values on error
        setProfile({
          id: user.id,
          ...DEFAULT_PROFILE
        });
      } finally {
        setLoading(false);
      }
    }

    // Call fetchProfile instead of fetchProgress
    fetchProfile();
  }, [user?.id, showToast]);

  if (loading) {
    return (
        <Card className="mb-6">
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="animate-pulse bg-gray-200 w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-4">
                <div className="animate-pulse bg-gray-200 h-5 w-1/3 rounded" />
                <div className="space-y-2">
                  <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded" />
                  <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded" />
                </div>
              </div>
            </div>
          </div>
        </Card>
    );
  }

  const displayProfile = profile || { id: user?.id || '', ...DEFAULT_PROFILE };

  return (
      <Card className="mb-6">
        <div className="flex items-start gap-4 p-4">
          {displayProfile.photo_url ? (
              <img
                  src={displayProfile.photo_url}
                  alt={displayProfile.full_name}
                  className="w-16 h-16 rounded-full object-cover"
              />
          ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
          )}

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{displayProfile.full_name}</h2>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>From: {displayProfile.nationality}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Flag size={16} />
                <span>To: {displayProfile.destination_country}</span>
              </div>
              {displayProfile.selected_program && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award size={16} />
                    <span>{displayProfile.selected_program.name}</span>
                  </div>
              )}
            </div>

            <div className="mt-4">
              <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Target size={16} />
                Goals
              </h3>
              <ul className="mt-2 space-y-1">
                {displayProfile.goals.map((goal, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {goal}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
  );
}