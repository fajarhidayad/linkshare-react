/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UsernameImport } from './routes/$username'
import { Route as IndexImport } from './routes/index'
import { Route as dashboardDashboardImport } from './routes/(dashboard)/_dashboard'
import { Route as authAuthImport } from './routes/(auth)/_auth'
import { Route as dashboardDashboardProfileImport } from './routes/(dashboard)/_dashboard.profile'
import { Route as dashboardDashboardLinksImport } from './routes/(dashboard)/_dashboard.links'
import { Route as authAuthRegisterImport } from './routes/(auth)/_auth.register'
import { Route as authAuthLoginImport } from './routes/(auth)/_auth.login'

// Create Virtual Routes

const dashboardImport = createFileRoute('/(dashboard)')()
const authImport = createFileRoute('/(auth)')()

// Create/Update Routes

const dashboardRoute = dashboardImport.update({
  id: '/(dashboard)',
  getParentRoute: () => rootRoute,
} as any)

const authRoute = authImport.update({
  id: '/(auth)',
  getParentRoute: () => rootRoute,
} as any)

const UsernameRoute = UsernameImport.update({
  id: '/$username',
  path: '/$username',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const dashboardDashboardRoute = dashboardDashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => dashboardRoute,
} as any)

const authAuthRoute = authAuthImport.update({
  id: '/_auth',
  getParentRoute: () => authRoute,
} as any)

const dashboardDashboardProfileRoute = dashboardDashboardProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => dashboardDashboardRoute,
} as any)

const dashboardDashboardLinksRoute = dashboardDashboardLinksImport.update({
  id: '/links',
  path: '/links',
  getParentRoute: () => dashboardDashboardRoute,
} as any)

const authAuthRegisterRoute = authAuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => authAuthRoute,
} as any)

const authAuthLoginRoute = authAuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => authAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$username': {
      id: '/$username'
      path: '/$username'
      fullPath: '/$username'
      preLoaderRoute: typeof UsernameImport
      parentRoute: typeof rootRoute
    }
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth': {
      id: '/(auth)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authAuthImport
      parentRoute: typeof authRoute
    }
    '/(dashboard)': {
      id: '/(dashboard)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof dashboardImport
      parentRoute: typeof rootRoute
    }
    '/(dashboard)/_dashboard': {
      id: '/(dashboard)/_dashboard'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof dashboardDashboardImport
      parentRoute: typeof dashboardRoute
    }
    '/(auth)/_auth/login': {
      id: '/(auth)/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authAuthLoginImport
      parentRoute: typeof authAuthImport
    }
    '/(auth)/_auth/register': {
      id: '/(auth)/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authAuthRegisterImport
      parentRoute: typeof authAuthImport
    }
    '/(dashboard)/_dashboard/links': {
      id: '/(dashboard)/_dashboard/links'
      path: '/links'
      fullPath: '/links'
      preLoaderRoute: typeof dashboardDashboardLinksImport
      parentRoute: typeof dashboardDashboardImport
    }
    '/(dashboard)/_dashboard/profile': {
      id: '/(dashboard)/_dashboard/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof dashboardDashboardProfileImport
      parentRoute: typeof dashboardDashboardImport
    }
  }
}

// Create and export the route tree

interface authAuthRouteChildren {
  authAuthLoginRoute: typeof authAuthLoginRoute
  authAuthRegisterRoute: typeof authAuthRegisterRoute
}

const authAuthRouteChildren: authAuthRouteChildren = {
  authAuthLoginRoute: authAuthLoginRoute,
  authAuthRegisterRoute: authAuthRegisterRoute,
}

const authAuthRouteWithChildren = authAuthRoute._addFileChildren(
  authAuthRouteChildren,
)

interface authRouteChildren {
  authAuthRoute: typeof authAuthRouteWithChildren
}

const authRouteChildren: authRouteChildren = {
  authAuthRoute: authAuthRouteWithChildren,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

interface dashboardDashboardRouteChildren {
  dashboardDashboardLinksRoute: typeof dashboardDashboardLinksRoute
  dashboardDashboardProfileRoute: typeof dashboardDashboardProfileRoute
}

const dashboardDashboardRouteChildren: dashboardDashboardRouteChildren = {
  dashboardDashboardLinksRoute: dashboardDashboardLinksRoute,
  dashboardDashboardProfileRoute: dashboardDashboardProfileRoute,
}

const dashboardDashboardRouteWithChildren =
  dashboardDashboardRoute._addFileChildren(dashboardDashboardRouteChildren)

interface dashboardRouteChildren {
  dashboardDashboardRoute: typeof dashboardDashboardRouteWithChildren
}

const dashboardRouteChildren: dashboardRouteChildren = {
  dashboardDashboardRoute: dashboardDashboardRouteWithChildren,
}

const dashboardRouteWithChildren = dashboardRoute._addFileChildren(
  dashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof dashboardDashboardRouteWithChildren
  '/$username': typeof UsernameRoute
  '/login': typeof authAuthLoginRoute
  '/register': typeof authAuthRegisterRoute
  '/links': typeof dashboardDashboardLinksRoute
  '/profile': typeof dashboardDashboardProfileRoute
}

export interface FileRoutesByTo {
  '/': typeof dashboardDashboardRouteWithChildren
  '/$username': typeof UsernameRoute
  '/login': typeof authAuthLoginRoute
  '/register': typeof authAuthRegisterRoute
  '/links': typeof dashboardDashboardLinksRoute
  '/profile': typeof dashboardDashboardProfileRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$username': typeof UsernameRoute
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_auth': typeof authAuthRouteWithChildren
  '/(dashboard)': typeof dashboardRouteWithChildren
  '/(dashboard)/_dashboard': typeof dashboardDashboardRouteWithChildren
  '/(auth)/_auth/login': typeof authAuthLoginRoute
  '/(auth)/_auth/register': typeof authAuthRegisterRoute
  '/(dashboard)/_dashboard/links': typeof dashboardDashboardLinksRoute
  '/(dashboard)/_dashboard/profile': typeof dashboardDashboardProfileRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/$username' | '/login' | '/register' | '/links' | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/$username' | '/login' | '/register' | '/links' | '/profile'
  id:
    | '__root__'
    | '/'
    | '/$username'
    | '/(auth)'
    | '/(auth)/_auth'
    | '/(dashboard)'
    | '/(dashboard)/_dashboard'
    | '/(auth)/_auth/login'
    | '/(auth)/_auth/register'
    | '/(dashboard)/_dashboard/links'
    | '/(dashboard)/_dashboard/profile'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  UsernameRoute: typeof UsernameRoute
  authRoute: typeof authRouteWithChildren
  dashboardRoute: typeof dashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  UsernameRoute: UsernameRoute,
  authRoute: authRouteWithChildren,
  dashboardRoute: dashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$username",
        "/(auth)",
        "/(dashboard)"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$username": {
      "filePath": "$username.tsx"
    },
    "/(auth)": {
      "filePath": "(auth)",
      "children": [
        "/(auth)/_auth"
      ]
    },
    "/(auth)/_auth": {
      "filePath": "(auth)/_auth.tsx",
      "parent": "/(auth)",
      "children": [
        "/(auth)/_auth/login",
        "/(auth)/_auth/register"
      ]
    },
    "/(dashboard)": {
      "filePath": "(dashboard)",
      "children": [
        "/(dashboard)/_dashboard"
      ]
    },
    "/(dashboard)/_dashboard": {
      "filePath": "(dashboard)/_dashboard.tsx",
      "parent": "/(dashboard)",
      "children": [
        "/(dashboard)/_dashboard/links",
        "/(dashboard)/_dashboard/profile"
      ]
    },
    "/(auth)/_auth/login": {
      "filePath": "(auth)/_auth.login.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(auth)/_auth/register": {
      "filePath": "(auth)/_auth.register.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(dashboard)/_dashboard/links": {
      "filePath": "(dashboard)/_dashboard.links.tsx",
      "parent": "/(dashboard)/_dashboard"
    },
    "/(dashboard)/_dashboard/profile": {
      "filePath": "(dashboard)/_dashboard.profile.tsx",
      "parent": "/(dashboard)/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
