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
import { Route as IndexLessonCreateImport } from './routes/_index/lesson/create'
import { Route as IndexLessonSectionLessonImport } from './routes/_index/lesson/$section.$lesson'

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

const IndexLessonCreateRoute = IndexLessonCreateImport.update({
  path: '/lesson/create',
  getParentRoute: () => IndexRoute,
} as any)

const IndexLessonSectionLessonRoute = IndexLessonSectionLessonImport.update({
  path: '/lesson/$section/$lesson',
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
    '/_index/lesson/create': {
      id: '/_index/lesson/create'
      path: '/lesson/create'
      fullPath: '/lesson/create'
      preLoaderRoute: typeof IndexLessonCreateImport
      parentRoute: typeof IndexImport
    }
    '/_index/lesson/$section/$lesson': {
      id: '/_index/lesson/$section/$lesson'
      path: '/lesson/$section/$lesson'
      fullPath: '/lesson/$section/$lesson'
      preLoaderRoute: typeof IndexLessonSectionLessonImport
      parentRoute: typeof IndexImport
    }
  }
}

// Create and export the route tree

interface IndexRouteChildren {
  IndexAdvancedRoute: typeof IndexAdvancedRoute
  IndexDocsRoute: typeof IndexDocsRoute
  IndexEventsRoute: typeof IndexEventsRoute
  IndexNewRoute: typeof IndexNewRoute
  IndexIndexRoute: typeof IndexIndexRoute
  IndexLessonCreateRoute: typeof IndexLessonCreateRoute
  IndexLessonSectionLessonRoute: typeof IndexLessonSectionLessonRoute
}

const IndexRouteChildren: IndexRouteChildren = {
  IndexAdvancedRoute: IndexAdvancedRoute,
  IndexDocsRoute: IndexDocsRoute,
  IndexEventsRoute: IndexEventsRoute,
  IndexNewRoute: IndexNewRoute,
  IndexIndexRoute: IndexIndexRoute,
  IndexLessonCreateRoute: IndexLessonCreateRoute,
  IndexLessonSectionLessonRoute: IndexLessonSectionLessonRoute,
}

const IndexRouteWithChildren = IndexRoute._addFileChildren(IndexRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof IndexRouteWithChildren
  '/advanced': typeof IndexAdvancedRoute
  '/docs': typeof IndexDocsRoute
  '/events': typeof IndexEventsRoute
  '/new': typeof IndexNewRoute
  '/': typeof IndexIndexRoute
  '/lesson/create': typeof IndexLessonCreateRoute
  '/lesson/$section/$lesson': typeof IndexLessonSectionLessonRoute
}

export interface FileRoutesByTo {
  '/advanced': typeof IndexAdvancedRoute
  '/docs': typeof IndexDocsRoute
  '/events': typeof IndexEventsRoute
  '/new': typeof IndexNewRoute
  '/': typeof IndexIndexRoute
  '/lesson/create': typeof IndexLessonCreateRoute
  '/lesson/$section/$lesson': typeof IndexLessonSectionLessonRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_index': typeof IndexRouteWithChildren
  '/_index/advanced': typeof IndexAdvancedRoute
  '/_index/docs': typeof IndexDocsRoute
  '/_index/events': typeof IndexEventsRoute
  '/_index/new': typeof IndexNewRoute
  '/_index/': typeof IndexIndexRoute
  '/_index/lesson/create': typeof IndexLessonCreateRoute
  '/_index/lesson/$section/$lesson': typeof IndexLessonSectionLessonRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/advanced'
    | '/docs'
    | '/events'
    | '/new'
    | '/'
    | '/lesson/create'
    | '/lesson/$section/$lesson'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/advanced'
    | '/docs'
    | '/events'
    | '/new'
    | '/'
    | '/lesson/create'
    | '/lesson/$section/$lesson'
  id:
    | '__root__'
    | '/_index'
    | '/_index/advanced'
    | '/_index/docs'
    | '/_index/events'
    | '/_index/new'
    | '/_index/'
    | '/_index/lesson/create'
    | '/_index/lesson/$section/$lesson'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

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
        "/_index/",
        "/_index/lesson/create",
        "/_index/lesson/$section/$lesson"
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
    },
    "/_index/lesson/create": {
      "filePath": "_index/lesson/create.tsx",
      "parent": "/_index"
    },
    "/_index/lesson/$section/$lesson": {
      "filePath": "_index/lesson/$section.$lesson.tsx",
      "parent": "/_index"
    }
  }
}
ROUTE_MANIFEST_END */
