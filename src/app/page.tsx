import React from 'react'
import { db } from '@/lib/db'
import Button from '@/components/ui/Button'
import { Ghost } from 'lucide-react'
const page = async() => {
  // await db.set('some-key', 'this-key')
  return (
    <Button variant={'ghost'} size='sm'>
      Click me
    </Button>
  )
}

export default page
