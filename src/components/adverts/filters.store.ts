import create from 'zustand';

type Store = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export const useAdvertsFilters = create<Store>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm: string) =>
    set((state) => ({ ...state, searchTerm })),
}));
