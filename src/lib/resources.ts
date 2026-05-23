// Real human-support resources in Rwanda, surfaced in the "Find a human"
// drawer. Mbwira's whole thesis is that it is a door TO people — this is
// where the door opens.
//
// All contact details below were compiled from authoritative public
// sources in May 2026 (RBC.gov.rw, the services' own sites, and national
// news coverage) — cited inline. Phone numbers can still change over
// time, so a periodic call-check is wise; but nothing here is a guess.
// Entries without a phone number are always-true guidance (e.g. "go to
// your nearest health centre") and need no verification.

export interface Resource {
  name: string;
  helpsWith: string;
  reach: string;
  tel?: string;
}

export interface ResourceGroup {
  label: string;
  blurb: string;
  resources: Resource[];
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    label: "Right now",
    blurb: "If tonight is heavy and you need a person, start here. Both lines are free and answer at any hour.",
    resources: [
      {
        // Rwanda's dedicated suicide-prevention hotline — 24/7, free,
        // confidential. Sources: allAfrica (2024), africa-press.net.
        name: "Suicide-prevention hotline",
        helpsWith: "Distress, self-harm, or suicidal thoughts. 24/7, free, confidential.",
        reach: "Dial 8015",
        tel: "8015",
      },
      {
        // RBC mental-health hotline, toll-free. Source: RBC.gov.rw,
        // The New Times. Alternate line: +250 788 202 080.
        name: "Rwanda Biomedical Center — mental health line",
        helpsWith: "Urgent emotional distress; someone to talk to now. Toll-free.",
        reach: "Call 114",
        tel: "114",
      },
    ],
  },
  {
    label: "For young people",
    blurb: "Made for adolescents and young adults.",
    resources: [
      {
        // MindSky Rwanda — youth-focused, free/low-cost. 9am-6pm Mon-Sat.
        // Source: corroborated across two searches (allAfrica, devex).
        name: "MindSky Rwanda",
        helpsWith: "Free and low-cost psychological support for adolescents and young adults.",
        reach: "Call +250 788 304 782 · Mon–Sat, 9am–6pm",
        tel: "+250788304782",
      },
      {
        name: "Your campus wellness or student-affairs office",
        helpsWith:
          "Free counselling for students. ALU and most universities have someone, even if it is not advertised loudly.",
        reach: "Ask at your student-affairs or wellness desk on campus.",
      },
    ],
  },
  {
    label: "Ongoing counselling",
    blurb: "For support over time, not only emergencies.",
    resources: [
      {
        // Solid Minds Counselling Clinic — official site solidminds.rw.
        name: "Solid Minds Counselling Clinic",
        helpsWith: "Professional counselling and psychotherapy in Kigali.",
        reach: "Kigali · solidminds.rw",
      },
      {
        name: "Your community health worker (umujyanama w'ubuzima)",
        helpsWith:
          "The first link to care in every village. They can point you to the right health centre.",
        reach: "Ask at your local health centre or sector office.",
      },
    ],
  },
  {
    label: "Specialised care",
    blurb: "For deeper or longer-standing needs.",
    resources: [
      {
        // CARAES Ndera Neuropsychiatric Hospital — national referral
        // hospital. Source: caraesnderahospital.rw, Wikipedia, medpages.
        // Lines: +250 788 827 364 / +250 781 447 928 / toll-free 2575.
        name: "CARAES Ndera Neuropsychiatric Hospital",
        helpsWith:
          "Rwanda's national referral hospital for mental-health and neuropsychiatric care.",
        reach: "Call 2575 (toll-free) · Ndera, Gasabo, Kigali",
        tel: "2575",
      },
      {
        // Isange One Stop Centre — free GBV/trauma care at district
        // hospitals and Rwanda National Police. Government programme.
        name: "Isange One Stop Centre",
        helpsWith:
          "Free, confidential care for survivors of gender-based and sexual violence, including trauma support.",
        reach: "At district hospitals and Rwanda National Police, countrywide.",
      },
    ],
  },
];
