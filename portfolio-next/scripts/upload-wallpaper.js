const Minio = require('minio');

const mc = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
});

const BUCKET = 'portfolio';
const FILE = 'D:\\gpb-codes\\wallpaper.webp';
const OBJECT = 'wallpaper.webp';

async function main() {
  const exists = await mc.bucketExists(BUCKET);
  if (!exists) {
    await mc.makeBucket(BUCKET);
    console.log(`Bucket "${BUCKET}" created`);
  }

  await mc.fPutObject(BUCKET, OBJECT, FILE, { 'Content-Type': 'image/webp' });
  console.log(`Uploaded ${FILE} -> ${BUCKET}/${OBJECT}`);

  const url = `http://localhost:9000/${BUCKET}/${OBJECT}`;
  console.log(`Public URL: ${url}`);
}

main().catch(console.error);
