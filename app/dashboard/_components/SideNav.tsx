"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'

function SideNav() {
  const MenuList = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'History', icon: FileClock, path: '/dashboard/history' },
    { name: 'Billing', icon: WalletCards, path: '/dashboard/billing' },
    { name: 'Setting', icon: Settings, path: '/dashboard/setting' }
  ]

  const path = usePathname()

  return (
    <div className="h-screen p-5 relative shadow-sm border bg-background text-foreground">
      <div className="flex justify-center">
        <Image src="/logo.svg" alt="Logo" width={120} height={100} />
      </div>
      <hr className="my-6 border" />
      <div className="mt-3">
        {MenuList.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            className={`flex gap-2 mb-2 p-3 rounded-lg items-center
              hover:bg-violet-600 hover:text-white hover:transition-all scale-105 cursor-pointer
              ${path === menu.path ? 'bg-violet-600 text-white' : 'text-foreground'}`}
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </Link>
        ))}
      </div>
      <div className='absolute bottom-10 left-0 w-full'>
        <UsageTrack/>
      </div>
    </div>
  )
}

export default SideNav
