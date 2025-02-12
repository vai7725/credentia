import Container from '@/components/uiComponents/Container';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {};

export default function QuestionSection({}: Props) {
  return (
    <section className="py-8 min-h-[calc(100vh-160px)]">
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>
              Question - For SVM in model studio, currently tasks are present
              only for predictive models
            </CardTitle>

            {/* Make card description visible if any specific requirement according to question */}
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">
                  Classification for binary target only
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Regression only</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-three" id="option-three" />
                <Label htmlFor="option-three">
                  Classification of nominal only
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-four" id="option-four" />
                <Label htmlFor="option-four">
                  Classification of regression only
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
