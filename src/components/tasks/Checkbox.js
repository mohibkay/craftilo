import { firebase } from "../../lib/firebase";

export default function Checkbox({ id }) {
  const archiveTask = () => {
    firebase.firestore().collection("tasks").doc(id).update({
      archived: true,
    });
  };

  return (
    <div className="checkbox-holder" onClick={archiveTask}>
      <span className="checkbox" />
    </div>
  );
}
