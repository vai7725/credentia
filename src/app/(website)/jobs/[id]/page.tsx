'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Clock,
  Banknote,
  Calendar,
  ArrowLeft,
  Bookmark,
  Share2,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JobDetails({ params }: { params: { id: string } }) {
  const router = useRouter();

  // In a real app, fetch job details using the ID
  const job = {
    title: 'English Teacher - WFH (Urgent Hiring)',
    subtitle: 'Job (Part time/Remote)',
    company: 'PlanetSpark',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=64&h=64&fit=crop',
    isActive: true,
    workType: 'Work from home',
    startDate: 'Immediately',
    salary: '₹2,50,000 - 4,50,000',
    duration: '1 year(s)',
    applyBy: '12 Mar 25',
    posted: 'Posted 1 day ago',
    type: 'Part time',
    applicants: 102,
    aboutJob: `PlanetSpark empowers kids to become fearless speakers and creative writers through engaging, one-on-one live online classes. Operating in 11+ countries, we help children master public speaking and writing skills through an interactive curriculum led by top-tier educators like YB of educators.

Our curriculum approach includes debates, YouTube video creation, podcasts, stand-up comedy, and storytelling turning students into articulate, self-assured communicators. Backed by Rising Series-A funding and experiencing 30% monthly growth, PlanetSpark is rapidly emerging as a global leader in communication skills for young learners. With a presence in India, the Middle East, North America, and Australia, our team of 500+ professionals and 400+ expert educators is shaping the next generation of confident speakers.`,
    keyResponsibilities: [
      'Lead Engaging Class Sessions - Conduct fresh trial classes that motivate and inspire young learners',
      'Make Learning Fun & Interactive - Foster an enjoyable and engaging classroom experience while building strong trust with parents',
      'Deliver Live Online Classes - Help students refine their speaking, storytelling, and communication skills through personalized lessons',
      "Provide Constructive Feedback - Offer insightful guidance to boost students' confidence and skills",
      'Plan & Seamlessly Sessions - Manage schedules efficiently and deliver consistently high-quality learning experiences',
    ],
    skillsRequired: [
      'American English',
      'British English',
      'Effective Communication',
      'English Proficiency (Spoken)',
      'Online Teaching',
      'Teaching',
    ],
    certifications: ['Learn Business Communication', 'Learn Creative Writing'],
    eligibility: [
      'Candidates with minimum 1 years of experience.',
      'Your resume has 5 mos of experience which is less than minimum required experience. Add more experience to make your application stronger. Add experience',
    ],
    salary_: {
      text: 'Annual CTC ₹2,50,000 - 4,50,000/year',
    },
    openings: 20,
    aboutCompany: `PlanetSpark is on its journey to becoming the global leader in the live and untapped communication skills segment. We are a Series-A startup funded by some top VCs and are on a 30% month-on-month growth curve. We have our footprint in India, the Middle East, North America, and Australia. Come join a passionate team of 500 young and energetic members and 400+ expert and handpicked teachers on this roller coaster ride to build the most loved brand for kids who will move the world.`,
    activity: {
      since: 'November 2023',
      opportunities: 264,
      hired: 21,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">
            {job.title} {job.subtitle}
          </h1>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    {job.title}
                    {job.isActive && (
                      <Badge variant="secondary">Actively hiring</Badge>
                    )}
                  </h2>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">START DATE</p>
                <p className="font-medium">{job.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  CTC (ANNUAL)
                </p>
                <p className="font-medium">{job.salary}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">EXPERIENCE</p>
                <p className="font-medium">{job.duration}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">APPLY BY</p>
                <p className="font-medium">{job.applyBy}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <Badge variant="outline">{job.posted}</Badge>
              <Badge variant="outline">{job.type}</Badge>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {job.applicants} applicants
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About the job</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {job.aboutJob}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Key Responsibilities
                </h3>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                  {job.keyResponsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Skill(s) required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Earn certifications in these skills
                </h3>
                <div className="flex gap-4">
                  {job.certifications.map((cert, index) => (
                    <Button
                      key={index}
                      variant="link"
                      className="p-0 h-auto text-primary"
                    >
                      {cert}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Who can apply</h3>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                  {job.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Salary</h3>
                <p className="text-muted-foreground">{job.salary_.text}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Number of openings
                </h3>
                <p className="text-muted-foreground">{job.openings}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  About {job.company}
                </h3>
                <p className="text-muted-foreground">{job.aboutCompany}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Activity on Internshala
                </h3>
                <div className="text-muted-foreground">
                  <p>Hiring since {job.activity.since}</p>
                  <p>{job.activity.opportunities} opportunities posted</p>
                  <p>{job.activity.hired} candidates hired</p>
                </div>
              </div>

              <Button className="w-full">Apply now</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
