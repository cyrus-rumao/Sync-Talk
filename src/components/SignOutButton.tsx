'use client';
import React, { useState } from 'react';
import { Ghost, LogOut } from 'lucide-react';
import Link from 'next/link';
import Button from './ui/Button';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
const SignOutButton = () => {	
	const [signingOut, setSigningOut] = useState<boolean>(false);
	return (
		<div>
			<Button variant="ghost">
				<LogOut
					onClick={async () => {
            setSigningOut(true);
						try {
							await signOut();
						} catch (error) {
							toast.error('Error signing out');
							// setSigningOut(false);
						} finally {
							setSigningOut(false);
							// toast.error('Something went Wrong');
						}
					}}
        />
        
			</Button>
		</div>
	);
};

export default SignOutButton;
