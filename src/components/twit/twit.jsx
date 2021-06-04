import React from "react";
import { faHeart, faCut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./twit.module.css";

const Twit = ({ user, twit, profile, DeleteHandle, FavoriteHandle }) => {
  const { text } = twit;
  const { name, email, uid, imageURL } = profile.profile;
  const favorite = profile.favorite || "";
  const onDelete = () => {
    DeleteHandle(twit);
  };

  const onClick = () => {
    FavoriteHandle(twit.uid);
  };

  console.log("favorite : ", favorite[twit.uid]);
  console.log("twit : ", twit.uid);

  return (
    <div className={styles.twit}>
      <div className={styles.profile}>
        <img
          className={styles.profileImg}
          src={imageURL || "/images/logo.png"}
          alt="img"
        />
      </div>
      <div className={styles.twitForm}>
        <div className={styles.contents}>
          <h3 className={styles.name}>
            {name} / {email}
          </h3>
          {user.uid === uid && (
            <FontAwesomeIcon
              className={styles.icon}
              icon={faCut}
              onClick={onDelete}
            />
          )}
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <div className={styles.serviceForm}>
          {favorite[twit.uid] !== twit.uid && (
            <FontAwesomeIcon
              className={styles.icon}
              icon={faHeart}
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Twit;
