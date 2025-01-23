import { Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <p className="text-lg">
          Desenvolvido por <span className="font-bold">Adan Einstein</span>
        </p>
        <Link
          href="https://www.linkedin.com/in/adaneinstein"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white p-1 rounded-sm"
        >
          <Linkedin />
        </Link>
      </div>
    </footer>
  );
}