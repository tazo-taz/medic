"use client"

import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import ModalsProviders from '@/components/providers/modals-providers'

const queryClient = new QueryClient()

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalsProviders />
      {children}
    </QueryClientProvider>
  )
}
