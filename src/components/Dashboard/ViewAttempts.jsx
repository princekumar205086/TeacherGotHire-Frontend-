import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptsExam } from "../../features/examQuesSlice";
import AttemptCard from "./components/AttemptCard";

const ViewAttempts = () => {
  const examSet = useSelector((state) => state.examQues.examSet || []);
  console.log("Exam set", examSet);
  const examAttempts = useSelector((state) => state.examQues?.attempts);
  console.log("Exam Attempt", examAttempts);
  const dispatch = useDispatch();


  const subjectAttempt = examAttempts.reduce((acc, item) => {
    const subjectName = item.exam.subject.subject_name;

    if(!acc[subjectName]){
      acc[subjectName] = 0;
    }

    acc[subjectName] = (acc[subjectName] || 0) + 1;

    return acc
  }, {})

  console.log("subject Attempt", subjectAttempt);

  let count = 1;

  useEffect(() => {
    dispatch(attemptsExam());
  }, []);

  return (
    <div className="p-5">
      <div className="md:grid md:grid-cols-2 gap-5 mb-4 w-full">
        <AttemptCard totalAttempts="10" userAttempts="5" subjectAttempt={subjectAttempt} />
      </div>
      <div className="relative overflow-x-auto shadow sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs bg-[#E5F1F9] uppercase text-[#3E98C7]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Attempt
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Results
              </th>
              <th scope="col" className="px-6 py-3">
                Percentage
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {examAttempts &&
              examAttempts?.map((data) => (
                <tr className=" border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {count++}
                  </th>
                  <td className="px-6 py-4">{data.exam.level.name}</td>
                  <td className="px-6 py-4">
                    {data.exam.subject.subject_name}
                  </td>
                  <td className="px-6 py-4">
                    { data.isqualified && data.isqualified ? ("Qualified") : ("Not Qualified")}
                  </td>
                  <td className="px-6 py-4">
                    {((data.correct_answer/(data.correct_answer + data.incorrect_answer + data.is_unanswered)) * 100).toFixed(0)} %
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-[#3E98C7] hover:underline"
                    >
                      view results
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAttempts;
