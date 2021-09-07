import React, { memo } from "react";
import { faHome, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./header.module.css";
import Miniprofile from "../profile/miniprofile";

const Header = memo(
  ({ user, profile, GoHome, ChangePageHandle, LogoutHandle }) => {
    return (
      <header className={styles.header}>
        <div className={styles.headerWrap}>
          <ul>
            <img
              className={styles.logo}
              src="/images/logo.png"
              onClick={GoHome}
              alt="logo"
            />
            <li className={styles.headerList}>
              <button className={styles.btn} onClick={ChangePageHandle}>
                <FontAwesomeIcon className={styles.icon} icon={faHome} />
                <span className={styles.txt}>메인</span>
              </button>
            </li>
            <li className={styles.headerList}>
              <button className={styles.btn} onClick={ChangePageHandle}>
                <FontAwesomeIcon className={styles.icon} icon={faHeart} />
                <span className={styles.txt}>좋아요</span>
              </button>
            </li>
            <li className={styles.headerList}>
              <button className={styles.btn} onClick={ChangePageHandle}>
                <FontAwesomeIcon className={styles.icon} icon={faUser} />
                <span className={styles.txt}>프로필</span>
              </button>
            </li>
          </ul>
          <Miniprofile
            user={user}
            profile={profile}
            LogoutHandle={LogoutHandle}
          />
        </div>
      </header>
    );
  }
);

export default Header;
