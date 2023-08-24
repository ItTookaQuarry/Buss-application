import Image from "next/image";
import pkm from "/public/pkm23.jpg";
export default function Loading() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Image
        src={pkm}
        alt="bus"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
