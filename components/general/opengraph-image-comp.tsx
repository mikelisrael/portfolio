import Image from "next/image";

type Props = { title: string };

function OpenGraphImageComponent({ title }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-background-secondary p-10">
      <div className="relative size-20">
        <Image src="/logo.png" alt="logo" fill />
      </div>

      <h2 className="mt-6 line-clamp-2 text-3xl font-bold">{title}</h2>

      <small className="text-sm">Michael Israel</small>
    </div>
  );
}

export default OpenGraphImageComponent;
