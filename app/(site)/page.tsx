import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image alt="Tugio's logo" height="0" width="0" className="mx-auto w-52 h-auto" src="/images/logo2.svg" />
            </div>
            <AuthForm />
        </div>
    );
}
