import "@/styles/reset.style.css";
import "@/styles/globals.style.css";

// import { wrapper } from "@/redux-toolkit/store";
import GlobalProviders from "src/providers/GlobalProviders";
import AppLayout from "@/components/layout/AppLayout"; // Corrected import path

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalProviders>
          <AppLayout>
            {children}
          </AppLayout>
        </GlobalProviders>
      </body>
    </html>
  );
}
