"use client";

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ScrapingResult } from './lib/definitions';
import { motion } from 'framer-motion';

export default function Scraping() {
  const [results, setResults] = useState<ScrapingResult | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const results = await fetch("/api/scraper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            siteUrl: "https://www.tiktok.com/@midudev",
          }),
        }).then((res) => res.json());
        setResults(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main>
  <div
    className="h-full w-full items-center justify-center lg:p-16 xl:p-16 p-10"
    style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
    }}
  >
    <h1
      className="mt-8 text-xl md:text-3xl xl:text-5xl lg:text-5xl items-center text-center xl:p-6 lg:p-6 text-blue-500 font-bold"
    >
      TIKTOK SCRAPPING
    </h1>
    {results?.videoList && (
      <Swiper
        slidesPerView={2}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          360: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          820: {
            slidesPerView: 3.5,
          },
          1200: {
            slidesPerView: 5.5,
            spaceBetween: 40,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={3000}
        spaceBetween={40}
        centeredSlides={false}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {results.videoList.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="xl:p-2 lg:p-2 xl:mb-12 lg:mb-12 mb-16 md:p-6 p-3">
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform transition-transform duration-500 hover:scale-105"
              >
                <motion.img
                  whileHover={{ scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  src={data.thumbnail.split(",")[0]}
                  alt={`TikTok Video ${index + 1}`}
                  width={248}
                  height={394}
                  className={`xl:rounded-2xl blur-sm hover:blur-none erase-out lg:rounded-2xl rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-black/30`}
                  style={{
                    border: '4px solid #fff',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                  }}
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </div>
    </main>

  );
}
