import Head from "next/head";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    const canvas = document.querySelector(".confetti") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 5,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 + 1,
      rotation: Math.random() * 360,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));

    function drawHeart(
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size, -size / 2, -size, size, 0, size * 1.5);
      ctx.bezierCurveTo(size, size, size, -size / 2, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function updateHearts() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((heart) => {
        heart.x += heart.dx;
        heart.y += heart.dy;
        heart.rotation += 1;

        if (heart.y > canvas.height) heart.y = 0;
        if (heart.x > canvas.width) heart.x = 0;
        if (heart.x < 0) heart.x = canvas.width;

        drawHeart(heart.x, heart.y, heart.size, heart.rotation, heart.color);
      });
    }

    function animate() {
      updateHearts();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const openModal = () => {
    const modal = document.getElementById("modal") as HTMLElement;
    modal.style.display = "flex";
  };

  const closeModal = () => {
    const modal = document.getElementById("modal") as HTMLElement;
    modal.style.display = "none";
  };

  return (
    <>
      <Head>
        <title>Happy Birthday, Dad!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className={styles.header}>
        <h1>Happy Birthday, dear Dad ❤️</h1>
        <p>May my dearest father live long and happy.</p>
      </header>

      <section className={styles.photoGallery}>
        <h2>❤️ Photo Gallery: (Family Memories) ❤️</h2>
        <div className={styles.album}>
          {Array.from({ length: 12 }).map((_, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={`/assets/family(${index + 1}).jpg`}
              alt={`Photo ${index + 1}`}
              className={styles.image}
            />
          ))}
        </div>
      </section>

      <section className={styles.videoMessage}>
        <h2>❤️ Video Message ❤️</h2>
        <video controls width="100%">
          <source src="/assets/emotional(1).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className={styles.timeline}>
        <h2>Memory Timeline</h2>
        <ul>
          <li>
            <span>2008-02-27:</span> First son was born
          </li>
          <li>
            <span>2016-04-20:</span> Middle son was born
          </li>
          <li>
            <span>2017-06-29:</span> Little son was born
          </li>
        </ul>
      </section>

      <section className={styles.gift}>
        <h2>Your Birthday Gift</h2>
        <button onClick={openModal} className={styles.button}>
          Open Gift
        </button>
      </section>

      <div className={styles.modal} id="modal">
        <div className={styles.modalContent}>
          <h2>❤️ We love you, Dad! ❤️</h2>
          <button onClick={closeModal} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Made with love by your children ❤️</p>
      </footer>

      <canvas className="confetti"></canvas>
    </>
  );
}
