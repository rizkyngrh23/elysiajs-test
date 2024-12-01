import { Elysia } from "elysia";
import { readFileSync } from "fs";
import { join } from "path";

const app = new Elysia();

app.get("/", () => {
  const html = readFileSync(join(__dirname, "index.html"), "utf-8");
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
});

app.get("/static/*", ({ params }) => {
  const filePath = join(__dirname, params['*']);
  const file = readFileSync(filePath);
  const ext = filePath.split('.').pop();
  const contentType = ext === 'css' ? 'text/css' : ext === 'js' ? 'application/javascript' : ext === 'jpg' || ext === 'png' ? `image/${ext}` : 'text/plain';
  return new Response(file, {
    headers: { "Content-Type": contentType },
  });
});

app.get("/assets/*", ({ params }) => {
  const filePath = join(__dirname, 'assets', params['*']);
  const file = readFileSync(filePath);
  const ext = filePath.split('.').pop();
  const contentType = ext === 'webp' || ext === 'jpg' || ext === 'png' ? `image/${ext}` : 'text/plain';
  return new Response(file, {
    headers: { "Content-Type": contentType },
  });
});

app.get("/api/data", () => {
  return new Response(JSON.stringify({ message: "Hello from Elysia!" }), {
    headers: { "Content-Type": "application/json" },
  });
});

app.post("/api/submit", async ({ request }) => {
  const data = await request.json();
  console.log("Form submitted:", data);
  return new Response(JSON.stringify({ status: "success", data }), {
    headers: { "Content-Type": "application/json" },
  });
});

app.get("/api/quote", () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return new Response(JSON.stringify({ quote: randomQuote }), {
    headers: { "Content-Type": "application/json" },
  });
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

const quotes = [
  "I'm the Elysia who loves everyone and is loved by everyone!",
  "A smile is the most beautiful curve on anyone's face.",
  "A perfect memory is not about how it ends, but about cherishing every moment.",
  "A flame burns the brightest before it goes out, but memories can keep it shining forever.",
  "Who says perfection doesn't exist? Look at me, aren't I the perfect example?",
  "I believe that every encounter is a gift.",
  "Beauty is not just in appearance, but in the heart that appreciates it.",
  "I think you'll find that I'm full of surprises, just like life.",
  "Everyone has their own shining moments; let me help you find yours!",
  "Sometimes, we must let go of the past to embrace a brighter tomorrow.",
  "If you're ever feeling down, just think of me. I'll bring a smile to your face in no time!",
  "When the stars shine brightest, that's when they reflect our dreams.",
  "Elegance is not just how you look but how you live.",
  "Even in a world of chaos, there's always room for beauty and love.",
  "Do you believe in destiny? I think we were destined to meet."
];
