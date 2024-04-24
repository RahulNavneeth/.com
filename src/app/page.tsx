import Image from "next/image";

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="p-6 bg-gray-50 border-black border-[1px] shadow-md">
                Watch out -&gt; (<a href="https://github.com/RahulNavneeth" className="underline">github</a>)
            </div>
        </div>
    );
}
