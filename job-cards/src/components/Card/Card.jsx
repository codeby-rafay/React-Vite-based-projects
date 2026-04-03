import { Bookmark } from "lucide-react";
import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img src={props.job.brandlogo} alt="Logo" />
        <button>
          Save <Bookmark />
        </button>
      </div>
      <div className={styles.center}>
        <h3>
          {props.job.company} <span>{props.job.datePosted}</span>
        </h3>
        <h2>{props.job.position}</h2>
        <div>
          <h4>{props.job.tag_1}</h4>
          <h4>{props.job.tag_2}</h4>
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <h3>${props.job.pay}/hr</h3>
          <p>{props.job.location}</p>
        </div>
        <button>Apply Now</button>
      </div>
    </div>
  );
};

export default Card;
