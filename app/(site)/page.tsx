import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { IoLogoGithub } from "react-icons/io5";

export default function Home() {
    return (
        <div className="flex min-h-full flex-col justify-center pt-12 sm:px-6 lg:px-8 sm:bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image alt="Tugio's logo" height="0" width="0" className="mx-auto w-52 h-auto" src="/images/logo2.svg" />
            </div>
            <AuthForm />
            <div className="flex justify-center text-lg font-medium text-gray-500 mt-6 mb-3 md:mt-8 md:mb-4 lg:mt-14 lg:mb-0">
                <a className="flex hover:text-gray-700" href="https://github.com/abacaxiguy/tugio" target="_blank" rel="noopener noreferrer">
                    <IoLogoGithub className="mr-1.5 mt-1" />
                    Github
                </a>
            </div>
        </div>
    );
}
