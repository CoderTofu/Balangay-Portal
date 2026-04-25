export type OfferSide = "my" | "their";

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
  messages: Message[];
};

export const MOCK_THREADS: OfferThread[] = [
  {
    id: "thread-001",
    postTitle: "2 Bags of End-of-Day Bread (Assorted)",
    otherName: "Julian Red",
    offerSummary: "I’M OFFERING DELIVERY",
    side: "their",
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
    side: "their",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hi! I can swap a set of clothes for your offer. Interested?",
        timestampLabel: "TODAY, 10:42 AM",
      },
    ],
  },
];

