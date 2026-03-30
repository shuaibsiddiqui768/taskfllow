import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TaskFlow — Smart Task Manager",
  description:
    "A beautiful, modern task management app. Organize your work, track progress, and boost productivity.",
  keywords: ["task manager", "productivity", "to-do", "project management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1e293b",
                color: "#e2e8f0",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#1e293b",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#1e293b",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
