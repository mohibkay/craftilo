import { firebase } from "../../lib/firebase";
import { toast } from "../utils/Toast";

export default function Checkbox({ id }) {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .update({
        archived: true,
      })
      .then(() => {
        toast("1 task completed");
      });
  };

  return (
    <div className="inline-block mt-1">
      <div
        onClick={archiveTask}
        className="w-5 h-5 flex group items-center justify-center text-black border border-gray-base rounded-full cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 hidden text-primary group-hover:block"
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
      </div>
    </div>
  );
}
