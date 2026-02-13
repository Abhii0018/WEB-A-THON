import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { DecayCard } from '../';
import cleanImage from '../../assets/clean1.jpeg';
import timeImage from '../../assets/time.jpeg';
import autoTimeImage from '../../assets/autotime.jpeg';
import behaviourImage from '../../assets/behaviour.jpeg';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Animate main heading with character stagger
    if (headingRef.current) {
      const text = headingRef.current.textContent;
      headingRef.current.innerHTML = '';
      
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char-split';
        headingRef.current.appendChild(span);
      });

      gsap.from('.char-split', {
        duration: 0.8,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
        ease: 'back.out'
      });
    }

    // Animate subtitle
    if (subHeadingRef.current) {
      gsap.from(subHeadingRef.current, {
        duration: 0.8,
        y: 50,
        autoAlpha: 0,
        delay: 0.3,
        ease: 'back.out'
      });
    }

    if (cardsRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            duration: 0.7,
            y: 0,
            opacity: 1,
            stagger: 0.12,
            delay: 0.4,
            ease: 'power3.out',
            clearProps: 'opacity,transform'
          }
        );
      }, cardsRef);
      return () => ctx.revert();
    }

    // Keep paragraph and buttons visible without animation
  }, []);

  return (
    <div id="categories" className="text-center mb-16 scroll-mt-28">
      <h1 ref={headingRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-700 mb-6 leading-tight inline-block">
        Book Trusted Help
        <br />
        <span ref={subHeadingRef} className="text-gray-600">for Home Tasks</span>
      </h1>
      <p ref={paragraphRef} className="text-xl text-gray-500 mb-8">
        Post any task. Pick the best person. Get it done.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="#services"
          className="bg-green-300 hover:bg-green-400 text-gray-800 px-8 py-3.5 rounded-full font-medium transition-colors"
        >
          Service Categories
        </a>
        <a
          href="#contact"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3.5 rounded-full font-medium transition-colors"
        >
          Instant Booking
        </a>
      </div>

      <div
        ref={cardsRef}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
      >
        <DecayCard width={260} height={340} image={timeImage}>
          15-Minute Arrival
        </DecayCard>
        <DecayCard width={260} height={340} image={behaviourImage}>
          Behaviour
        </DecayCard>
        <DecayCard width={260} height={340} image={autoTimeImage}>
          Live ETA Tracking
        </DecayCard>
        <DecayCard width={260} height={340} image={cleanImage}>
          Verified Professionals
        </DecayCard>
      </div>
    </div>
  );
};

export default Hero;
