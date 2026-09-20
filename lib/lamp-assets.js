/** Retry transient asset failures while giving slow connections time to finish. */
export async function fetchLampAsset(url, signal, onProgress = () => {}) {
 for (let attempt = 0; attempt < 3; attempt++) {
  signal?.throwIfAborted();
  const controller = new AbortController();
  const cancel = () => controller.abort();
  signal?.addEventListener('abort', cancel, { once: true });
  const timeout = setTimeout(cancel, 25000);
  try {
   const response = await fetch(url, { signal: controller.signal, cache: attempt ? 'reload' : 'default' });
   if (!response.ok) throw new Error(`Lamp asset ${response.status}: ${url}`);
   if (!response.body) { const bytes = await response.arrayBuffer(); onProgress(1); return bytes; }
   const total = Number(response.headers.get('content-length'));
   const reader = response.body.getReader(), chunks = [];
   let loaded = 0;
   while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value); loaded += value.length;
    if (total) onProgress(Math.min(loaded / total, 1));
   }
   const bytes = new Uint8Array(loaded); let offset = 0;
   for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
   onProgress(1); return bytes.buffer;
  } catch (error) {
   if (signal?.aborted || attempt === 2) throw error;
  } finally { clearTimeout(timeout); signal?.removeEventListener('abort', cancel); }
  await delay(750 * (attempt + 1), signal);
 }
 throw new Error('Lamp asset could not be loaded');
}
function delay(milliseconds, signal) {
 signal?.throwIfAborted();
 return new Promise((resolve, reject) => {
  const finish = () => { signal?.removeEventListener('abort', abort); resolve(); };
  const timer = setTimeout(finish, milliseconds);
  const abort = () => { clearTimeout(timer); signal?.removeEventListener('abort', abort); reject(new DOMException('Lamp asset cancelled', 'AbortError')); };
  signal?.addEventListener('abort', abort, { once: true });
 });
}
export async function lampImage(url, type, signal) {
 const data = await fetchLampAsset(url, signal);
 signal?.throwIfAborted();
 const objectUrl = URL.createObjectURL(new Blob([data], { type }));
 try {
  const image = new Image(); image.src = objectUrl;
  await image.decode(); signal?.throwIfAborted(); return image;
 } finally { URL.revokeObjectURL(objectUrl); }
}
