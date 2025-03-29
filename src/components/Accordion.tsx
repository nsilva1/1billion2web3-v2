'use client';

import React, { useState, useEffect } from 'react';
import { SiGoogleclassroom } from 'react-icons/si';
import { MdQuestionAnswer, MdLock } from 'react-icons/md';
import Link from 'next/link';

interface ModuleAccordionContent {
  metaverseLink: string;
  path: string;
}

export interface IModuleListAccordion {
  id: number;
  title: string;
  content: ModuleAccordionContent;
}

export interface ModuleAccordionProps {
  items: Array<IModuleListAccordion>;
  moduleNumber: number;
}

const Accordion = ({ items, moduleNumber }: ModuleAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [metaProgress, setMetaProgress] = useState<boolean[]>([]);
  const [classProgress, setClassProgress] = useState<boolean[]>([]);

  useEffect(() => {
    const initialMetaProgress = items.map((_, index) => index < moduleNumber);
    const initialClassProgress = items.map(() => false);

    setMetaProgress(initialMetaProgress);
    setClassProgress(initialClassProgress);
  }, [moduleNumber]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const openMetaverse = (index: number, link: string) => {
    setClassProgress((prev) => {
      const newProgress = [...prev];
      newProgress[index] = true;
      return newProgress;
    });

    if (index + 1 < items.length) {
      setMetaProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index + 1] = true;
        return newProgress;
      });
    }

    window.open(link, '_blank');
  };

  return (
    <div className='w-full'>
      {items.map((item, index) => (
        <div key={index} className='mb-2 border border-gray-300 rounded'>
          <button
            className={`flex justify-between w-full p-4 text-left focus:outline-none ${
              openIndex === index ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <span
              className={`${index < moduleNumber ? 'text-green-500' : 'text-red-500'} font-medium`}
            >
              {item.title}
            </span>
            {
              index < moduleNumber ? (
                <svg
              className={`w-6 h-6 transition-transform transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
              ) : (<MdLock />)
            }
          </button>
          <div
            className={`overflow-hidden transition-max-h duration-300 ease-in-out ${
              openIndex === index ? 'max-h-screen p-4' : 'max-h-0'
            }`}
          >
            <div className='p-4'>
              <div className='collapse-content bg-white'>
                <ul>
                  <li
                    className={`m-2 rounded-lg p-2 hover:bg-base-300 flex justify-between ${
                      metaProgress[index]
                        ? 'cursor-pointer'
                        : 'opacity-70 cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                      if (metaProgress[index]) {
                        openMetaverse(index, item.content.metaverseLink);
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    <p
                      className={`font-semibold flex items-center gap-4 ${
                        metaProgress[index]
                          ? 'cursor-pointer'
                          : 'opacity-70 cursor-not-allowed'
                      }`}
                    >
                      Take Metaverse Class <SiGoogleclassroom />
                    </p>
                  </li>
                  <li
                    className={`m-2 rounded-lg p-2 hover:bg-base-300 flex justify-between ${
                      classProgress[index]
                        ? 'cursor-pointer'
                        : 'opacity-70 cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                      if (!classProgress[index]) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Link
                      className={`font-semibold flex items-center gap-4 ${
                        classProgress[index]
                          ? 'cursor-pointer'
                          : 'opacity-70 pointer-events-none'
                      }`}
                      href={item.content.path}
                    >
                      Take Module Quiz <MdQuestionAnswer />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
