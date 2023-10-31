import logo from "../assets/logo.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col gap-10">
      <div></div>
      <div className="flex justify-center flex-col items-center gap-5">
        <a href="/">
          <figure className="relative overflow-hidden rounded-lg h-[100px] w-[100px]">
            <img src={logo} alt="logo" sizes="100vw" className="object-cover" />
          </figure>
        </a>
        <h1 className="text-4xl font-bold text-fontcolor">SERVI-HUB</h1>
      </div>
      {children}
      <div></div>
    </div>
  );
}
