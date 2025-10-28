import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN =
  '5577996473815959900095380494252903852300887338186143529225937359963241040485790392344295041951727111'

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
    isTokenValid: () => boolean
    isAuthenticated: () => boolean
    isAdmin: () => boolean
    hasRole: (role: string) => boolean
  }
}

const normalizeRole = (role: string | string[] | undefined): string[] => {
  if (!role) return []
  return Array.isArray(role) ? role : [role]
}

const decodeJWT = (token: string): AuthUser | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token)

    return {
      accountNo: decoded.sub || '',
      email: decoded.email || '',
      role: normalizeRole(decoded.role),
      exp: decoded.exp || 0,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

const isTokenExpired = (exp: number): boolean => {
  return Date.now() >= exp * 1000
}

export const useAuthStore = create<AuthState>()((set, get) => {
  const cookieState = getCookie(ACCESS_TOKEN)
  const initToken = cookieState || ''
  const initUser = initToken ? decodeJWT(initToken) : null

  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, accessToken)
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
      isTokenValid: () => {
        const { user } = get().auth
        if (!user) return false
        return !isTokenExpired(user.exp)
      },
      isAuthenticated: () => {
        const { user, accessToken } = get().auth
        return Boolean(accessToken && user && get().auth.isTokenValid())
      },
      isAdmin: () => {
        if (!get().auth.isAuthenticated()) return false
        const { user } = get().auth
        return user!.role.includes('ROLE_ADMIN')
      },
      hasRole: (role: string) => {
        if (!get().auth.isAuthenticated()) return false
        const { user } = get().auth
        return user!.role.includes(role)
      },
    },
  }
})
