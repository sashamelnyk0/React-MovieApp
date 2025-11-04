import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // --- Favourite movie ---  
        favouriteMovies: [],
        addFavourite: (movie) => set((state) => ({ favouriteMovies: [...state.favouriteMovies, movie] })),
        removeFavourite: (movieId) =>
        set((state) => ({
            favouriteMovies: state.favouriteMovies.filter(movie => movie.id !== movieId)
        })),
      
      // --- Search ---
      searchTerm: '',
      setSearch: (term)=> set({searchTerm: term})  
    }),
    {
      name: 'app-storage',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['searchTerm'].includes(key))
        ),
    }
  )
)