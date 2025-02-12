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
import { redirect, useRouter } from 'next/navigation';
import {
  saveSetupCandidateData01,
  saveSetupCandidateData02,
  saveSetupCandidateData03,
  saveSetupCandidateData04,
} from '@/actions/candidateSetup';
import { isSetupComplete, resetSetup } from '@/actions/setup';

type Step = {
  id: string;
  title: string;
};

const steps: Step[] = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'education', title: 'Education' },
  { id: 'experience', title: 'Work Experience' },
  { id: 'skills', title: 'Skills' },
];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  company: string;
  jobTitle: string;
  workDuration: string;
  responsibilities: string;
  skills: string[];
  experience: string;
};

const CandidatesPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    degree: '',
    fieldOfStudy: '',
    graduationYear: '',
    company: '',
    jobTitle: '',
    workDuration: '',
    responsibilities: '',
    skills: [],
    experience: '1-2',
  });
  const router = useRouter();

  const saveFunctions = [
    saveSetupCandidateData01,
    saveSetupCandidateData02,
    saveSetupCandidateData03,
    saveSetupCandidateData04,
  ];

  const fetchSetup = async () => {
    const setupData = await isSetupComplete();
    const setup = setupData.data as {
      isProfileComplete: boolean;
      activePage: number;
      role: string;
    };

    if (setup.isProfileComplete) {
      return redirect('/setup/candidate/success');
    }

    if (!setup.isProfileComplete && setup.activePage === 0) {
      return redirect('/setup');
    }

    if (!setup.isProfileComplete && setup.role === 'COMPANY') {
      return redirect('/setup/company');
    }

    setCurrentStep(setup.activePage - 1);
  };

  useEffect(() => {
    fetchSetup();
  }, []);

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.fullName.trim() !== '' && formData.phone.trim() !== '';
      case 1:
        return (
          formData.degree.trim() !== '' &&
          formData.fieldOfStudy.trim() !== '' &&
          formData.graduationYear.trim() !== ''
        );
      case 3:
        return (
          formData.skills.length !== 0 && formData.experience.trim() !== ''
        );
      default:
        return false;
    }
  };

  const handleNextButton = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      await saveFunctions[currentStep](formData);
    }
  };

  const handlePrevButton = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipButton = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === steps.length - 1) {
      router.push(`/setup/candidate/success`);
    }
  };

  const handleBackButton = async () => {
    const respons = await resetSetup();
    if (respons.status === 200) {
      router.push(`/setup`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string, id: keyof FormData) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSetupCandidateData04(formData);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      let updatedSkills = [...prevData.skills];
      if (checked) {
        updatedSkills.push(value);
      } else {
        updatedSkills = updatedSkills.filter((skill) => skill !== value);
      }
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: value,
    }));
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Candidate Profile</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Rama Chandra"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rama@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9412345678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="degree">Highest Degree</Label>
                  <Select
                    value={formData.degree}
                    onValueChange={(value) =>
                      handleSelectChange(value, 'degree')
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your highest degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                      <SelectItem value="ASSOCIATE">Associate</SelectItem>
                      <SelectItem value="BACHELOR">Bachelor</SelectItem>
                      <SelectItem value="MASTER">Master</SelectItem>
                      <SelectItem value="DOCTORATE">Doctorate</SelectItem>
                      <SelectItem value="POST_DOCTORATE">
                        Post Doctorate
                      </SelectItem>
                      <SelectItem value="DIPLOMA">Diploma</SelectItem>
                      <SelectItem value="CERTIFICATE">Certificate</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="major">Field of Study</Label>
                  <Input
                    id="fieldOfStudy"
                    placeholder="e.g., Computer Science"
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    placeholder="YYYY"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">Most Recent Company</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Software Engineer"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="workDuration">Duration</Label>
                  <Input
                    id="workDuration"
                    placeholder="e.g., 2 years"
                    value={formData.workDuration}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="responsibilities">Key Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="Describe your main duties and achievements"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Top Skills (Select up to 5)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'JavaScript',
                      'React',
                      'Node.js',
                      'Python',
                      'Java',
                      'Go',
                      'C++',
                      'AWS',
                      'Docker',
                      'AI/ML',
                    ].map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          value={skill}
                          checked={formData.skills.includes(skill)}
                          onChange={handleCheckboxChange}
                          required
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <RadioGroup
                    value={formData.experience}
                    onValueChange={handleRadioChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0-1" id="exp-0-1" />
                      <Label htmlFor="exp-0-1">0-1 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2" id="exp-1-2" />
                      <Label htmlFor="exp-1-2">1-2 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3-5" id="exp-3-5" />
                      <Label htmlFor="exp-3-5">3-5 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5+" id="exp-5+" />
                      <Label htmlFor="exp-5+">5+ years</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 0 ? (
              <Button onClick={handlePrevButton}>Previous</Button>
            ) : (
              <Button onClick={handleBackButton}>Back</Button>
            )}

            <div className="flex justify-center items-center gap-x-6">
              {currentStep === 2 && (
                <div
                  className="underline text-sm font-semibold hover:cursor-pointer"
                  onClick={handleSkipButton}
                >
                  Skip
                </div>
              )}
              <Button
                onClick={
                  currentStep === steps.length - 1
                    ? handleSubmit
                    : handleNextButton
                }
                disabled={!isStepComplete(currentStep)}
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CandidatesPage;
