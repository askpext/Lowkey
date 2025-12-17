const btn = document.getElementById("download") as HTMLButtonElement | null;
const prog = document.getElementById("progress") as HTMLDivElement | null;

if (!btn || !prog) {
  throw new Error("Required DOM elements not found");
}

btn.onclick = async () => {
  btn.disabled = true;

  window.api.onProgress((p: number) => {
    prog.textContent = `Downloading model: ${p}%`;
  });

  await window.api.downloadModel();
  await window.api.startLlama();

  location.reload();
};
