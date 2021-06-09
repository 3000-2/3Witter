import React, { memo } from "react";
import Mheader from "../header/mheader";
import Twit from "../twit/twit";
import styles from "./favorite.module.css";

const Favorite = memo(
  ({
    user,
    twit,
    profile,
    DeleteHandle,
    FavoriteHandle,
    DeleteFavoriteHandle,
  }) => {
    if (!twit) {
      return <Mheader page="좋아요" />;
    }
    const favorite = Object.values(twit).map((value) => {
      let favor = [];
      favor =
        (Object.keys(value["favor"] || {}).find((key) => key === user.uid) &&
          value.time) ||
        "";
      return favor;
    });
    const result = favorite.filter((item) => item !== "");

    return (
      <>
        <Mheader page="좋아요" />
        <ul className={styles.twitList}>
          {user &&
            twit &&
            profile &&
            result.map((key) => (
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
      </>
    );
  }
);

export default Favorite;
