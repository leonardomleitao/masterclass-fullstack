import Logo from "../template/logo.component";

export default function Processing() {
  return (
    <div className="h-screen">
      <div
        className="
          flex flex-col justify-center items-center
          absolute top-0 left-0 w-full h-full gap-2
          bg-black/90 text-center
        "
      >
        <Logo />
        <span className="font-light text-zinc-500 ml-3">Processing...</span>
      </div>
    </div>
  );
}
