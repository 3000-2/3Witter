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
}) => {
  if (profile["D60GFWrNwkc8L8bUPzgA02H4w7u2"])
    console.log("profile : ", profile["D60GFWrNwkc8L8bUPzgA02H4w7u2"]);

  console.log("twit : ", twit);
  return (
    <div className={styles.wrap}>
      <Mheader page="홈" />
      <div className={styles.main}>
        <Mytwit user={user} SubmitHandle={SubmitHandle} />
        <ul className={styles.twitList}>
          {twit &&
            profile !== "" &&
            Object.keys(twit).map((key) => (
              <li key={key}>
                <Twit
                  user={user}
                  twit={twit[key]}
                  profile={profile[twit[key].uid]}
                  DeleteHandle={DeleteHandle}
                  FavoriteHandle={FavoriteHandle}
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
