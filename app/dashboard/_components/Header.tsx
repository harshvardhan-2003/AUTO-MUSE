import { Button } from '@/components/ui/button'
import { Link, Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-background text-foreground'>
        <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-background'>
            <Search/>
            <input type='text' placeholder='Search' className='outline-none'/>
        </div>
        <div>
           <Link href='/dashboard/billing'>
           <Button className='bg-violet-600 p-2 rounded-full text-xs cursor-pointer text-white px-2'>Join Membership at just 199/-</Button>
           </Link>
            
        </div>
    </div>
  )
}

export default Header