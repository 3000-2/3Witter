import React from "react";
import styles from "./userlist.module.css";

const Userlist = ({ profile }) => {
  return (
    <div className={styles.side}>
      <ul>
        <h3>사용자 목록</h3>
        {profile &&
          Object.keys(profile).map((key) => (
            <li key={key}>
              <div>{profile[key].profile.name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Userlist;
