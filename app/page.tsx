"use client";

import { useState } from "react";
import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Categories from "@/components/sections/Categories";
import WhyStateSwap from "@/components/sections/WhyStateSwap";
import ForEntrepreneurs from "@/components/sections/ForEntrepreneurs";
import LaunchTimeline from "@/components/sections/LaunchTimeline";
import JoinModal from "@/components/JoinModal";
import Footer from "@/components/Footer";

export default function Home() {
  const content = getContent();
  const [modalOpen, setModalOpen] = useState(false);

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  // Detect logo — set to undefined so Navbar falls back to text logo until file is added
  const logoSrc = undefined;

  return (
    <>
      <Navbar content={content} onJoinClick={open} logoSrc={logoSrc} />
      <main>
        <Hero content={content} onJoinClick={open} />
        <HowItWorks content={content} />
        <Categories content={content} onJoinClick={open} />
        <WhyStateSwap content={content} />
        <ForEntrepreneurs content={content} onJoinClick={open} />
        <LaunchTimeline content={content} onJoinClick={open} />
      </main>
      <Footer content={content} onJoinClick={open} />
      <JoinModal isOpen={modalOpen} onClose={close} content={content} />
    </>
  );
}
