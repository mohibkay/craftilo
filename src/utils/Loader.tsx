import HashLoader from "react-spinners/HashLoader";
import { loaderColor } from "../constants";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color={loaderColor} />
    </div>
  );
};

export default Loader;
