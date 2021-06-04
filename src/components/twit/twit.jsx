import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./twit.module.css";

const Twit = ({ twit, profile }) => {
  const { text } = twit;
  const { name, email, uid, imageURL } = profile;
  return (
    <div className={styles.twit}>
      <div className={styles.profile}>
        <img
          className={styles.profileImg}
          src={imageURL || "/images/logo.png"}
        />
      </div>
      <div className={styles.twitForm}>
        <div className={styles.userCard}>
          <h3 className={styles.name}>
            {name} / {email}
          </h3>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>
        <div className={styles.serviceForm}>
          <FontAwesomeIcon className={styles.icon} icon={faHeart} />
        </div>
      </div>
    </div>
  );
};

export default Twit;
