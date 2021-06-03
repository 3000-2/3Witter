import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./twit.module.css";

const Twit = ({ twit }) => {
  const value = `호호호<img src="http://localhost:3000/images/logo.png">`;
  const { name, email, text } = twit;

  return (
    <div className={styles.twit}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src="/images/logo.png" />
      </div>
      <div className={styles.twitForm}>
        <div className={styles.userCard}>
          <h3 className={styles.name}>
            {name}/{email}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
        <div className={styles.serviceForm}>
          <FontAwesomeIcon className={styles.icon} icon={faHeart} />
        </div>
      </div>
    </div>
  );
};

export default Twit;
