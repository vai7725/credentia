'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Building2, Clock, Banknote, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [salaryRange, setSalaryRange] = useState([0]);
  const router = useRouter();

  const jobs = [
    {
      id: 'data-science',
      title: 'Get hired for Data Science',
      company: 'Top Companies',
      promoted: true,
      description: 'Online course with guaranteed placement',
      stipend: '₹40,000 total stipend',
      companies:
        'Top companies hiring like FedEx, Delhivery, PhonePe, and many',
      cta: 'Apply now',
    },
    {
      id: 'english-teacher',
      title: 'English Teacher - WFH (Urgent Hiring)',
      company: 'PlanetSpark',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=64&h=64&fit=crop',
      isActive: true,
      workType: 'Work from home',
      duration: '1 year(s)',
      salary: '₹2,50,000 - 4,50,000',
      posted: '1 day ago',
      type: 'Part time',
    },
    {
      id: 'video-editor',
      title: 'Video Editor (Graphic Designing Skills)',
      company: 'Musk Deer',
      logo: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=64&h=64&fit=crop',
      isActive: true,
      workType: 'Work from home',
      duration: '1 year(s)',
      salary: '₹2,00,000',
      posted: '2 weeks ago',
    },
  ];

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">934 Work From Home Jobs</h1>
        <p className="text-muted-foreground mb-8">
          Latest Online Work From Home (WFH)/ Remote Jobs in India
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" />
                <h2 className="font-semibold">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Profile</Label>
                  <Input placeholder="e.g. Marketing" className="mt-1" />
                </div>

                <div>
                  <Label>Location</Label>
                  <Input placeholder="e.g. Delhi" className="mt-1" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="city" />
                    <label htmlFor="city" className="text-sm">
                      Jobs in my city
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="wfh" defaultChecked />
                    <label htmlFor="wfh" className="text-sm">
                      Work from home
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="parttime" />
                    <label htmlFor="parttime" className="text-sm">
                      Part-time
                    </label>
                  </div>
                </div>

                <div>
                  <Label>Annual salary (in lakhs)</Label>
                  <Slider
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    className="mt-2"
                    onValueChange={setSalaryRange}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-muted-foreground">0</span>
                    <span className="text-sm text-muted-foreground">10</span>
                  </div>
                </div>

                <div>
                  <Label>Years of experience</Label>
                  <Input
                    placeholder="Select years of experience"
                    className="mt-1"
                  />
                </div>

                <Button variant="link" className="p-0">
                  Clear all
                </Button>

                <div className="text-center text-muted-foreground my-4">OR</div>

                <Button className="w-full">Search</Button>
              </div>
            </Card>
          </div>

          {/* Jobs List Section */}
          <div className="md:col-span-3 space-y-4">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleJobClick(job.id)}
              >
                {job.promoted ? (
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {job.title}
                        <Badge variant="secondary">Promoted</Badge>
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {job.description}
                      </p>
                    </div>
                    <Button variant="secondary">{job.cta} →</Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      {job.logo && (
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-12 h-12 rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-muted-foreground">
                            {job.company}
                          </span>
                          {job.isActive && (
                            <Badge variant="secondary">Actively hiring</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!job.promoted && (
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {job.workType}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {job.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {job.posted} {job.type && `• ${job.type}`}
                    </div>
                  </div>
                )}

                {job.promoted && (
                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Banknote className="w-4 h-4" />
                      Get confirmed {job.stipend}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      {job.companies}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
