"use client";

import { useFindUserOngoingPresencesQuery } from "@/services/users/find-user-ongoing-presences";
import { FindUserOngoingPresenceResponse } from "@/types/users";
import { intlFormatDistance } from "date-fns";
import Link from "next/link";

type OngoingPresenceCardProps = {
  data: FindUserOngoingPresenceResponse;
};

const OngoingPresenceCard: React.FC<OngoingPresenceCardProps> = (props) => {
  // const createdDate = new Date(props.createdAt!).toDateString();
  const expireTime = intlFormatDistance(
    new Date(props.data.expireAt!),
    new Date(),
    {
      locale: "id-ID",
    },
  );

  return (
    <Link
      href={`/classes/${props.data.class.slug}/presences/${props.data.id}?class-id=${props.data.class.id}`}
      className="flex w-full items-center justify-between rounded-lg border bg-card p-4 dark:border-none"
    >
      <div className="text-xs font-semibold text-card-foreground">
        <h3>{props.data.class.title}</h3>
        <h3>{props.data.class.description}</h3>
      </div>
      <div className="text-xs text-card-foreground">
        <h3 className="text-muted-foreground">Expire-in :</h3>
        <h3 className="font-semibold">{expireTime}</h3>
      </div>
    </Link>
  );
};
export default OngoingPresenceCard;

type OngoingPresenceCardsProps = {
  userId: string;
};
export const OngoingPresenceCards: React.FC<OngoingPresenceCardsProps> = (
  props,
) => {
  const { data, isLoading, isSuccess } = useFindUserOngoingPresencesQuery({
    userId: props.userId,
  });

  if (!data?.data.data || isLoading) return <div>Loading</div>;
  return (
    <div className="space-y-2">
      {isSuccess && !data.data.data.length ? (
        <p className="text-xs text-muted-foreground">No ongoing presence yet</p>
      ) : (
        data.data.data.map((item) => (
          <OngoingPresenceCard key={crypto.randomUUID()} data={item} />
        ))
      )}
    </div>
  );
};
