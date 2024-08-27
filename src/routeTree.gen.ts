/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/_index'
import { Route as IndexIndexImport } from './routes/_index/index'
import { Route as IndexNewImport } from './routes/_index/new'
import { Route as IndexEventsImport } from './routes/_index/events'
import { Route as IndexDocsImport } from './routes/_index/docs'
import { Route as IndexAdvancedImport } from './routes/_index/advanced'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/_index',
  getParentRoute: () => rootRoute,
} as any)

const IndexIndexRoute = IndexIndexImport.update({
  path: '/',
  getParentRoute: () => IndexRoute,
} as any)

const IndexNewRoute = IndexNewImport.update({
  path: '/new',
  getParentRoute: () => IndexRoute,
} as any)

const IndexEventsRoute = IndexEventsImport.update({
  path: '/events',
  getParentRoute: () => IndexRoute,
} as any)

const IndexDocsRoute = IndexDocsImport.update({
  path: '/docs',
  getParentRoute: () => IndexRoute,
} as any)

const IndexAdvancedRoute = IndexAdvancedImport.update({
  path: '/advanced',
  getParentRoute: () => IndexRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_index': {
      id: '/_index'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_index/advanced': {
      id: '/_index/advanced'
      path: '/advanced'
      fullPath: '/advanced'
      preLoaderRoute: typeof IndexAdvancedImport
      parentRoute: typeof IndexImport
    }
    '/_index/docs': {
      id: '/_index/docs'
      path: '/docs'
      fullPath: '/docs'
      preLoaderRoute: typeof IndexDocsImport
      parentRoute: typeof IndexImport
    }
    '/_index/events': {
      id: '/_index/events'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof IndexEventsImport
      parentRoute: typeof IndexImport
    }
    '/_index/new': {
      id: '/_index/new'
      path: '/new'
      fullPath: '/new'
      preLoaderRoute: typeof IndexNewImport
      parentRoute: typeof IndexImport
    }
    '/_index/': {
      id: '/_index/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexIndexImport
      parentRoute: typeof IndexImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute: IndexRoute.addChildren({
    IndexAdvancedRoute,
    IndexDocsRoute,
    IndexEventsRoute,
    IndexNewRoute,
    IndexIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_index"
      ]
    },
    "/_index": {
      "filePath": "_index.tsx",
      "children": [
        "/_index/advanced",
        "/_index/docs",
        "/_index/events",
        "/_index/new",
        "/_index/"
      ]
    },
    "/_index/advanced": {
      "filePath": "_index/advanced.tsx",
      "parent": "/_index"
    },
    "/_index/docs": {
      "filePath": "_index/docs.tsx",
      "parent": "/_index"
    },
    "/_index/events": {
      "filePath": "_index/events.tsx",
      "parent": "/_index"
    },
    "/_index/new": {
      "filePath": "_index/new.tsx",
      "parent": "/_index"
    },
    "/_index/": {
      "filePath": "_index/index.tsx",
      "parent": "/_index"
    }
  }
}
ROUTE_MANIFEST_END */
