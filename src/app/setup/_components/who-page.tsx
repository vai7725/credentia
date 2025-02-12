'use client';
import { onSaveWhoData } from '@/actions/setup';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WhoPage = () => {
  const router = useRouter();

  const handleSelection = async (type: 'company' | 'candidate') => {
    await onSaveWhoData(type.toUpperCase());
    router.push(`/setup/${type}`);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] gap-x-10">
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow w-[350px]"
        onClick={() => handleSelection('company')}
      >
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2" />
            Companies
          </CardTitle>
          <CardDescription>Find great talent for your company</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Explore Talent</Button>
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow w-[350px]"
        onClick={() => handleSelection('candidate')}
      >
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2" />
            Candidates
          </CardTitle>
          <CardDescription>Find your next job opportunity</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Start Applying</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoPage;
