import {
  LayoutDashboard,
  Monitor,
  ListTodo,
  HelpCircle,
  Bell,
  Package,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  User,
  UserCheck,
  UserPen,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/admin/',
          icon: LayoutDashboard,
        },
        {
          title: 'Users',
          icon: Users,
          items: [
            {
              title: 'Admin',
              url: '/admin/admins',
              icon: UserCheck,
            },
            {
              title: 'Agency',
              url: '/admin/agencies',
              icon: UserPen,
            },
            {
              title: 'Citizen',
              url: '/admin/users',
              icon: User,
            },
          ],
        },
        {
          title: 'Tasks',
          url: '/admin/tasks',
          icon: ListTodo,
        },
        {
          title: 'Complaints',
          url: '/admin/complaints',
          icon: ListTodo,
        },
        {
          title: 'Apps',
          url: '/admin/apps',
          icon: Package,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/admin/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/admin/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/admin/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/admin/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/admin/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/admin/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
