import React from "react";
import styles from "./twit.module.css";

const Twit = ({ other = false }) => {
  return (
    <div className={styles.twit}>
      <div className={styles.user}>
        <img src="/images/logo.png" />
      </div>
      <div className={styles.twitForm}>
        {other || <input placeholder="무슨 일이 일어나고 있나요?"></input>}
        {other && (
          <div className={styles.userForm}>
            <h3>유저아이디/이메일</h3>
            <pre>할말</pre>
          </div>
        )}
        <div className={styles.serviceForm}>
          <button className={styles.serviceBtn}>
            {other || <img src="/images/icon/image.png" />}
          </button>
          {other || <button className={styles.btn}>트윗하기</button>}
        </div>
      </div>
    </div>
  );
};

export default Twit;
