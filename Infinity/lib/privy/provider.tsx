'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { type PropsWithChildren } from 'react'

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""
const PRIVY_CLIENT_ID = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID ?? ""

export function PrivyWrapper({ children }: PropsWithChildren) {
  return (
    <PrivyProvider 
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        loginMethods: ['email', 'google','wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#000000',
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}