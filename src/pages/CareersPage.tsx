import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Heart,
  Award,
  Users,
  Send,
  X,
  FileText,
} from 'lucide-react';
import { CAREER_POSITIONS } from '../data/companyData';
import { JobPosition } from '../types';

interface CareersPageProps {
  onShowToast: (msg: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onShowToast }) => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('2-4 Years');
  const [applicantCover, setApplicantCover] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onShowToast(`Application submitted for ${selectedJob?.title}!`);
  };

  const cultureBenefits = [
    {
      title: 'Comprehensive Health Insurance',
      desc: 'Full medical and hospitalization coverage for you and your direct dependents.',
      icon: Heart,
    },
    {
      title: 'Monthly Organic Pantry Ration',
      desc: 'Free monthly basket of AMMAMA organic foods, raw honey, and wellness formulas for your household.',
      icon: Award,
    },
    {
      title: 'Continuous Professional Training',
      desc: 'Funded certifications in food chemistry, PSQCA regulations, and phytotherapy research.',
      icon: BookCheckIcon,
    },
    {
      title: 'Ethical, Fair Workplace',
      desc: 'Commitment to equal opportunity, gender diversity in agricultural leadership, and meritocracy.',
      icon: Users,
    },
  ];

  function BookCheckIcon(props: any) {
    return <FileText {...props} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
          <Briefcase className="w-4 h-4 text-[#1C432E]" />
          <span>Talent & Purpose-Driven Careers</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#142A1E]">
          Build the Future of Organic Nutrition
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          At AMMAMA Foods (Pvt.) Ltd., our mission is deeply human. Join an ethical team of food scientists, agriculturalists, and operational leaders advancing pure, evidence-backed herbal wellness across Pakistan.
        </p>
      </div>

      {/* Workplace Culture & Benefits */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
            Employee Wellbeing
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142A1E] mt-1">
            Why Grow with AMMAMA Foods?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureBenefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] text-[#1C432E] flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  {b.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions List */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
              Current Openings
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142A1E] mt-1">
              Active Vacancies across Pakistan
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            {CAREER_POSITIONS.length} Roles Open
          </span>
        </div>

        <div className="space-y-4">
          {CAREER_POSITIONS.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl border border-stone-200 hover:border-stone-300 shadow-2xs transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-[#C28E3A] uppercase tracking-wider block">
                    {job.department}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1C432E]" />
                      {job.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1C432E]" />
                      {job.type}
                    </span>
                    <span>·</span>
                    <span>Experience: {job.experience}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsSubmitted(false);
                  }}
                  className="px-5 py-2.5 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors self-start md:self-center cursor-pointer shadow-xs shrink-0"
                >
                  View JD & Apply
                </button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                {job.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Details & Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setSelectedJob(null)}
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white max-w-2xl w-full rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-stone-200 my-8">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-stone-200 pb-4">
                <span className="text-[11px] font-bold text-[#C28E3A] uppercase tracking-wider">
                  {selectedJob.department} · {selectedJob.location}
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {selectedJob.title}
                </h3>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-lg border border-emerald-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1C432E] mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    Application Successfully Submitted!
                  </h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Thank you, <strong>{applicantName}</strong>. Our human resources team will review your application for the <strong>{selectedJob.title}</strong> role.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="mt-3 px-5 py-2 bg-[#1C432E] text-white text-xs font-semibold rounded"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-6 text-xs text-stone-700 max-h-[70vh] overflow-y-auto pr-1">
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm mb-2">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-1.5 text-stone-600">
                      {selectedJob.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm mb-2">
                      Role Requirements:
                    </h4>
                    <ul className="space-y-1.5 text-stone-600">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Application Form */}
                  <form onSubmit={handleApplySubmit} className="pt-4 border-t border-stone-200 space-y-4">
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      Submit Your Candidacy
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="0300 1234567"
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Relevant Experience
                        </label>
                        <select
                          value={applicantExperience}
                          onChange={(e) => setApplicantExperience(e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                        >
                          <option value="Entry / Fresh Graduate">Fresh Graduate</option>
                          <option value="1-3 Years">1–3 Years</option>
                          <option value="3-5 Years">3–5 Years</option>
                          <option value="5+ Years">5+ Years Senior</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Brief Cover Statement / Motivation *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={applicantCover}
                        onChange={(e) => setApplicantCover(e.target.value)}
                        placeholder="Tell us why you wish to contribute to AMMAMA Foods..."
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                      />
                    </div>

                    <div className="p-3 bg-stone-50 border border-stone-200 rounded flex items-center justify-between">
                      <span className="text-[11px] text-stone-600">
                        Attach Resume (PDF/DOCX - Simulated Upload)
                      </span>
                      <span className="px-2 py-1 bg-white border border-stone-300 rounded text-[10px] font-semibold text-stone-700">
                        Select File
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      Submit Application
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
