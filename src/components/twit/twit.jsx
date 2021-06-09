import React, { memo } from "react";
import Swal from "sweetalert2";
import { faHeart, faCut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./twit.module.css";

const Twit = memo(
  ({
    user,
    twit,
    profile,
    DeleteHandle,
    FavoriteHandle,
    DeleteFavoriteHandle,
    DetailImgHandle,
  }) => {
    if (!profile[twit.uid]) {
      return "로딩중...";
    }
    const { text, favor = {} } = twit;
    const { name, email, uid, imageURL } = profile[twit.uid];
    const onDelete = () => {
      Swal.fire({
        title: "삭제할까요?",
        showCancelButton: true,
        cancelButtonText: "아니요!",
        cancelButtonColor: "#ddd",
        confirmButtonText: "네!",
        confirmButtonColor: "#EEC7C6",
      }).then((result) => {
        if (result.value) {
          DeleteHandle(twit);
        }
      });
    };

    const done = Object.keys(favor).filter((key) => key === user.uid);
    const onClick = () => {
      if (done[0] === undefined) {
        const updated = favor;
        updated[user.uid] = true;
        const Twit = { ...twit, favor: updated };
        FavoriteHandle(user, Twit);
      } else {
        const updated = favor;
        delete updated[user.uid];
        const Twit = { ...twit, favor: updated };
        DeleteFavoriteHandle(user, Twit);
      }
    };

    const onDetail = (e) => {
      const img = e.target.src;
      console.log(img);
      DetailImgHandle(img);
    };

    return (
      <div className={styles.twit}>
        <div className={styles.profile}>
          <img
            className={styles.profileImg}
            src={imageURL || "/images/logo.png"}
            alt="img"
            onClick={onDetail}
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
          {twit?.imageURL && (
            <div className={styles.imgForm}>
              <img src={twit.imageURL} alt="img" onClick={onDetail} />
            </div>
          )}
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
          <div className={styles.serviceForm}>
            <FontAwesomeIcon
              className={`${styles.icon} ${getStyle(done)}`}
              icon={faHeart}
              onClick={onClick}
            />
            <div className={styles.favor}>
              좋아요 {Object.keys(favor).length}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const getStyle = (done) => {
  if (done[0] !== undefined) {
    return styles.on;
  } else {
    return "";
  }
};

export default Twit;
