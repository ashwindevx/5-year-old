type Answer = {
  topic: string;
  answerText: string;
  key: string;
};

const Answer = ({ topic, answerText }: Answer) => {
  return (
    <>
      <div className="max-w-sm md:max-w-xs">
        <p className="mb-4 text-xl font-semibold text-white">{topic}:</p>
        <div className="rounded-3xl border-2 border-gray-400 p-4 text-white">
          {answerText}
        </div>
      </div>
    </>
  );
};

export default Answer;
