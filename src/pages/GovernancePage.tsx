import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Lock,
  RefreshCw,
  AlertTriangle,
  Scale,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { COMPANY_INFO, FAQ_ITEMS } from '../data/companyData';

export const GovernancePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('secp');

  const policies = [
    { id: 'secp', label: 'SECP Corporate Registration' },
    { id: 'privacy', label: 'Data Sharing & Privacy' },
    { id: 'copyright', label: 'Copyright & Intellectual Property' },
    { id: 'purchase', label: 'Purchase & Payment Terms' },
    { id: 'returns', label: 'Return & Refund Policy' },
    { id: 'damage', label: 'Damage in Transit Policy' },
    { id: 'disclaimer', label: 'Product Safety & Disclaimer' },
    { id: 'faq', label: 'Compliance FAQ' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
          <Scale className="w-4 h-4 text-[#1C432E]" />
          <span>Statutory Compliance & Legal Policies</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#142A1E]">
          Governance, Terms & Policies
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          AMMAMA Foods (Pvt.) Ltd. is committed to absolute legal compliance, consumer privacy, clear purchasing policies, and transparent botanical governance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-1 sticky top-24">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 py-2 block">
            Policy Navigation
          </span>
          {policies.map((pol) => (
            <button
              key={pol.id}
              onClick={() => setActiveSection(pol.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                activeSection === pol.id
                  ? 'bg-[#1C432E] text-white font-semibold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span>{pol.label}</span>
              {activeSection === pol.id && <span>→</span>}
            </button>
          ))}

          {/* SECP Mini Badge */}
          <div className="mt-4 p-3 bg-[#FAF8F5] rounded-lg border border-stone-200 text-stone-700 text-xs space-y-1">
            <span className="font-bold text-[#1C432E] block">SECP Corporate Verification</span>
            <p className="text-[11px] text-stone-500">
              Unique Identity No. (UCI): <strong>0303557</strong>
            </p>
            <p className="text-[10px] text-stone-400">Incorporated: 04-August-2025</p>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-2xs space-y-8 text-stone-800 text-xs sm:text-sm leading-relaxed">
          {/* SECP Verification Document */}
          {activeSection === 'secp' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#1C432E] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Securities and Exchange Commission of Pakistan (SECP)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Corporate Unique Identity (UCI) No. 0303557
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-3 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Corporate Legal Name</span>
                    <strong>{COMPANY_INFO.legalName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">SECP Registration UCI</span>
                    <strong className="text-[#1C432E] text-sm">{COMPANY_INFO.uci}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Statutory Law</span>
                    <span>Section 16 of the Companies Act-2017</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Date of Incorporation</span>
                    <span>4th August 2025</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Company Classification</span>
                    <span>Private Limited by Shares</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Authorized Operations</span>
                    <span>Organic Foods, Botanicals, Wellness & FMCG</span>
                  </div>
                </div>
              </div>

              <p>
                AMMAMA Foods (Pvt.) Ltd. operates strictly within the corporate statutory framework of the Islamic Republic of Pakistan under the jurisdiction of the Company Registration Office (CRO), SECP. All financial accounts, annual filings, and director disclosures are audited in compliance with the Companies Act 2017.
              </p>
            </div>
          )}

          {/* Data Sharing & Privacy */}
          {activeSection === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                Data Sharing & Privacy Policy
              </h3>
              <p>
                At AMMAMA Foods (Pvt.) Ltd., we hold customer privacy with the utmost sanctity. We collect customer information (such as recipient name, delivery street address, WhatsApp phone number, and city) exclusively for fulfilling orders and communicating courier tracking.
              </p>
              <h4 className="font-serif font-bold text-base text-stone-900 mt-4">
                1. No Third-Party Commercial Data Sharing
              </h4>
              <p>
                We never sell, rent, monetize, or disclose your personal contact records, purchase histories, or health inquiries to third-party advertisers, data aggregators, or unauthorized third parties.
              </p>
              <h4 className="font-serif font-bold text-base text-stone-900 mt-4">
                2. Logistics and Courier Handover
              </h4>
              <p>
                To deliver your products across Pakistan, recipient name, phone number, and shipping address are securely passed only to our verified courier logistics partners (such as TCS, Leopards, or Trax) solely for parcel delivery and Cash on Delivery collection.
              </p>
            </div>
          )}

          {/* Copyright & Trademark */}
          {activeSection === 'copyright' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                Copyright & Intellectual Property
              </h3>
              <p>
                All brand trade names, distinctive logos, formulation ratios (including the proprietary 8-herb compounding of <strong>Terra Herbs-8</strong>), packaging artwork, label graphics, product photography, research papers, and website design are the exclusive intellectual property of <strong>AMMAMA FOODS (PVT.) LTD.</strong> (SECP UCI: 0303557).
              </p>
              <p>
                Unauthorized copying, counterfeit compounding, commercial imitation of packaging, or reproduction of proprietary text without prior written permission is strictly prohibited under the Copyright Ordinance 1962 and the Trade Marks Ordinance 2001 of Pakistan.
              </p>
            </div>
          )}

          {/* Purchase Policy */}
          {activeSection === 'purchase' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                Purchase, Billing & Payment Terms
              </h3>
              <p>
                All prices on this website and on our official WhatsApp sales desk are quoted in <strong>Pakistani Rupees (PKR)</strong> inclusive of applicable commercial duties.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-stone-700">
                <li><strong>Cash on Delivery (COD):</strong> Available across all serviced postal codes in Pakistan. Payment is made in cash directly to the authorized courier rider upon physical receipt of your parcel.</li>
                <li><strong>Advance Bank Transfer (IBFT):</strong> Customers opting for advance online banking receive our official AMMAMA Foods corporate bank account details via official email or WhatsApp.</li>
                <li><strong>Free Nationwide Shipping:</strong> All retail orders with subtotal exceeding PKR 3,500 qualify for zero delivery fee. Orders under PKR 3,500 carry a standard delivery contribution of PKR 250.</li>
              </ul>
            </div>
          )}

          {/* Return & Refund Policy */}
          {activeSection === 'returns' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                7-Day Return & Refund Policy
              </h3>
              <p>
                Customer satisfaction is integral to our vision. If you are not satisfied with your purchase, you may initiate a return within <strong>7 calendar days</strong> of receiving your parcel.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
                <strong>Hygienic Food Safety Notice:</strong> Due to health and food hygiene standards, returned bottles and jars must be unopened, in their original outer carton, and have the tamper-proof neck shrink sleeve or induction seal 100% intact. Opened or partially consumed herbal jars cannot be returned for resale safety.
              </div>
              <p>
                Approved refunds are processed via Bank Transfer or JazzCash/EasyPaisa within 3–5 working days upon physical inspection of returned merchandise at our Islamabad hub.
              </p>
            </div>
          )}

          {/* Damage in Transit Policy */}
          {activeSection === 'damage' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                Damaged Goods & Transit Guarantee
              </h3>
              <p>
                We pack every jar of Terra Herbs-8, glass bottle of Sidr Honey, and Desi Ghee in multi-layer shock-absorbent cushioning and sturdy corrugated shipping cartons.
              </p>
              <p>
                However, in the rare event of transit damage, broken seals, or leaking contents:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-stone-700">
                <li>Take 2 clear photographs of the damaged carton and product bottle immediately upon receiving from the courier rider.</li>
                <li>Send the photos along with your Order ID to our WhatsApp helpline at <strong>+92 300 0303557</strong> within 48 hours.</li>
                <li>We will dispatch a <strong>free, immediate replacement parcel</strong> without any additional delivery fee.</li>
              </ol>
            </div>
          )}

          {/* Disclaimer & Misuse */}
          {activeSection === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                Product Safety & Safe Usage Disclaimer
              </h3>
              <p>
                Our herbal formulations (including Terra Herbs-8) and organic foods are prepared using 100% natural agricultural botanicals according to traditional herbal pharmacopeia.
              </p>
              <div className="space-y-2 text-stone-700">
                <p>
                  <strong>Recommended Dosage:</strong> Please strictly adhere to the suggested daily serving printed on the label (e.g. 1 level teaspoon daily for Terra Herbs-8). Do not exceed recommended servings.
                </p>
                <p>
                  <strong>Medical Advisory:</strong> Pregnant or lactating women, individuals taking prescription blood-thinning medications, or those with known chronic clinical conditions should consult their licensed healthcare practitioner or certified physician prior to introducing concentrated botanical regimens.
                </p>
                <p>
                  <strong>Not a Substitute for Acute Medical Care:</strong> These statements and natural formulas are intended for general vitality, nutritional balance, and holistic wellness, not as a replacement for emergency medical care.
                </p>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeSection === 'faq' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                Frequently Asked Regulatory & Order Questions
              </h3>
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
                    <h5 className="font-serif font-bold text-sm text-stone-900">
                      {item.q}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
