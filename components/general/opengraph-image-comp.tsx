import Image from "next/image";

type Props = { title: string };

function OpenGraphImageComponent({ title }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontSize: 128,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        backgroundColor: "#333647",
        padding: "2.5rem",
        color: "#eaeaeb",
      }}
    >
      <div
        className="relative size-20"
        style={{
          width: "80px",
          height: "80px",
          backgroundImage: `url(https://mikelisrael.vercel.app/logo.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Image src="/logo.png" alt="logo" fill /> */}
      </div>

      <h2
        // className="mt-6 line-clamp-2 text-3xl font-bold"
        style={{
          fontSize: "30px",
          fontWeight: 700,
          WebkitLineClamp: 2,
          overflow: "hidden",
        }}
      >
        {title}
      </h2>

      <small style={{ fontSize: "14px" }}>Michael Israel</small>
    </div>
  );
}

export default OpenGraphImageComponent;
