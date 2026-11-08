import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  Handshake,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { RESEARCH_PAPERS, EVENTS, COMPANY_INFO } from '../data/companyData';

interface EventsPageProps {
  onShowToast: (msg: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'research' | 'events' | 'partnership'>('research');
  const [partnerName, setPartnerName] = useState('');
  const [partnerType, setPartnerType] = useState('Organic Botanical Farmer');
  const [partnerCity, setPartnerCity] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerProposal, setPartnerProposal] = useState('');
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitted(true);
    onShowToast('Partnership proposal submitted successfully to AMMAMA Foods!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
          <BookOpen className="w-4 h-4 text-[#1C432E]" />
          <span>Scientific Rigor & Agricultural Outreach</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#142A1E]">
          Research, Case Studies & Events
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          AMMAMA Foods bridges ancient Eastern herbal wisdom with modern analytical science, verifiable phytochemical research, and direct agricultural partnerships.
        </p>
      </div>

      {/* Main Switcher Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('research')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'research'
              ? 'border-b-2 border-[#1C432E] text-[#1C432E] font-bold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Clinical Botanical Reviews
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'events'
              ? 'border-b-2 border-[#1C432E] text-[#1C432E] font-bold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Expos & Field Seminars
        </button>
        <button
          onClick={() => setActiveTab('partnership')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'partnership'
              ? 'border-b-2 border-[#1C432E] text-[#1C432E] font-bold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          Grower & Retail Partnerships
        </button>
      </div>

      {/* Tab 1: Research Papers & Case Studies */}
      {activeTab === 'research' && (
        <div className="space-y-8">
          <div className="p-4 bg-[#F4EFE6] rounded-xl border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
            <span>
              All research papers are published by the <strong>AMMAMA Phytochemical & Clinical Research Cell</strong> in adherence to international botanical monographs.
            </span>
            <span className="font-mono text-[#1C432E] font-semibold hidden md:inline">
              ISO / PSQCA Tested
            </span>
          </div>

          <div className="space-y-6">
            {RESEARCH_PAPERS.map((paper) => (
              <article
                key={paper.id}
                className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-[#C28E3A] uppercase tracking-wider">
                    {paper.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {paper.readTime}
                    </span>
                    <span>·</span>
                    <span>Published {paper.date}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {paper.title}
                </h3>

                <p className="text-xs text-stone-500">Author: {paper.author}</p>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {paper.summary}
                </p>

                <div className="p-4 bg-stone-50 rounded-lg border border-stone-100 space-y-2">
                  <span className="text-xs font-bold text-stone-900 block">
                    Core Empirical Findings:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {paper.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Events & Expos */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        evt.status === 'Upcoming'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {evt.status}
                    </span>
                    <span className="text-[11px] text-stone-500">{evt.capacity}</span>
                  </div>

                  <span className="text-[10px] font-bold text-[#C28E3A] uppercase tracking-wider block">
                    {evt.type}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {evt.title}
                  </h3>

                  <div className="space-y-1 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#1C432E]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1C432E]" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Assalam-o-Alaikum AMMAMA Foods, I am interested in attending: ${evt.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#1C432E] hover:underline flex items-center gap-1.5"
                  >
                    Inquire Event Access <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Agricultural & Distribution Partnership */}
      {activeTab === 'partnership' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-xl border border-stone-200 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
              Cooperative Alliances
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Grow with AMMAMA Foods
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We partner directly with organic farmers, beekeepers, retail chains, and institutional researchers across Pakistan to eliminate exploitative middlemen and ensure verified botanical quality.
            </p>
            <div className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-200">
              <p><strong>Organic Farmers:</strong> Guaranteed off-take contracts and organic compost subsidies.</p>
              <p><strong>Supermarket Chains:</strong> Premium shelf presence with high consumer loyalty.</p>
              <p><strong>Phytotherapists & Doctors:</strong> Evidence-backed formulas with documented assay sheets.</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              Partnership Application
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Submit your cooperative or commercial partnership proposal below.
            </p>

            {partnerSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-lg border border-emerald-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1C432E] mx-auto flex items-center justify-center font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Partnership Proposal Received
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Thank you, <strong>{partnerName}</strong>. Our Sourcing & Corporate Development Division will review your proposal and get in touch.
                </p>
                <button
                  onClick={() => setPartnerSubmitted(false)}
                  className="mt-2 text-xs text-[#1C432E] font-semibold underline"
                >
                  Submit another proposal
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Organization / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="e.g. Chakwal Herbal Cooperative"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Partnership Category *
                    </label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                    >
                      <option value="Organic Botanical Farmer">Organic Botanical Farmer</option>
                      <option value="Supermarket / Retail Chain">Supermarket / Retail Chain</option>
                      <option value="Beekeeping Collective">Beekeeping Collective (Raw Sidr Honey)</option>
                      <option value="Research Institution / Lab">Phytochemical Research Lab</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      City / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerCity}
                      onChange={(e) => setPartnerCity(e.target.value)}
                      placeholder="e.g. Sargodha / Potohar / Karachi"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={partnerPhone}
                      onChange={(e) => setPartnerPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Proposal Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={partnerProposal}
                    onChange={(e) => setPartnerProposal(e.target.value)}
                    placeholder="Describe your cultivation capacity, acreage, retail branch network, or testing capabilities..."
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Handshake className="w-4 h-4" />
                  Submit Partnership Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
