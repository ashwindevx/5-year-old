import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Answer = () => {
  const [user] = useAuthState(auth);
  const [answers, setAnswers] = useState([]);
  console.log("🚀 ~ file: Answer.tsx:17 ~ Answer ~ answers", answers);

  useEffect(() => {
    const fetchAnswers = async () => {
      let unsubscribe = {};
      if (user) {
        const collectionRef = collection(db, "answers");
        const q = query(collectionRef, where("user", "==", user.uid));
        unsubscribe = onSnapshot(q, (snapshot) => {
          setAnswers(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      }
    };
    fetchAnswers();
  }, [user]);

  return (
    <>
      {answers.map(({ topic, answerText }) => {
        return (
          <div className="max-w-sm" key={crypto.randomUUID()}>
            <p className="mb-4 text-xl font-semibold text-white">{topic}:</p>
            <div className="rounded-3xl border-2 border-gray-400 p-4 text-white">
              {answerText}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Answer;
