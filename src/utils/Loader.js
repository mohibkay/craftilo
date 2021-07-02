import HashLoader from "react-spinners/HashLoader";
import { loaderColor } from "../constants";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color={loaderColor} />
    </div>
  );
}
