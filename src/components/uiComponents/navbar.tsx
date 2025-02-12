import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import SideNav from './sideNav';
import Container from './Container';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/Logo.svg';

type Props = {};

export default function Navbar({}: Props) {
  return (
    <header className="h-[80px] shadow-md">
      <Container className="grid grid-cols-12 h-full">
        <div className="col-span-3 sm:col-span-1 flex items-center justify-start">
          <div className="size-3/4">
            <Image
              src={Logo}
              alt="Logo"
              className="size-full"
              height={40}
              width={120}
            />
          </div>
        </div>

        <div className="col-span-6 sm:col-span-10 flex justify-center items-center">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={'/'} className={cn(navigationMenuTriggerStyle())}>
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href={'/jobs'}
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Jobs
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href={'/credentia-testing/instructions/1'}
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Test
                </Link>
              </NavigationMenuItem>

              {/* We'll remove these drop down if not needed */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Dropdown</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="col-span-3 sm:col-span-1 flex items-center justify-end">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SideNav />
        </div>
      </Container>
    </header>
  );
}
