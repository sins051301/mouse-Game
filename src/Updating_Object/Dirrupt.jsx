import { useState, useEffect } from "react";

export default function MovingDis(props) {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);

  console.log(dots.length);
  useEffect(() => {
    const intervalId = setInterval(() => {
      addNewDot();
    }, 100 - score / 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function addNewDot() {
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    setDots((prevDots) => [
      ...prevDots, //이런식으로 객체 속성 추가해줌
      {
        id: Date.now(),
        x,
        y,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
      },
    ]);
  }
  function p(a) {
    return a < 0 ? a * -1 : a;
  }

  function updatePositions() {
    setDots((prevDots) =>
      prevDots.map((dot) => ({
        //이런식으로 객체 속성 변경가능
        ...dot,
        ...dot.id,
        x: dot.x + dot.dx,
        y: dot.y + dot.dy,
        dx: dot.dx * Math.random() + 0.9, // 감속을 위한 값
        dy: dot.dy * Math.random() + 0.9,
      }))
    );
    let i;
    for (i = 0; i < dots.length; i++) {
      if (p(dots[i].x - props.x) <= 10 && p(dots[i].y - props.y) <= 10) {
        setDots([]);
        alert("gameover");
        setScore(0);
      }
    }
    dots.forEach((a, i, o) => {
      if (a.x > window.innerWidth || a.y > window.innerHeight) {
        o.splice(i, 1);
      }
    }); //이 함수는 요소(a), 인덱스(i),
    // 그리고 원본 배열(o)을 매개변수로 받습니다.
  }

  useEffect(() => {
    setScore((prevScore) => prevScore + 1);
    const animationId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationId);
  }, [dots]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1>Score: {score}</h1>
      {dots.map((dot) => (
        <div
          key={dot.id}
           style={{
            position: "absolute",
            backgroundColor: "red",
            borderRadius: "20%",
            transform: `translate(${dot.x}px, ${dot.y}px)`,
            left: -10,
            top: -10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </div>
  );
}
