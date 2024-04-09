import CreateClassSheet from "./CreateClassSheet";
import JoinClassModal from "./JoinClassModal";
import SpecialComponent from "./SpecialComponent";

type ClassesActionProps = {};

const ClassesAction: React.FC<ClassesActionProps> = () => {
  return (
    <SpecialComponent
      studentComponent={<JoinClassModal />}
      lectureComponent={<CreateClassSheet />}
    />
  );
};
export default ClassesAction;
