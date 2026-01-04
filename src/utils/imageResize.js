export async function resizeImageFile(file, maxLong = 1200, quality = 0.7) {
  // Create an image element to load file data
  const dataUrl = await new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = dataUrl;
  });

  const ratio =
    img.width > img.height ? img.width / maxLong : img.height / maxLong;
  const w = Math.round(img.width / Math.max(1, ratio));
  const h = Math.round(img.height / Math.max(1, ratio));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);

  const blob = await new Promise((res) =>
    canvas.toBlob(res, "image/jpeg", quality)
  );
  const resizedFile = new File(
    [blob],
    file.name.replace(/\.(png|jpg|jpeg)$/i, ".jpg"),
    { type: "image/jpeg" }
  );
  return resizedFile;
}
