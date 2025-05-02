import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import Cookies from 'js-cookie'

export const useAuthStore = create(persist(
  (set) => ({
    token: '',
    profile: [],
    
    setToken: (token) => {
      set({ token })
    },

    setProfile: (profile) => {
      console.log(profile);
      
      set({ profile })
    },

  }),{
    name: 'auth', // unique name
  }
))