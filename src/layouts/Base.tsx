import { NextPage } from "next";
import Head from "next/head";
import React from "react";

interface Props {
  children: React.ReactNode[] | React.ReactNode
}

export const Base: NextPage<Props> = ({children}) => {
  return (
    <>
      <Head>
        <title>Khoerul Umam 🔥</title>
      </Head>
      <main>
        <div className="bg-slate-300 shadow-sm">
          <nav className="container bg-slate-300 mx-auto py-4 text-slate-900">
            <ul>
              <li>☕️ Khoerul Umam</li>
            </ul>
          </nav>
        </div>
        { children }
      </main>
    </>
  );
}