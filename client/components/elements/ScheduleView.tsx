// import schedule from "@/components/elements/";

import { constSchedule } from "@/constants/schedule";

export default function ScheduleView() {
  return <iframe src={constSchedule.viewLink} className="h-screen w-full" />;
}
