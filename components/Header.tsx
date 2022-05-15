/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className='flex items-center justify-between p-5 max-w-7xl mx-auto'>
            <div className='flex items-center space-x-5'>
                <Link href="/" passHref>
                    <img
                        src='https://links.papareact.com/yvf'
                        alt='medium'
                        className='w-44 object-contain cursor-pointer'
                    />
                </Link>
                <div className='hidden md:inline-flex items-center space-x-3'>
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className='bg-green-600 px-3 py-1 rounded-full text-white'>Follow</h3>
                </div>
            </div>
            <div className='flex items-center space-x-3 text-green-600'>
                <h3>Sign In</h3>
                <h3 className='border px-4 py-1 rounded-full border-green-400'>Get Started</h3>
            </div>
        </header>
    )
}

export default Header