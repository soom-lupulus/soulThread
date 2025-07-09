'use client'
import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import ProfileDialog from './profiledialog/ProfileDialog'
import { useAccount } from 'wagmi';

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const { address, isConnected, isConnecting, isDisconnected, status } = useAccount();

  return (
    <div className='flex'>
      <ConnectButton />
      {
        isConnected && <Button className="bg-amber-600 hover:bg-amber-700 ml-auto" onClick={() => setOpen(true)}>个人信息</Button>
      }
      <ProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default NavBar