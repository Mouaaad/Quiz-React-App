import React, { useState, useRef } from "react";
import './Quiz.css'
import { data } from "../../assets/data";

const Quiz = () => {

    let [index,SetIndex] = useState(0);
    let [question,SetQuestion] = useState(data[index]);
    let [lock, SetLock] = useState(false);
    let [score, SetScore] = useState(0);
    let [result, SetResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    //check answer function
    const checkAns = (e,ans) => {
      if(lock === false) {
        if(question.ans === ans){
          e.target.classList.add("correct");
          SetLock(true);
          SetScore(prev=> prev+1);
        }
        else {
          e.target.classList.add("wrong");
          SetLock(true);
          option_array[question.ans-1].current.classList.add("correct");
        }
      }
    }

    //next question
    const next =() => {
      if(lock === true) {
        if(index === data.length -1) {
          SetResult(true);
          return 0;
        }
        SetIndex(++index);
        SetQuestion(data[index]);
        SetLock(false);
        option_array.map((option)=>{
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
          return null;
        })
      }
    }

    const reset = () => {
      SetIndex(0);
      SetQuestion(data[0]);
      SetScore(0);
      SetLock(false);
      SetResult(false);
    }

  return(
    <div className="container">
        <h1>Quiz App By Mouad SADIK</h1>
        <hr />
        {result?<></>: 
        <><h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(e) => {checkAns(e,1)}}> {question.option1}</li>
            <li ref={Option2} onClick={(e) => {checkAns(e,2)}}> {question.option2}</li>
            <li ref={Option3} onClick={(e) => {checkAns(e,3)}}> {question.option3}</li>
            <li ref={Option4} onClick={(e) => {checkAns(e,4)}}> {question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index+1} of {data.length} questions</div>
        </>}
        {result?<>
          <h2>You Scored {score} out of {data.length} </h2>
          <button onClick={reset}>Reset</button>
        </>:<></>}
        
    </div>
  )
}
export default Quiz;