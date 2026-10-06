'use client';

import { useState } from 'react';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';
import { CAREER_POSITIONS, CAREERS_CONTACT, JobPosition } from '@/data/aboutData';

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState('');

  const departments = [
    'All',
    'Design',
    'Technology',
    'Marketing',
    'E-commerce',
    'Product',
    'Operations',
    'Customer Experience',
    'Content',
    'Photography',
  ];

  const filteredPositions = CAREER_POSITIONS.filter((job) =>
    selectedDept === 'All' ? true : job.department === selectedDept
  );

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicantEmail) {
      setApplicationSubmitted(true);
    }
  };

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      {/* Hero Banner */}
      <section className="w-full bg-surface-container-low border-b border-surface-container-high py-space-xl">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-sm">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Careers</span>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            JOIN THE ATELIER
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-primary font-medium">
            Work With VĀNYA
          </h1>
          <p className="font-editorial-serif text-base text-on-surface-variant max-w-2xl mt-2">
            Join a growing team shaping the future of beauty, fragrance and modern rituals.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <AboutNav />

      {/* Section 1: Why VANYA */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-center">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] bg-surface-container overflow-hidden border border-surface-container-high shadow-md">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                alt="Working with VANYA"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7 md:pl-space-lg">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              OUR WORK CULTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium mb-3">
              1. Why VĀNYA
            </h2>
            <p className="font-editorial-serif text-base text-on-surface-variant leading-relaxed mb-4">
              At VĀNYA, we foster an environment of creative autonomy, meticulous attention to detail, and deep respect for craftsmanship. Whether developing a new formulation, designing digital brand experiences, or curating customer rituals, every team member contributes to building a timeless luxury brand.
            </p>
            <p className="font-editorial-serif text-base text-on-surface-variant leading-relaxed">
              We value curiosity, thoughtful design thinking, and a dedication to quality over velocity.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Areas of Opportunity */}
      <section className="w-full bg-surface-container-low border-y border-surface-container-high py-space-2xl mb-space-3xl">
        <div className="max-w-5xl mx-auto px-margin lg:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              TEAM DOMAINS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
              2. Areas of Opportunity
            </h2>
            <p className="font-body text-xs text-on-surface-variant mt-2">
              Discover the creative and operational departments driving the VĀNYA ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-space-xs mb-space-lg">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`font-label-caps text-xs uppercase tracking-wider px-space-md py-2 transition-all border ${
                  selectedDept === dept
                    ? 'bg-primary text-on-primary border-primary font-bold'
                    : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:border-primary'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 & 4: Open Positions & Elegant Empty State */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            CURRENT LISTINGS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
            3. Open Positions
          </h2>
        </div>

        {filteredPositions.length > 0 ? (
          <div className="space-y-space-md">
            {filteredPositions.map((job) => (
              <div
                key={job.id}
                className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:border-secondary transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold">
                      {job.department}
                    </span>
                    <span className="text-outline">•</span>
                    <span className="font-body text-xs text-on-surface-variant">
                      {job.location} ({job.type})
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-primary font-medium">
                    {job.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant mt-1 max-w-xl line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-space-sm hover:bg-tertiary-container transition-colors"
                  >
                    VIEW POSITION
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Empty State when no open positions exist */
          <div className="bg-surface-container-lowest p-space-3xl border border-surface-container-high text-center max-w-2xl mx-auto mb-space-2xl">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              NO CURRENT OPENINGS
            </span>
            <h2 className="font-display text-3xl text-primary font-medium mb-3">
              General Applications & Talent Roster
            </h2>
            <p className="font-editorial-serif text-base text-on-surface-variant max-w-md mx-auto leading-relaxed mb-space-lg">
              "While we don't have an opening that matches your profile today, we'd love to hear from people who believe in what we're building."
            </p>
            <div className="w-12 h-0.5 bg-secondary mx-auto mb-space-lg" />
          </div>
        )}

        {/* Talent Roster & Application Inquiry Box */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high text-center max-w-3xl mx-auto mt-space-2xl">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            FUTURE OPPORTUNITIES
          </span>
          <h2 className="font-display text-2xl text-primary font-medium mb-2">
            Send Us Your Portfolio
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant max-w-lg mx-auto mb-space-lg">
            {CAREERS_CONTACT.note}
          </p>

          {applicationSubmitted ? (
            <div className="p-space-md bg-surface-container-lowest border border-secondary text-secondary font-label-caps text-xs uppercase tracking-widest max-w-md mx-auto">
              Thank you for sharing your profile. We will review your correspondence for future openings.
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-space-xs">
              <input
                type="email"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="Enter your professional email"
                required
                className="flex-1 bg-surface-container-lowest px-space-md py-space-sm font-body text-xs text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-space-sm hover:bg-tertiary-container transition-colors"
              >
                SUBMIT PROFILE
              </button>
            </form>
          )}

          <p className="font-body text-[0.6875rem] text-outline mt-3">
            Direct email correspondence:{' '}
            <a href={`mailto:${CAREERS_CONTACT.email}`} className="text-secondary underline">
              {CAREERS_CONTACT.email}
            </a>
          </p>
        </div>
      </section>

      {/* Position Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-primary/60 backdrop-blur-sm">
          <div className="bg-surface p-space-xl border border-surface-container-high max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 font-label-caps text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest border border-surface-container-high px-2 py-1"
            >
              CLOSE [✕]
            </button>

            <span className="font-label-caps text-xs uppercase tracking-widest text-secondary font-bold block mb-1">
              {selectedJob.department} • {selectedJob.location}
            </span>
            <h2 className="font-display text-3xl text-primary mb-3">
              {selectedJob.title}
            </h2>

            <div className="flex gap-4 font-body text-xs text-on-surface-variant border-y border-surface-container-high py-2 mb-space-md">
              <span>Type: <strong>{selectedJob.type}</strong></span>
              <span>Experience: <strong>{selectedJob.experience}</strong></span>
            </div>

            <p className="font-editorial-serif text-sm text-on-surface-variant mb-space-md leading-relaxed">
              {selectedJob.description}
            </p>

            <div className="mb-space-md">
              <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-2">
                Key Responsibilities:
              </h3>
              <ul className="list-disc list-inside font-body text-xs text-on-surface-variant space-y-1">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="mb-space-lg">
              <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-2">
                Requirements:
              </h3>
              <ul className="list-disc list-inside font-body text-xs text-on-surface-variant space-y-1">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="pt-space-md border-t border-surface-container-high flex justify-between items-center">
              <span className="font-body text-xs text-outline">
                Apply to: {CAREERS_CONTACT.email}
              </span>
              <a
                href={`mailto:${CAREERS_CONTACT.email}?subject=Application for ${encodeURIComponent(selectedJob.title)}`}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-space-sm hover:bg-tertiary-container transition-colors"
              >
                APPLY VIA EMAIL
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
