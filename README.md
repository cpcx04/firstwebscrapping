# 🕵️‍♂️ TikTok Scraping Project 🚀

This project is a **TikTok Scraper** built using `puppeteer-core` and `chromium` for scraping and `Swiper`, `Framer Motion` for UI animation. It scrapes TikTok videos from a user’s page and displays them in a beautiful, animated carousel.

## 📦 Key Packages Used

| Package               | Description                                                 | Links                                                                                   |
|-----------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| `puppeteer-core`       | A headless browser framework for scraping web content       | [Puppeteer Core](https://www.npmjs.com/package/puppeteer-core)                          |
| `@sparticuz/chromium`  | Chromium binaries for use in AWS Lambda/Headless environments| [Sparticuz Chromium](https://github.com/Sparticuz/chromium)                             |
| `swiper`               | A modern mobile touch slider for building carousels         | [Swiper](https://www.npmjs.com/package/swiper)                                          |
| `framer-motion`        | A library for creating animations and transitions in React  | [Framer Motion](https://www.npmjs.com/package/framer-motion)                            |

## 🚀 Features

- Scrape TikTok videos using **Puppeteer** and **Chromium**.
- Display videos in a **Swiper.js** carousel.
- Animations and hover effects using **Framer Motion**.
- **Responsive design** with breakpoints for different screen sizes.
  
## 🛠️ How to Set Up

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Step 1: Clone the Repository

```bash
git clone <repo-url>
cd <project-directory>
```
### Step 2: Install Dependencies

```bash
npm install
````
This will install all the necessary packages from `package.json` including `puppeteer-core`, `swiper`, `chromium`, and `framer-motion`.

### Step 3: Run the Scraper

Ensure your environment has the correct **Chromium binary** path for the scraper.

```bash
export CHROME_EXECUTABLE_PATH='/path/to/chromium'
````

Start the scrapper by adding
```bash
npm run dev
```
### API Route

This project exposes an API route that scrapes a TikTok user's page:

- **Endpoint**: `/api/scraper`
- **Method**: `POST`
- **Payload**: JSON containing the `siteUrl` (TikTok profile link).

### Example Payload

```json
{
  "siteUrl": "https://www.tiktok.com/@midudev"
}
```
### Step 4: Open the Project in Your Browser

Go to `http://localhost:3000` to see the carousel with scraped TikTok videos.

## 🖼️ UI Component

The UI uses the following technologies:

- **Swiper** for the responsive video carousel.
- **Framer Motion** to add subtle hover animations and scaling effects to each video.

```jsx
<Swiper
  slidesPerView={2}
  breakpoints={{
    0: { slidesPerView: 1.5 },
    360: { slidesPerView: 2.5, spaceBetween: 10 },
    820: { slidesPerView: 3.5 },
    1200: { slidesPerView: 5.5, spaceBetween: 40 },
  }}
  loop={true}
  autoplay={{ delay: 2000, disableOnInteraction: false }}
  speed={3000}
  spaceBetween={40}
  modules={[Pagination, Autoplay]}
  className="mySwiper"
>
  {results.videoList.map((data, index) => (
    <SwiperSlide key={index}>
      <motion.img
        whileHover={{ scale: 0.8 }}
        transition={{ duration: 0.1 }}
        src={data.thumbnail.split(",")[0]}
        alt={`TikTok Video ${index + 1}`}
      />
    </SwiperSlide>
  ))}
</Swiper>
```
## ✨ Custom Styling

This project includes custom styles to enhance the UI/UX:

```css
/* Custom card styling */
.card {
  border: '4px solid #fff';
  box-shadow: '0px 10px 20px rgba(0,0,0,0.1)';
  transition: transform 0.5s;
}

/* Hover effects */
.card:hover {
  transform: scale(1.05);
  box-shadow: '0px 10px 20px rgba(0,0,0,0.3)';
}
```
## 🚨 Error Handling

If the scraper encounters an error (e.g., site down or wrong URL), the error is logged in the console.

```js
try {
  const results = await fetch("/api/scraper", {...});
} catch (error) {
  console.error('Error fetching data:', error);
}
```
## 🤖 Environment Variables

To run this project locally, set the **Chromium executable path** in the environment variables:

```bash
export CHROME_EXECUTABLE_PATH='/path/to/chromium'
```
## 📑 Folder Structure

```bash
📦 tiktok-scraper
 ┣ 📂api
 ┃ ┗ 📜scraper.ts    # Puppeteer scraping logic
 ┣ 📂components
 ┃ ┗ 📜Scraping.tsx  # Swiper & Framer Motion for UI
 ┣ 📜package.json    # NPM packages
 ┣ 📜tsconfig.json    # TypeScript configuration
 ┣ 📜next.config.js   # Next.js configuration
 ┗ 📜README.md        # This file!
```
## 🌟 Contributing

Feel free to submit issues and pull requests! Contributions are always welcome. 😊

## 📜 License

This project is licensed under the MIT License.

