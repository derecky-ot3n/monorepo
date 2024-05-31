import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="fixed -z-10 h-screen w-full bg-main-mobile md:bg-main bg-cover bg-center"></div>
      <div className="flex flex-col h-screen w-full justify-start items-center px-4">
        <Image
          src="/svgs/logo.svg"
          alt="Green Carbom - Amazonic, logo"
          className="w-[160px] md:w-[192px] md:h-[52.8px] h-[44px] mt-8 md:mt-10"
          height={132}
          width={480}
          priority
        />

        {children}
      </div>
    </main>
  );
}
