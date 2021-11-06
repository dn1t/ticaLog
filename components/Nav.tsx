import React from 'react';
import Image from 'next/image';
import logo from '../assets/logo.png';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='py-5 sticky top-0 bg-white z-10'>
      <Link href='/'>
        <a>
          <Image src={logo} height={32} width={32} alt='tica' />
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
