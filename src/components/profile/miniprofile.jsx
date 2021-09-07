import React, { memo } from "react";
import styles from "./miniprofile.module.css";

const Miniprofile = memo(({ user, profile, LogoutHandle }) => {
  if (!profile[user.uid]) {
    return "";
  }
  const { name, imageURL } = profile[user.uid];
  return (
    <div className={styles.profile}>
      <img
        className={styles.profileImg}
        src={imageURL || "/images/logo.png"}
        alt="img"
      />
      <div className={styles.contents}>
        <div className={styles.text}>{name}</div>
        <div className={styles.text}>{user.email}</div>
      </div>
      <button className={styles.btn} onClick={LogoutHandle}>
        로그아웃
      </button>
    </div>
  );
});

export default Miniprofile;
