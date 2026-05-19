'use client';

import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { Card, CardContent } from '@/components/ui/card';

const techStack = [
  { name: 'Next.js 16', category: 'Frontend Framework' },
  { name: 'React 19', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS v4', category: 'Styling' },
  { name: 'shadcn/ui', category: 'Components' },
  { name: 'Zustand', category: 'State Management' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Express.js', category: 'Backend Framework' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Mongoose', category: 'ODM' },
  { name: 'JWT', category: 'Authentication' },
  { name: 'Zod', category: 'Validation' },
  { name: 'Framer Motion', category: 'Animations' },
  { name: 'Recharts', category: 'Charts' },
  { name: 'Docker', category: 'Containerization' },
  { name: 'Axios', category: 'HTTP Client' },
];

export function TechStackSection() {
  return (
    <section className="px-4 py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimate direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Built With{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Modern Tech
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Full MERN stack with TypeScript throughout. No compromises on type safety or developer experience.
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={0.2} direction="up">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {techStack.map((tech) => (
              <Card key={tech.name} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <p className="text-xs font-semibold">{tech.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
