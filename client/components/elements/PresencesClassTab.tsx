"use client";
import { useFindClassPresencesQuery } from "@/services/classes/find-class-presences";
import { TabsContent } from "../ui/tabs";
import CreatePresenceSheet from "./CreatePresenceSheet";
import { PresenceCards } from "./PresencesCards";
import SpecialComponent from "./SpecialComponent";

type PresencesClassTabProps = {
  classId: string;
  slug: string;
};

const PresencesClassTab: React.FC<PresencesClassTabProps> = (props) => {
  const { data, isLoading } = useFindClassPresencesQuery({
    classId: props.classId,
  });

  return (
    <TabsContent value="presences">
      <SpecialComponent
        lectureComponent={<CreatePresenceSheet classId={props.classId} />}
        studentComponent={null}
      />

      {!data?.data.data?.length || isLoading ? (
        <div className="flex h-24 w-full items-center justify-center text-muted-foreground">
          No class presence yet.
        </div>
      ) : (
        <PresenceCards data={data?.data.data} slug={props.slug} />
      )}
    </TabsContent>
  );
};
export default PresencesClassTab;
