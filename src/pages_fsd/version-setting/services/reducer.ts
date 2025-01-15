import { CurTBLVersion } from '../models';

export type ActionType =
  | { type: 'SET_STATE'; payload: CurTBLVersion[] }
  | { type: 'ADD_VERSION' | 'SUB_VERSION'; payload: number }
  | { type: 'ADD_ALL_VERSION' | 'SUB_ALL_VERSION' };

export const reducer = (state: CurTBLVersion[], action: ActionType) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'ADD_VERSION':
      return state.map((version, idx) => {
        if (idx === action.payload) {
          return { ...version, Version: version.Version + 1 };
        }
        return { ...version };
      });
    case 'SUB_VERSION':
      return state.map((version, idx) => {
        if (idx === action.payload && version.Version > 0) {
          return { ...version, Version: version.Version - 1 };
        }
        return { ...version };
      });
    case 'ADD_ALL_VERSION':
      return state.map((version) => ({
        ...version,
        Version: version.Version + 1,
      }));
    case 'SUB_ALL_VERSION':
      return state.map((version) => {
        if (version.Version > 0) {
          return { ...version, Version: version.Version - 1 };
        }
        return { ...version };
      });
    default:
      return state;
  }
};
