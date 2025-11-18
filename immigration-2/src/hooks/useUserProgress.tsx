import { useState } from 'react';
import { supabase } from 'core/src/services/supabase/supabase';
import { useToast } from '../context/ToastContext';
import {useAuth} from "../../../auth/src";

export function useUserProgress() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);

    async function addPoints(points: number) {
        try {
            if (!user?.id) return;

            const { data: currentProgress } = await supabase
                .from('user_progress')
                .select('points, level')
                .eq('id', user.id)
                .single();

            if (!currentProgress) {
                // Create initial progress
                const { error } = await supabase
                    .from('user_progress')
                    .insert([{ id: user.id, points, level: 1 }]);

                if (error) throw error;
                return;
            }

            const newPoints = currentProgress.points + points;
            const newLevel = Math.floor(newPoints / 200) + 1;

            const { error } = await supabase
                .from('user_progress')
                .update({ points: newPoints, level: newLevel })
                .eq('id', user.id);

            if (error) throw error;

            if (newLevel > currentProgress.level) {
                showToast(`Congratulations! You reached Level ${newLevel}!`, 'success');
            }
        } catch (error) {
            console.error('Error updating progress:', error);
            showToast('Failed to update progress', 'error');
        }
    }

    return { addPoints };
}