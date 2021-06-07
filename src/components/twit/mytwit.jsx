import React, { useRef, useState } from "react";
import { Editor } from "react-editor";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import styles from "./mytwit.module.css";

// dayjs 초기화
dayjs.extend(relativeTime);

const Mytwit = ({ user, SubmitHandle }) => {
  const [text, setText] = useState("");
  const ref = useRef();
  const { uid } = user;
  const today = dayjs().format("YYYYMMDD");

  const onClick = (e) => {
    e.preventDefault();
    const date = Date.now();
    const time = today + date;
    const twit = {
      uid,
      time,
      text,
      favor: "",
    };
    SubmitHandle(twit);
    // console.log("ref : ", ref.current);
    // ref.current.reset();
  };

  return (
    <div className={styles.twit}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src="/images/logo.png" alt="img" />
      </div>
      <div className={styles.twitForm}>
        <Editor
          ref={ref}
          placeholder="오늘은 무슨 일이 있었나요?"
          className={styles.input}
          value={text}
          onChange={setText}
          allowInWebDrop
        />
        <div className={styles.serviceForm}>
          <button className={styles.serviceBtn}>
            <FontAwesomeIcon className={styles.icon} icon={faImage} />
          </button>
          <button className={styles.btn} onClick={onClick}>
            트윗하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mytwit;
