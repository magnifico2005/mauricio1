import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "assets", "images", "originals");
const OUT_DIR = path.join(ROOT, "src", "assets", "images");

const jobs = [
  {
    file: "dr-mauricio-hero-authoridade.png",
    out: "dr-mauricio-hero",
    widths: [480, 720, 960, 1280],
    // Recorte fechado no retrato (2:3), removendo fundo excedente acima da cabeça
    // e nas laterais para um enquadramento mais editorial e sem crop residual no CSS.
    crop: { left: 30, top: 55, width: 944, height: 1416 },
  },
  { file: "editorial-performance.jpg", out: "editorial-performance", widths: [480, 800, 1200] },
  { file: "editorial-consultation.jpg", out: "editorial-consultation", widths: [480, 800, 1200] },
  { file: "article-rotina.png", out: "article-rotina", widths: [480, 800, 1200] },
  { file: "article-performance.png", out: "article-performance", widths: [480, 800, 1200] },
  { file: "dr-mauricio-consulta-retrato.png", out: "dr-mauricio-consulta-retrato", widths: [480, 800, 1200] },
  { file: "dr-mauricio-consultorio.png", out: "dr-mauricio-consultorio", widths: [480, 800, 1200] },
  { file: "dr-mauricio-consulta-performance.png", out: "dr-mauricio-consulta-performance", widths: [480, 800, 1200] },
];

// Logos: PNG de origem com transparência real — preservar alpha, sem fallback JPG.
const logoJobs = [
  { file: "logo-mauricio-neiva.png", out: "logo-mauricio-neiva", widths: [96, 192] },
  { file: "logo-mki.png", out: "logo-mki", widths: [80, 160] },
];

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const imageMeta = {};

  for (const job of jobs) {
    const srcPath = path.join(SRC_DIR, job.file);
    const source = job.crop ? sharp(srcPath).extract(job.crop) : sharp(srcPath);
    const meta = job.crop
      ? { width: job.crop.width, height: job.crop.height }
      : await sharp(srcPath).metadata();
    const maxWidth = meta.width || 1600;
    const aspect = meta.height / meta.width;
    imageMeta[job.out] = {
      widths: job.widths,
      largestWidth: job.widths[job.widths.length - 1],
      largestHeight: Math.round(job.widths[job.widths.length - 1] * aspect),
    };

    for (const width of job.widths) {
      const targetWidth = Math.min(width, maxWidth);
      const base = source.clone().resize({ width: targetWidth, withoutEnlargement: true });

      await base.clone().avif({ quality: 60 }).toFile(path.join(OUT_DIR, `${job.out}-${width}.avif`));
      await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, `${job.out}-${width}.webp`));
      await base.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT_DIR, `${job.out}-${width}.jpg`));
    }
    console.log(`Processado: ${job.file} -> ${job.widths.length * 3} arquivos`);
  }

  const logoMeta = {};
  for (const job of logoJobs) {
    const srcPath = path.join(SRC_DIR, job.file);
    const meta = await sharp(srcPath).metadata();
    const maxWidth = meta.width || 512;
    const aspect = meta.height / meta.width;
    logoMeta[job.out] = {
      widths: job.widths,
      largestWidth: job.widths[job.widths.length - 1],
      largestHeight: Math.round(job.widths[job.widths.length - 1] * aspect),
    };

    for (const width of job.widths) {
      const targetWidth = Math.min(width, maxWidth);
      const base = sharp(srcPath).resize({ width: targetWidth, withoutEnlargement: true });

      await base.clone().avif({ quality: 70 }).toFile(path.join(OUT_DIR, `${job.out}-${width}.avif`));
      await base.clone().webp({ quality: 90 }).toFile(path.join(OUT_DIR, `${job.out}-${width}.webp`));
      await base.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, `${job.out}-${width}.png`));
    }
    console.log(`Processado: ${job.file} -> ${job.widths.length * 3} arquivos`);
  }

  await writeFile(
    path.join(ROOT, "src", "_data", "imageMeta.json"),
    JSON.stringify(imageMeta, null, 2)
  );
  await writeFile(
    path.join(ROOT, "src", "_data", "logoMeta.json"),
    JSON.stringify(logoMeta, null, 2)
  );

  // OG default 1200x630 a partir do retrato do médico
  await sharp(path.join(SRC_DIR, "dr-mauricio-hero-authoridade.png"))
    .resize({ width: 1200, height: 630, fit: "cover", position: "top" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(OUT_DIR, "og-default.jpg"));
  console.log("Processado: og-default.jpg");

  // Favicons a partir da logo do médico (mantém a marca real no lugar do ícone genérico anterior)
  const logoSrc = path.join(SRC_DIR, "logo-mauricio-neiva.png");
  await sharp(logoSrc).resize(32, 32).png().toFile(path.join(OUT_DIR, "favicon-32.png"));
  await sharp(logoSrc).resize(180, 180).png().toFile(path.join(OUT_DIR, "favicon-180.png"));
  await sharp(logoSrc).resize(512, 512).png().toFile(path.join(OUT_DIR, "favicon-512.png"));
  console.log("Processado: favicons (32, 180, 512) a partir da logo do médico");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
