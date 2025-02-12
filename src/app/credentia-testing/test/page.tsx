import React from 'react';
import Header from '../(components)/header';
import QuestionSection from '../(components)/question';
import Footer from '../(components)/footer';

type Props = {};

export default function Test({}: Props) {
  return (
    <div>
      <Header />
      <QuestionSection />
      <Footer />
    </div>
  );
}
