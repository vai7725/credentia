'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  saveSetupCompanyData01,
  saveSetupCompanyData02,
  saveSetupCompanyData03,
  saveSetupCompanyData04,
} from '@/actions/companySetup';
import { isSetupComplete, resetSetup } from '@/actions/setup';

const steps = [
  { id: 'basic-info', title: 'Basic Information' },
  { id: 'company-details', title: 'Company Details' },
  { id: 'contact-info', title: 'Contact Information' },
  { id: 'additional-info', title: 'Additional Information' },
];

const CompanyPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    foundedYear: '',
    companyDescription: '',
    address: '',
    city: '',
    country: '',
    website: '',
    contactEmail: '',
    phoneNumber: '',
    linkedIn: '',
    missionStatement: '',
    coreValues: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const saveFunctions = [
    saveSetupCompanyData01,
    saveSetupCompanyData02,
    saveSetupCompanyData03,
    saveSetupCompanyData04,
  ];

  const fetchSetup = async () => {
    const setupData = await isSetupComplete();
    const setup = setupData.data as {
      isProfileComplete: boolean;
      activePage: number;
      role: string;
    };

    if (setup.isProfileComplete) {
      return redirect('/dashboard');
    }

    if (!setup.isProfileComplete && setup.activePage === 0) {
      return redirect('/setup');
    }

    if (!setup.isProfileComplete && setup.role === 'CANDIDATE') {
      return redirect('/setup/candidate');
    }

    setCurrentStep(setup.activePage - 1);
  };

  useEffect(() => {
    fetchSetup();
  }, []);

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return (
          formData.companyName.trim() !== '' &&
          formData.industry.trim() !== '' &&
          formData.companySize.trim() !== ''
        );
      case 1:
        return (
          formData.foundedYear.trim() !== '' &&
          formData.companyDescription.trim() !== ''
        );
      case 2:
        return (
          formData.address.trim() !== '' &&
          formData.city.trim() !== '' &&
          formData.country.trim() !== '' &&
          formData.website.trim() !== '' &&
          formData.contactEmail.trim() !== '' &&
          formData.phoneNumber.trim() !== ''
        );
      case 3:
        return (
          formData.linkedIn.trim() !== '' &&
          formData.missionStatement.trim() !== '' &&
          formData.coreValues.trim() !== ''
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

  const handleBackButton = async () => {
    const respons = await resetSetup();
    if (respons.status === 200) {
      router.push(`/setup`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSetupCompanyData04(formData);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {currentStep === 0 && (
              <>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="One97 Communications"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('industry', value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOFTWARE_DEVELOPMENT">
                        Software Development
                      </SelectItem>
                      <SelectItem value="IT_SERVICES">
                        Information Technology (IT) Services
                      </SelectItem>
                      <SelectItem value="AI_ML">
                        Artificial Intelligence (AI) & Machine Learning (ML)
                      </SelectItem>
                      <SelectItem value="CLOUD_COMPUTING_DEVOPS">
                        Cloud Computing & DevOps
                      </SelectItem>
                      <SelectItem value="CYBERSECURITY">
                        Cybersecurity
                      </SelectItem>
                      <SelectItem value="DATA_SCIENCE_ANALYTICS">
                        Data Science & Analytics
                      </SelectItem>
                      <SelectItem value="MOBILE_APP_DEVELOPMENT">
                        Mobile App Development
                      </SelectItem>
                      <SelectItem value="WEB_DEVELOPMENT">
                        Web Development
                      </SelectItem>
                      <SelectItem value="ECOMMERCE_RETAIL_TECH">
                        E-commerce & Retail Tech
                      </SelectItem>
                      <SelectItem value="FINTECH">
                        Fintech (Financial Technology)
                      </SelectItem>
                      <SelectItem value="HEALTHTECH">
                        Healthtech (Health Technology)
                      </SelectItem>
                      <SelectItem value="EDTECH">
                        Edtech (Education Technology)
                      </SelectItem>
                      <SelectItem value="GAMING_ENTERTAINMENT">
                        Gaming & Entertainment
                      </SelectItem>
                      <SelectItem value="IOT">
                        Internet of Things (IoT)
                      </SelectItem>
                      <SelectItem value="BLOCKCHAIN_CRYPTOCURRENCY">
                        Blockchain & Cryptocurrency
                      </SelectItem>
                      <SelectItem value="AR_VR">
                        Augmented Reality (AR) & Virtual Reality (VR)
                      </SelectItem>
                      <SelectItem value="AUTOMOTIVE_AUTONOMOUS_VEHICLES">
                        Automotive & Autonomous Vehicles
                      </SelectItem>
                      <SelectItem value="AEROSPACE_DEFENSE">
                        Aerospace & Defense
                      </SelectItem>
                      <SelectItem value="TELECOMMUNICATIONS">
                        Telecommunications
                      </SelectItem>
                      <SelectItem value="ENTERPRISE_SOFTWARE">
                        Enterprise Software (ERP, CRM, etc.)
                      </SelectItem>
                      <SelectItem value="OPEN_SOURCE_DEVELOPER_TOOLS">
                        Open Source & Developer Tools
                      </SelectItem>
                      <SelectItem value="CONSULTING_PROFESSIONAL_SERVICES">
                        Consulting & Professional Services
                      </SelectItem>
                      <SelectItem value="STARTUPS_INCUBATORS">
                        Startups & Incubators
                      </SelectItem>
                      <SelectItem value="GOVERNMENT_PUBLIC_SECTOR">
                        Government & Public Sector
                      </SelectItem>
                      <SelectItem value="NONPROFIT_SOCIAL_IMPACT">
                        Nonprofit & Social Impact
                      </SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('companySize', value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            {currentStep === 1 && (
              <>
                <div>
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleInputChange}
                    placeholder="e.g., 2010"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyDescription">
                    Company Description
                  </Label>
                  <Textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    placeholder="Tell us about your company..."
                    required
                  />
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Delhi"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="India"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="contact@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+91 987654321"
                    required
                  />
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div>
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    placeholder="https://www.linkedin.com/company/example"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea
                    id="missionStatement"
                    name="missionStatement"
                    value={formData.missionStatement}
                    onChange={handleInputChange}
                    placeholder="Our mission is to..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="coreValues">Core Values</Label>
                  <Textarea
                    id="coreValues"
                    name="coreValues"
                    value={formData.coreValues}
                    onChange={handleInputChange}
                    placeholder="Our core values include..."
                    required
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 0 ? (
              <Button onClick={handlePrevButton}>Previous</Button>
            ) : (
              <Button onClick={handleBackButton}>Back</Button>
            )}

            <div className="flex justify-center items-center gap-x-6">
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

export default CompanyPage;
