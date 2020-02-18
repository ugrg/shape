import React, { useRef, useState, forwardRef, Ref } from "react";
import { tts } from "../../lib/tts/util";

const Test = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const [tex, setTex] = useState("答对了，你真棒！！！");
  const [audioSrc, setAudio] = useState("null");
  const audio = useRef(null);
  const handleRead = () => {
    tts(tex).then(url => setAudio(url));
  };
  return <div ref={ref}>
    <audio src={audioSrc} ref={audio} autoPlay={true} controls={true} loop={true} />
    <input value={tex} onChange={({ target: { value } }) => setTex(value)} />
    <button onClick={handleRead}>朗读</button>
  </div>;
});

Test.displayName = "Test";

export default Test;
