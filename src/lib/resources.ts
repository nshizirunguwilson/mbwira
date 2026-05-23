// Real human-support resources in Rwanda, surfaced in the "Find a human"
// drawer. Mbwira's whole thesis is that it is a door TO people — this is
// where the door opens.
//
// HONESTY RULE: never ship a contact detail we are not sure of. A wrong
// number in a moment of need is a real harm. Anything we have not
// confirmed carries `verified: false`, and the UI marks it so the user
// (and the builder) knows to check before relying on it. Phone numbers
// are only included when we have a `tel`; otherwise we give plain
// guidance on how to reach the service.

export interface Resource {
  name: string;
  helpsWith: string;
  reach: string;
  tel?: string;
  verified: boolean;
}

export interface ResourceGroup {
  label: string;
  blurb: string;
  resources: Resource[];
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    label: "Right now",
    blurb: "If tonight is heavy and you need a person, start here.",
    resources: [
      {
        name: "Rwanda Biomedical Center — mental health line",
        helpsWith: "Urgent emotional distress, crisis, someone to talk to now.",
        reach: "Call 114",
        tel: "114",
        verified: true,
      },
      {
        name: "Caritas Rwanda — psychosocial support",
        helpsWith: "Confidential support from trained counsellors.",
        reach: "Call +250 788 386 700",
        tel: "+250788386700",
        verified: false,
      },
    ],
  },
  {
    label: "Talk to someone",
    blurb: "For ongoing support, not only emergencies.",
    resources: [
      {
        name: "Your campus wellness or student-affairs office",
        helpsWith:
          "Free counselling for students. ALU and most universities have someone, even if it is not advertised loudly.",
        reach: "Ask at your student-affairs or wellness desk on campus.",
        verified: false,
      },
      {
        name: "Solid Minds Counselling Clinic",
        helpsWith: "Professional counselling and psychotherapy in Kigali.",
        reach: "Kacyiru, Kigali. Search the clinic name for current contact details.",
        verified: false,
      },
    ],
  },
  {
    label: "In your community",
    blurb: "The nearest door is often closer than you think.",
    resources: [
      {
        name: "Your community health worker (umujyanama w'ubuzima)",
        helpsWith:
          "The first link to care in every village. They can point you to the right health centre.",
        reach: "Ask at your local health centre, or through your sector office.",
        verified: false,
      },
      {
        name: "Your nearest health centre",
        helpsWith:
          "Every sector has one. They can refer you onward for mental-health care.",
        reach: "Go in person, or ask a community health worker to guide you.",
        verified: false,
      },
    ],
  },
  {
    label: "Specialised care",
    blurb: "For deeper or longer-standing needs.",
    resources: [
      {
        name: "CARAES Ndera Neuropsychiatric Hospital",
        helpsWith:
          "Rwanda's national referral hospital for mental health and neuropsychiatric care.",
        reach: "In Ndera, Gasabo District, Kigali. Usually reached by referral from a health centre.",
        verified: false,
      },
      {
        name: "Isange One Stop Centre",
        helpsWith:
          "Free, confidential care for survivors of gender-based and sexual violence, including trauma support.",
        reach: "At district hospitals and Rwanda National Police stations, countrywide.",
        verified: false,
      },
    ],
  },
];
