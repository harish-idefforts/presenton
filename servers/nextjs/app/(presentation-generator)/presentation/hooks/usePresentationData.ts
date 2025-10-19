import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setPresentationData } from "@/store/slices/presentationGeneration";
import { DashboardApi } from '../../services/api/dashboard';
import {  clearHistory } from "@/store/slices/undoRedoSlice";


export const usePresentationData = (
  presentationId: string,
  setLoading: (loading: boolean) => void,
  setError: (error: boolean) => void
) => {
  const dispatch = useDispatch();

  const fetchUserSlides = useCallback(async () => {
    try {
      const data = await DashboardApi.getPresentation(presentationId);
      if (data) {
        dispatch(setPresentationData(data));
        dispatch(clearHistory());
        setLoading(false);

        // Fire-and-forget: cache external images for this presentation and persist updated URLs
        try {
          await fetch('/api/migrate-external-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: [presentationId] }),
          });
        } catch (e) {
          // Non-blocking; ignore errors here
          console.warn('image cache migrate (single) failed', e);
        }
      }
    } catch (error) {
      setError(true);
      toast.error("Failed to load presentation");
      console.error("Error fetching user slides:", error);
      setLoading(false);
    }
  }, [presentationId, dispatch, setLoading, setError]);

  return {
    fetchUserSlides,
  };
};
