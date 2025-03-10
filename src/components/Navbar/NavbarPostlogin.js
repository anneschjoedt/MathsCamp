import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { DoorOpen, HouseDoor, Trophy, ClipboardCheck } from "react-bootstrap-icons";
import { BsMailbox } from "react-icons/bs";
import Logo from "../../images/Logo/logo-postlogin.svg";
import Parse from "parse";
import { hotjar } from "react-hotjar";
import "./NavbarPostlogin.css";
import { useTranslation } from "react-i18next";

export default function NavbarPostlogin() {
  const history = useHistory();
  const { t } = useTranslation();

  const logActivity = async () => {
    const user = Parse.User.current();
    const userActivity = new Parse.Object("UserActivity");
    userActivity.set("user_id", user.id);
    userActivity.set("activity", "Ranking_click");
    userActivity.set("value", "no");
    userActivity.set("level", 0);
    await userActivity.save();
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    Parse.User.logOut();
    history.push("/");
  };

  const handleHome = (e) => {
    e.preventDefault();
    history.push("/frontpage");
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    history.push("/contact");
  };

  const handleRanking = (e) => {
    e.preventDefault();
    hotjar.event("Ranking clicked");
    //logActivity();
    history.push("/ranking");
  };

  return (
    <Container fluid className="navbar">
      <Col>
        <div className="logo-container">
          <img
            className="logo"
            src={Logo}
            alt="Logo of a calculator"
            onClick={handleHome}
          ></img>
        </div>
      </Col>
      <Col className="app-name-col-postlogin">
        <h6 className="navbar-brand-postlogin">Maths Camp</h6>
      </Col>
      <Col lg={1.5}>
        <div className="btn-toolbar postlogin-toolbar">
          <Button
            className="btn-primary lg ranking-btn-postlogin"
            onClick={handleRanking}
          >
            {t('ranking')} <Trophy size={15} />
          </Button>
          <Button
            className="btn-primary lg home-btn-postlogin"
            onClick={handleHome}
          >
            {t("home")} <HouseDoor size={15} />
          </Button>
          <Button
            className="contact-link contact-btn"
            onClick={handleSendEmail}
          >
            {t("contact")} <BsMailbox size={15} />
          </Button>
          <Button
            className="btn-primary lg logout-btn-postlogin"
            onClick={handleLogOut}
          >
            {t("log out")} <DoorOpen size={15} />
          </Button>
        </div>
      </Col>
    </Container>
  );
}
