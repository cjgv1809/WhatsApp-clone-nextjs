import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11-1019x1024.png"
          alt="WhatsApp Logo"
          style={{ marginBottom: 10 }}
          height={200}
        />
        <Circle color="#3C8C28" size={60} />
      </div>
    </center>
  );
}

export default Loading;
