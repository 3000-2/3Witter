import React, { useRef, useState } from "react";
import { Editor } from "react-editor";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./mytwit.module.css";

const Mytwit = ({ user, SubmitHandle }) => {
  const [text, setText] = useState("");
  const ref = useRef();
  const { uid, displayName, email } = user;

  const onClick = (e) => {
    e.preventDefault();
    const date = Date.now();
    const twit = {
      id: uid,
      name: displayName || "이름",
      time: date,
      email: email || "이메일",
      imageURL: "",
      text,
    };
    SubmitHandle(twit);
  };

  return (
    <div className={styles.twit}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src="/images/logo.png" />
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
