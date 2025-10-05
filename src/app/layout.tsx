import { tiny5 } from "@/ui/fonts";
import "@/ui/globals.css";
import { DataProvider } from "./context/DataContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${tiny5.className} antialiased bg-black`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
