import { firebase } from "../../lib/firebase";
import { BsCheck } from "react-icons/bs";

export default function Checkbox({ id }) {
  const archiveTask = () => {
    firebase.firestore().collection("tasks").doc(id).update({
      archived: true,
    });
  };

  return (
    <div
      onClick={archiveTask}
      className="w-5 h-5 flex group items-center justify-center text-black border border-gray-base rounded-full cursor-pointer"
    >
      <BsCheck size="14" className="hidden text-primary group-hover:block" />
    </div>
  );
}
