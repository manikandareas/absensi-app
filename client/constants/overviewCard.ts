import { OverviewCardProps } from "@/components/elements/OverviewCards";

export const student: Omit<OverviewCardProps, "count">[] = [
  {
    title: "Classes",
    description: "Total classes that you enrolled.",
    href: "/classes",
    img: "class",
    textLink: "Show all classes.",
  },
  {
    title: "Presences",
    description: "Total attendance you have make.",
    href: "/history-presences",
    img: "presences",
    textLink: "Show all presences.",
  },
  // {
  //   title: "Ongoing Presences",
  //   description: "Total ongoing presences.",
  //   href: "/history-presences",
  //   img: "incoming",
  //   textLink: "Show all ongoing presences.",
  //   count: 3,
  // },
];

export const lecture: Omit<OverviewCardProps, "count">[] = [
  {
    title: "Classes",
    description: "Total classes that you have.",
    href: "/classes",
    img: "class",
    textLink: "Show all classes.",
  },
  // {
  //   title: "Presences",
  //   description: "Total attendance you have make.",
  //   href: "/history-presences",
  //   img: "presences",
  //   textLink: "Show all presences.",
  //   count: 24,
  // },
];

export const overviewData = {
  student: student,
  lecture: lecture,
};
