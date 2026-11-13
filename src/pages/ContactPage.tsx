import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Award,
  Send,
  UserCheck,
  FileCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactPageProps {
  onShowToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Product Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onShowToast('Thank you! Your official inquiry has been submitted to AMMAMA Foods.');
  };

  const managementTeam = [
    {
      name: 'Muhammad Haris',
      role: 'Chief Executive Officer (CEO)',
      department: 'Executive Governance',
      bio: 'Visionary entrepreneur dedicated to elevating Pakistani herbal formulations to global organic benchmarks with complete SECP transparency.',
    },
    {
      name: 'Dr. Zulfiqar Ahmad (Ph.D)',
      role: 'Head of Botanical Research & Formulations',
      department: 'R&D / Phytochemistry',
      bio: 'Over 18 years of clinical phytotherapy experience specializing in bio-available compound synergies and heavy metal detoxification.',
    },
    {
      name: 'Ayesha Siddiqua',
      role: 'Director of Regulatory Compliance & Quality',
      department: 'PSQCA / HACCP Standards',
      bio: 'Oversees documentation, third-party laboratory certifications, and regulatory adherence with federal and provincial food authorities.',
    },
    {
      name: 'Farhan Nadeem',
      role: 'Head of Agronomy & Sustainable Sourcing',
      department: 'Supply Chain & Farmer Welfare',
      bio: 'Pioneered contract organic farming hubs across Potohar and Southern Punjab with an emphasis on female agricultural collectives.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
          <ShieldCheck className="w-4 h-4 text-[#1C432E]" />
          <span>Affiliation, Leadership & Official Channels</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#142A1E]">
          Corporate Governance & Contact
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          AMMAMA Foods (Pvt.) Ltd. operates with verified corporate credentials under the Securities and Exchange Commission of Pakistan. Connect with our executive offices, research divisions, or customer service.
        </p>
      </div>

      {/* Official Registration & Certification Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] text-[#1C432E] flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#C28E3A] uppercase tracking-wider block">
            SECP Incorporation
          </span>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            UCI No. {COMPANY_INFO.uci}
          </h3>
          <p className="text-xs text-stone-600">
            Registered pursuant to {COMPANY_INFO.secpAct} on {COMPANY_INFO.incorporationDate}.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] text-[#1C432E] flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#C28E3A] uppercase tracking-wider block">
            Regulatory Standards
          </span>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            PSQCA & Food Safety
          </h3>
          <p className="text-xs text-stone-600">
            Strict adherence to Pakistan Standards and Quality Control Authority standards, batch testing, and food-grade safety.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#F4EFE6] text-[#1C432E] flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#C28E3A] uppercase tracking-wider block">
            Quality Management
          </span>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            HACCP & ISO Roadmap
          </h3>
          <p className="text-xs text-stone-600">
            Comprehensive documented hazard analysis and critical control points implemented across processing and packaging.
          </p>
        </div>
      </div>

      {/* CEO Message Section */}
      <section className="bg-[#FAF8F5] p-8 lg:p-12 rounded-2xl border border-stone-200 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
              From the Desk of the Chief Executive Officer
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142A1E]">
              "A Promise of Uncompromised Botanical Purity"
            </h2>
            <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
              <p>
                When we founded <strong>AMMAMA Foods (Pvt.) Ltd.</strong>, we observed a troubling reality in Pakistan: widespread adulteration of staple foods, undisclosed fillers in herbal tonics, and an absence of verifiable transparency.
              </p>
              <p>
                We established AMMAMA Foods with an uncompromising charter: to prepare and preserve pure organic foods and therapeutic herbs with verifiable botanical integrity. When you examine our flagship formula, <strong>Terra Herbs-8</strong>, every organic ingredient is third-party lab-tested, carefully standardized, and crafted with zero synthetic fillers or preservatives.
              </p>
              <p>
                We look forward to serving your household and advancing a healthier, more balanced Pakistan.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200 flex items-center gap-4">
              <div>
                <span className="font-serif font-bold text-stone-900 block text-base">
                  Executive Office
                </span>
                <span className="text-xs text-stone-500">
                  AMMAMA Foods (Pvt.) Ltd. · SECP UCI 0303557
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#1C432E] text-white p-6 rounded-xl space-y-4 text-xs">
            <h4 className="font-serif text-lg font-bold text-[#E6C687]">
              Key Executive Directives
            </h4>
            <div className="space-y-2 text-stone-300">
              <p>• Zero synthetic chemicals, additives, or artificial bulking agents.</p>
              <p>• Full GPS farm-to-packaging batch traceability.</p>
              <p>• Dedicated customer support accessible nationwide via direct WhatsApp.</p>
              <p>• Continuous investment into indigenous botanical clinical research.</p>
            </div>
            <div className="pt-2 border-t border-[#2A573D]">
              <span className="text-[#E6C687] block text-[11px] font-semibold">
                Corporate Inquiries:
              </span>
              <span className="font-mono text-stone-200">{COMPANY_INFO.corporateEmail}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Staff Directory */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
            Human Leadership
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#142A1E] mt-1">
            Executive Leadership & Key Staff
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Our multidisciplinary team combines phytochemistry, agronomy, food safety engineering, and commercial supply chain leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {managementTeam.map((member, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#F4EFE6] text-[#1C432E] flex items-center justify-center font-serif text-base font-bold">
                  {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[#1C432E] font-medium">{member.role}</p>
                  <span className="text-[10px] text-[#C28E3A] uppercase tracking-wider block mt-0.5">
                    {member.department}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-500">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Executive</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Office Locations & Interactive Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Office Details */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-xl border border-stone-200">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Registered Addresses & Channels
          </h3>

          <div className="space-y-4 text-xs text-stone-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#1C432E] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Ammama Wellness Shelf (Peshawar Store &amp; Office):</strong>
                <p className="text-stone-600 mt-0.5">{COMPANY_INFO.headOffice}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#1C432E] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Islamabad Coordination Office:</strong>
                <p className="text-stone-600 mt-0.5">{COMPANY_INFO.regionalOffice}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-[#1C432E] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Botanical Processing Facility:</strong>
                <p className="text-stone-600 mt-0.5">{COMPANY_INFO.packagingFacility}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Phone className="w-4 h-4 text-[#1C432E] shrink-0" />
              <div>
                <strong className="block text-stone-900">Helpline:</strong>
                <span className="font-mono text-stone-600">{COMPANY_INFO.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#1C432E] shrink-0" />
              <div>
                <strong className="block text-stone-900">Email:</strong>
                <span className="text-stone-600">{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Assalam-o-Alaikum AMMAMA Foods, I would like to speak with customer relations.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp Now
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
            Send an Official Message
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            For retail distributorship, wholesale bulk supply, or individual product questions, submit your inquiry below.
          </p>

          {isSubmitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-lg border border-emerald-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1C432E] mx-auto flex items-center justify-center font-bold">
                ✓
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Inquiry Received
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Thank you for contacting AMMAMA Foods (Pvt.) Ltd. Your message has been routed to our corporate relations desk. A team member will respond within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs text-[#1C432E] font-semibold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Asadullah Khan"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:border-[#1C432E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:border-[#1C432E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:border-[#1C432E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Subject / Department
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:border-[#1C432E] focus:outline-none"
                  >
                    <option value="Product Inquiry">Product Inquiry (Terra Herbs-8 / Honey / Ghee)</option>
                    <option value="Retail Distribution">Retail Placement & Supermarket Distribution</option>
                    <option value="Farmer Sourcing">Organic Farmer Partnership</option>
                    <option value="Corporate Governance">Corporate / SECP Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Please describe your requirements, city of delivery, or wholesale inquiry..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:border-[#1C432E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                Submit Official Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
