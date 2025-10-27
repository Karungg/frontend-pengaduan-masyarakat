import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'thisisjustarandomstring'

interface JWTPayload {
  sub: string
  email?: string
  role: string | string[]
  exp: number
  iat: number
}

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    isAuthenticated: () => boolean
    isAdmin: () => boolean
    hasRole: (role: string) => boolean
  }
}

// Helper function to decode JWT and transform to AuthUser
const decodeJWT = (token: string): AuthUser | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token)

    return {
      accountNo: decoded.sub || '',
      email: decoded.email || '',
      role: Array.isArray(decoded.role) ? decoded.role : [decoded.role],
      exp: decoded.exp || 0,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

// Helper function to check if token is expired
const isTokenExpired = (exp: number): boolean => {
  return Date.now() >= exp * 1000
}

export const useAuthStore = create<AuthState>()((set, get) => {
  const cookieState = getCookie(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  const initUser = initToken ? decodeJWT(initToken) : null

  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
          const user = decodeJWT(accessToken)
          return { ...state, auth: { ...state.auth, accessToken, user } }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, accessToken: '', user: null },
          }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
      isAuthenticated: () => {
        const { user, accessToken } = get().auth
        if (!accessToken || !user) return false
        if (isTokenExpired(user.exp)) {
          get().auth.reset()
          return false
        }
        return true
      },
      isAdmin: () => {
        const { user } = get().auth
        if (!user) return false
        if (isTokenExpired(user.exp)) {
          get().auth.reset()
          return false
        }
        return user.role.includes('ROLE_ADMIN')
      },
      hasRole: (role: string) => {
        const { user } = get().auth
        if (!user) return false
        if (isTokenExpired(user.exp)) {
          get().auth.reset()
          return false
        }
        return user.role.includes(role)
      },
    },
  }
})
