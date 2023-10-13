import "./styles.css";

const Home = () => {
  return (
    <div className="gallery">
      <div style={{ backgroundImage: 'url("./assets/lnd.jpg")' }}>LND</div>
      <div style={{ backgroundImage: 'url("./assets/zab.jpg")' }}>ZAB</div>
      <div style={{ backgroundImage: 'url("./assets/gdy.jpg")' }}>GDY</div>
      <div style={{ backgroundImage: 'url("./assets/bel.jpg")' }}>BEL</div>
    </div>
  );
};

export default Home;
