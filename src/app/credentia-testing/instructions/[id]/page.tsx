import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MousePointer } from 'lucide-react';
import Logo from '../../../../../public/Logo.svg';
import Container from '@/components/uiComponents/Container';

const instructions = {
  1: {
    title: 'Instructions',
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          This tutorial provides a series of screens that orient you to the
          computer testing environment. This will give you an opportunity to try
          each feature before using it in questions that will be scored.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A similar display will appear during the actual exam. In the upper
          left corner is a box that shows where you are in the series of
          questions (or in this case, screens of the tutorial). Other screen
          features are described later in the tutorial.
        </p>
      </>
    ),
  },
  2: {
    title: 'Using the mouse',
    content: (
      <>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="border p-4">
              <MousePointer />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The mouse pointer moves when you move the mouse around on a
              surface. Although it can assume different shapes, the arrow shown
              at left is common. To point with the mouse, move the pointer until
              it rests on the desired object. To click something, point to it
              and then press and quickly release the left mouse button.
            </p>
          </div>
          <div className="mt-6">
            <p className="font-medium mb-4">Practice:</p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>
                Rest your hand lightly on the mouse and move it. Note how the
                pointer moves as your hand does.
              </li>
              <li>
                Point to the correct answer (A) on the sample question below and
                click. Notice that the open circle next to the answer you chose
                is now filled in.
              </li>
            </ol>
          </div>
          <div className="mt-6">
            <p className="font-medium mb-4">Sample Question</p>
            <RadioGroup defaultValue="a">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a" id="a" />
                <Label htmlFor="a">A. Correct answer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b" id="b" />
                <Label htmlFor="b">B. Incorrect answer</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </>
    ),
  },
  3: {
    title: 'Navigating through the exam',
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-6">
          You can use the mouse to move through the exam one question at a time.
          Buttons appear at the top of the screen.
        </p>
        <div className="space-y-4">
          <div>
            <p className="mb-2">To move backwards</p>
            <p className="text-muted-foreground">Click the Previous button</p>
          </div>
          <div>
            <p className="mb-2">To move forwards</p>
            <p className="text-muted-foreground">Click the Next button</p>
          </div>
        </div>
      </>
    ),
  },
  4: {
    title: 'Marking questions for later review',
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Your score is determined by the number of questions you answer
          correctly. Therefore it is to your advantage to answer every question.
          If you are unsure of your answer, you can mark the question to review
          if time permits.
        </p>
        <div className="space-y-4">
          <div>
            <p className="mb-2">To mark a question</p>
            <div className="flex items-center space-x-2">
              <Checkbox id="mark" />
              <Label htmlFor="mark">
                Click the checkbox to mark the question.
              </Label>
            </div>
          </div>
          <div>
            <p className="mb-2">To unmark a question</p>
            <div className="flex items-center space-x-2">
              <Checkbox id="unmark" />
              <Label htmlFor="unmark">
                Click the checkbox to unmark the question.
              </Label>
            </div>
          </div>
        </div>
      </>
    ),
  },
  5: {
    title: 'Reviewing items',
    content: (
      <>
        <div className="space-y-6">
          <div>
            <p className="mb-2">To review questions</p>
            <p className="text-muted-foreground">
              Click on the{' '}
              <Button variant="secondary" size="sm">
                Review
              </Button>{' '}
              button. Once you click this button, you'll be taken to a page
              where you can view your questions. To make it easier to find
              specific questions, you can use the boxes with icons for
              filtering.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="mb-2">To review marked questions</p>
              <p className="text-muted-foreground">
                Click on the box displaying icon ⭐. This will show you all the
                questions that you have marked for review.
              </p>
            </div>
            <div>
              <p className="mb-2">To review incomplete questions</p>
              <p className="text-muted-foreground">
                Click on the box displaying icon ❌. This will show you all the
                questions that you have not answered.
              </p>
            </div>
            <div>
              <p className="mb-2">To review complete questions</p>
              <p className="text-muted-foreground">
                Click on the box displaying icon ✓. This will show you all the
                questions that you have answered.
              </p>
            </div>
            <div>
              <p className="mb-2">To review all questions</p>
              <p className="text-muted-foreground">
                Click on the box displaying icon 📋. This will show you all the
                questions.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  6: {
    title: 'END OF INSTRUCTIONS',
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          This concludes the tutorial.
        </p>
        <p className="text-muted-foreground mb-6">
          Good luck with the examination.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="confirm" />
            <Label htmlFor="confirm">
              Please confirm you have read the instructions
            </Label>
          </div>
          <div>
            <Link href={'/credentia-testing/test'} className="my-4">
              <Button className="bg-green-600 hover:bg-green-700">Start</Button>
            </Link>
          </div>
        </div>
      </>
    ),
  },
};

export default function InstructionPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const instruction = instructions[id as keyof typeof instructions];
  const prevId = id > 1 ? id - 1 : null;
  const nextId = id < 6 ? id + 1 : null;

  return (
    <main className="min-h-screen bg-background">
      {/* Header with SAS logo */}
      <header className="shadow-md h-[80px]">
        <Container className="h-full ">
          <div className=" h-full flex items-center justify-start">
            <Image
              src={Logo}
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </Container>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Instruction number */}
          <h1 className="text-xl font-semibold mb-6">Instruction {id}</h1>

          {/* Instructions content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold">{instruction.title}</h2>
            {instruction.content}
            <p className="font-medium mt-6">
              Click on the 'Next' button to continue.
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-end space-x-4">
            {prevId && (
              <Link href={`/credentia-testing/instructions/${prevId}`}>
                <Button variant="outline">Previous</Button>
              </Link>
            )}
            {nextId && (
              <Link href={`/credentia-testing/instructions/${nextId}`}>
                <Button>Next</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
