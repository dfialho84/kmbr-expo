import { create } from 'zustand';
import type { SmokeResultDto } from '@application/dtos/SmokeResultDto';

type SmokeStatus = 'idle' | 'loading' | 'success' | 'error';

interface SmokeState {
  status: SmokeStatus;
  result: SmokeResultDto | null;
  errorMessage: string | null;
  setLoading: () => void;
  setSuccess: (result: SmokeResultDto) => void;
  setError: (message: string) => void;
  reset: () => void;
}

export const useSmokeStore = create<SmokeState>((set) => ({
  status: 'idle',
  result: null,
  errorMessage: null,
  setLoading: () => set({ status: 'loading', result: null, errorMessage: null }),
  setSuccess: (result: SmokeResultDto) => set({ status: 'success', result, errorMessage: null }),
  setError: (message: string) => set({ status: 'error', result: null, errorMessage: message }),
  reset: () => set({ status: 'idle', result: null, errorMessage: null }),
}));
