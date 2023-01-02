import { type NextPage } from "next";
import Answer from "../components/Answer";

const Answers: NextPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-violet-500 to-violet-800 pb-20">
      <h1 className="my-20 text-center text-3xl font-bold text-white">
        Answers
      </h1>
      <div className="grid max-w-7xl grid-cols-3 gap-5">
        <Answer />
      </div>
    </main>
  );
};

export default Answers;
