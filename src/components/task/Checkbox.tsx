import { firebase } from "../../lib/firebase";
import { toast } from "../utils/Toast";

interface Props {
  id: string;
  archived: boolean;
}

const Checkbox: React.FC<Props> = ({ id, archived }) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .update({
        archived: !archived,
      })
      .then(() => {
        toast(archived ? "Marked as uncompleted" : "1 task completed");
      });
  };

  return (
    <div className="inline-block mt-1 checkbox">
      <div
        onClick={archiveTask}
        className="w-5 h-5 flex items-center justify-center text-black border border-gray-base rounded-full cursor-pointer"
      >
        {archived ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-primary block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-primary checkmark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
