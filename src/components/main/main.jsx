import React from "react";
import Twit from "../twit/twit";
import Mytwit from "../twit/mytwit";
import Mheader from "../header/mheader";
import styles from "./main.module.css";

const Main = ({
  user,
  twit,
  profile,
  SubmitHandle,
  DeleteHandle,
  FavoriteHandle,
  DeleteFavoriteHandle,
}) => {
  return (
    <div className={styles.wrap}>
      <Mheader page="홈" />
      <div className={styles.main}>
        <Mytwit user={user} SubmitHandle={SubmitHandle} />
        <ul className={styles.twitList}>
          {user &&
            twit &&
            profile &&
            Object.keys(twit).map((key) => (
              <li key={key}>
                <Twit
                  user={user}
                  twit={twit[key]}
                  profile={profile}
                  DeleteHandle={DeleteHandle}
                  FavoriteHandle={FavoriteHandle}
                  DeleteFavoriteHandle={DeleteFavoriteHandle}
                  key={key}
                />
              </li>
            ))}
        </ul>
      </div>
      <div>3002</div>
    </div>
  );
};

export default Main;
