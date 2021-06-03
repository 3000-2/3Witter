import React from "react";
import Twit from "../twit/twit";
import Mytwit from "../twit/mytwit";
import styles from "./main.module.css";

const Main = ({ user, twit, SubmitHandle }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>홈</h1>
      </header>
      <div className={styles.main}>
        <Mytwit user={user} SubmitHandle={SubmitHandle} />
        <ul>
          <li>
            {twit &&
              Object.keys(twit).map((key) => (
                <Twit twit={twit[key]} key={key} />
              ))}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Main;
