import { Button } from '@/components/ui/button';
import Container from '@/components/uiComponents/Container';
import { FileCheck, LogOut } from 'lucide-react';
import React from 'react';

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-secondary h-[80px]">
      <Container className="grid grid-cols-12 h-[80px]">
        <div className="col-span-6 sm:col-span-9 flex justify-center items-start flex-col">
          <h5>Time remaining</h5>
          <h3 className="text-4xl font-bold text-red-700">01:44</h3>
        </div>
        <div className="col-span-6 sm:col-span-3 flex justify-between items-center">
          {/* We'll remove the review button if not requred */}
          <Button className="w-1/2 mx-1" variant={'outline'}>
            <FileCheck />
            Review
          </Button>
          <Button className="w-1/2 mx-1">
            End <LogOut />
          </Button>
        </div>
      </Container>
    </footer>
  );
}
