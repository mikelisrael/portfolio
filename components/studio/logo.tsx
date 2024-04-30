import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={50}
      height={50}
      className="object-cover"
      priority
    />
  );
};

export default Logo;
