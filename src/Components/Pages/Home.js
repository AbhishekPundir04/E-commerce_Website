import { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Icon from "../Images/icon.ico";
import classes from "./Home.css";
import "./Home.css";
const Home = () => {
  return (
    <Fragment>
      <div className="div">
        <Row>
          <Col className="text-center">
            <Button
              variant="primary"
              style={{ fontSize: "25px" }}
              className="btn"
            >
              Get our Latest Album
            </Button>{" "}
            <br />
            <a rel="noreferrer" href="/" target="_blank">
              <img src={Icon} alt="Play" />
            </a>
          </Col>
        </Row>
      </div>
      <h2 className="h2"> Tours </h2>

      <section>
        <div className="para">
          <p>
            {" "}
            JUL16 MUMBAI.SUN TOE ALBUM{" "}
            <button className="button1">BUY TICKETS</button>{" "}
          </p>
          <hr />
          <p>
            {" "}
            TAJ ALBUM,MUMBAI <button className="button1">BUY TICKETS</button>
          </p>
          <hr />
          <p>
            ROZ ALBUM,PUNE <button className="button1">BUY TICKETS</button>
          </p>
          <hr />
          <p>
            MIMMI ALBUM,MUMBAI <button className="button1">BUY TICKETS</button>
          </p>
          <hr />
          <p>
            LIGGI ALBUM,MUMBAI <button className="button1">BUY TICKETS</button>
          </p>
          <hr />
          <p>
            ROSHNI ALBUM,MUMBAI <button className="button1">BUY TICKETS</button>
          </p>
        </div>
      </section>
    </Fragment>
  );
};
export default Home;