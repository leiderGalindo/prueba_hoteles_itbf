import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import Cookies from 'js-cookie'

export const useAuthStore = create(persist(
  (set, get) => ({
    token: '',
    expiresIn: 0,
    profile: [],
    
    setToken: (dataToken) => {
      const { token, expires_in } = dataToken
      // 1 hora en milisegundos
      const timeSession = expires_in * 1000;
      const expiresIn = Date.now() + timeSession;

      set({ token, expiresIn })
    },

    setProfile: (profile) => {
      console.log(profile);
      
      set({ profile })
    },

    validateSession: () => {
      const { token, expiresIn } = get()
      if(token && expiresIn < Date.now()){
        set({ token: '', expiresIn: 0 })
      }
    }

  }),{
    name: 'auth', // unique name
  }
))