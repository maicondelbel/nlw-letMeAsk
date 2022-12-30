import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

interface IUser {
  id: string
  name: string
  avatarUrl: string
}

interface IAuthContextProps {
  user: IUser | undefined
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOutGoogle: () => Promise<void>
}

interface IAuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextProps)

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const userUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, photoURL, displayName } = user

        setUser({
          id: uid,
          avatarUrl: photoURL || '/avatar.png',
          name: displayName || 'Anonymous',
        })
      }
      setIsLoading(false)

      return () => {
        userUnsubscribe()
      }
    })
  }, [])

  async function signInWithGoogle() {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      const { uid, photoURL, displayName } = result.user

      setUser({
        id: uid,
        avatarUrl: photoURL || '/avatar.png',
        name: displayName || 'Anonymous',
      })
    }
    setIsLoading(false)
  }

  async function signOutGoogle() {
    setIsLoading(true)
    await signOut(auth)
    setUser(undefined)
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signInWithGoogle, signOutGoogle }}
    >
      {children}
    </AuthContext.Provider>
  )
}
