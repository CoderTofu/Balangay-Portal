export type OfferSide = "MY OFFERS" | "THEIR OFFERS";

export type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  timestampLabel?: string;
};

export type OfferThread = {
  id: string;
  postTitle: string;
  otherName: string;
  offerSummary: string;
  side: OfferSide;
  status: OfferStatus;
  messages: Message[];
};

export const MOCK_THREADS: OfferThread[] = [
  {
    id: "thread-001",
    postTitle: "2 Bags of End-of-Day Bread (Assorted)",
    otherName: "Julian Red",
    offerSummary: "I’M OFFERING DELIVERY",
    side: "THEIR OFFERS",
    status: "PENDING",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hey! I saw your post about the gardening tools. I don’t have the cash right now, but would you be interested in a swap? I can handle your grocery runs for the next month!",
      },
      {
        id: "m2",
        from: "me",
        text: "That sounds great, Julian. I actually need a bit more than just grocery runs. Could you manage some home-cooked meals too? My schedule is packed.",
      },
      {
        id: "m3",
        from: "them",
        text: "Absolutely. I love cooking. How about 3 meals a week plus the grocery run in exchange for the 4 hours of gardening you mentioned?",
      },
    ],
  },
  {
    id: "thread-002",
    postTitle: "2 Bags of End-of-Day Bread (Assorted)",
    otherName: "Juan Piolo Pascual",
    offerSummary: "I’M OFFERING CLOTHES",
    side: "THEIR OFFERS",
    status: "PENDING",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hi! I can swap a set of clothes for your offer. Interested?",
        timestampLabel: "TODAY, 10:42 AM",
      },
    ],
  },
  {
    id: "thread-003",
    postTitle: "Cooked Ulam (Good for 3–4 pax)",
    otherName: "Aira Santos",
    offerSummary: "I’M OFFERING RICE + EGGS",
    side: "THEIR OFFERS",
    status: "ACCEPTED",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hello! I can swap 5kg rice + a tray of eggs for your cooked ulam. Is that okay?",
        timestampLabel: "YESTERDAY, 6:18 PM",
      },
      {
        id: "m2",
        from: "me",
        text: "Deal! Let’s coordinate pickup time and location.",
      },
    ],
  },
  {
    id: "thread-004",
    postTitle: "Box of Assorted Baby Clothes (0–6 months)",
    otherName: "Miguel Dela Cruz",
    offerSummary: "I’M OFFERING TOYS",
    side: "THEIR OFFERS",
    status: "REJECTED",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Can I swap a set of toys for the baby clothes? They’re clean and complete.",
        timestampLabel: "APR 20, 9:05 AM",
      },
      {
        id: "m2",
        from: "me",
        text: "Thanks, Miguel! I’m prioritizing diapers/formula right now, but appreciate the offer.",
      },
    ],
  },
  {
    id: "thread-005",
    postTitle: "Used Study Table (Good Condition)",
    otherName: "Trina Villanueva",
    offerSummary: "I’M OFFERING CASH + PICKUP",
    side: "MY OFFERS",
    status: "PENDING",
    messages: [
      {
        id: "m1",
        from: "me",
        text: "Hi Trina! I can offer ₱600 and I can pick it up today.",
        timestampLabel: "TODAY, 9:14 AM",
      },
      {
        id: "m2",
        from: "them",
        text: "Hi! Thanks for reaching out. Let me check with my family and I’ll update you.",
      },
    ],
  },
  {
    id: "thread-006",
    postTitle: "2nd Hand Android Phone (Working)",
    otherName: "Kean Mendoza",
    offerSummary: "I’M OFFERING GCash",
    side: "MY OFFERS",
    status: "ACCEPTED",
    messages: [
      {
        id: "m1",
        from: "me",
        text: "Hello! I can offer ₱1,200 via GCash. Can we meet at the barangay hall?",
        timestampLabel: "APR 22, 3:30 PM",
      },
      {
        id: "m2",
        from: "them",
        text: "Sure! ₱1,200 works. Tomorrow morning at the barangay hall is good.",
      },
    ],
  },
  {
    id: "thread-007",
    postTitle: "Sack of Mixed Vegetables (Fresh)",
    otherName: "Luna Reyes",
    offerSummary: "I’M OFFERING COOKED MEALS",
    side: "MY OFFERS",
    status: "REJECTED",
    messages: [
      {
        id: "m1",
        from: "me",
        text: "Hi Luna! I can swap cooked meals (3x) for your vegetables. Interested?",
        timestampLabel: "APR 18, 7:12 PM",
      },
      {
        id: "m2",
        from: "them",
        text: "Thanks! I already have someone for meals, but appreciate it.",
      },
    ],
  },
];
