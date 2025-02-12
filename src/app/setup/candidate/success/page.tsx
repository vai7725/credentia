'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

type Props = {};

export default function SetupSuccess({}: Props) {
  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile completed</CardTitle>
          <CardDescription>
            To start applying for jobs you've to verify your skills by giving
            test
          </CardDescription>

          <CardFooter className=" flex items-center justify-around p-0">
            <Link className="w-1/2" href={'/dashboard'}>
              <Button variant="outline" className="w-full">
                Later
              </Button>
            </Link>

            <Link href={'/credentia-testing/instructions'} className="w-1/2">
              <Button className="w-full">Give test now</Button>
            </Link>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
