import { Button } from '@/components/ui/button';
import Container from '@/components/uiComponents/Container';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="shadow-md">
      <Container className="grid grid-cols-12 h-[80px]">
        <div className="col-span-6 sm:col-span-9 flex justify-center items-start flex-col">
          <div>Test title</div>
          <div>Question 1/30</div>
        </div>
        <div className="col-span-6 sm:col-span-3 flex justify-between items-center">
          <Button className="w-1/2 mx-1">
            <ArrowLeft />
            Previous
          </Button>
          <Button className="w-1/2 mx-1">
            Next <ArrowRight />
          </Button>
        </div>
      </Container>
    </header>
  );
}
