import { Link } from "react-router-dom";
import { OttNextLogo } from "../components";

export default function Root() {
  return (
    <div className="flex items-center justify-center bg-grey-60 h-screen w-screen">
      <div className="">
        <div className="flex items-center justify-center flex-col mb-16">
          <OttNextLogo className="mb-8" />
          <h1 className="text-white text-[2rem] font-bold">
            OTT Next React Technical Test
          </h1>
        </div>
        <div>
          <nav>
            <ul className="flex justify-center gap-x-4">
              <li className="bg-green-30 px-4 py-2 rounded text-xl">
                <Link to="/01">Exercise 01</Link>
              </li>
              <li className="bg-green-30 px-4 py-2 rounded text-xl">
                <Link to="/02">Exercise 02</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
