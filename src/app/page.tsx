"use client";
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  const words = ["love", "care", "passion", "elegance"];
  return (
    <div className="relative h-[40rem] flex justify-center items-center px-4 bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg"
        style={{
          backgroundImage: 'url("https://imgs.search.brave.com/OOqTWEszTnJHyBalQJaxz5iMnswMlXTVxiSPoVfLgsA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ydXN0aWMtYnJl/YWQtYmFrZXJ5LXBp/bmctYmFja2dyb3Vu/ZC10b3Atdmlldy13/aXRoLWNvcHktc3Bh/Y2UtcGluay1iYWNr/Z3JvdW5kXzczMTc5/MC0zMTc3NC5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw")',
        }}
      ></div>

      <div className="absolute top-4 right-4 z-20 underline text-yellow-400 shadow-xl ">
        <div className="text-2xl font-bold cursor-pointer"><Link href={'/user/login'}>Login</Link></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-4xl mx-auto font-bold text-neutral-600 dark:text-neutral-400 text-center">
          Welcome to Amol Bakery, where every bite is baked <br />
          with
          <FlipWords words={words} /> <br />
        </div>
        <div className="mt-7 flex justify-around items-center flex-wrap">
          <Button className="m-2">About us</Button>
          <Link href={'user/login'}>
          <Button className="m-2">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>

  );
}
