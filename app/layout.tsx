import "./globals.css";

export const metadata = {
    title: "Tugio, Your instant messaging app!",
    description: "An instant messaging app for everyone!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
