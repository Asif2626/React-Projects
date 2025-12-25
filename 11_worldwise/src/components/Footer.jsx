import styles from "./Footer.module.css";

const Footer = ({ children }) => {
  return <footer className={styles.footer}>{children}</footer>;
};

// const Footer = () => {
//   return (
//     <footer className={styles.footer}>
//       <p className={styles.copyright}>
//         &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
//       </p>
//     </footer>
//   );
// };

export default Footer;
