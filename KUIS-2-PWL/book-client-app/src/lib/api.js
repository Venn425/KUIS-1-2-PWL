const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBuku() {
  const response = await fetch(`${API_URL}/buku`);
  if (!response.ok) throw new Error('Gagal mengambil data buku');
  return response.json();
}

export async function fetchBukuById(id) {
  const response = await fetch(`${API_URL}/buku/${id}`);
  if (!response.ok) throw new Error('Buku tidak ditemukan');
  return response.json();
}

export async function createBuku(data) {
  const response = await fetch(`${API_URL}/buku`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Gagal membuat buku');
  return response.json();
}

export async function updateBuku(id, data) {
  const response = await fetch(`${API_URL}/buku/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Gagal memperbarui buku');
  return response.json();
}

export async function deleteBuku(id) {
  const response = await fetch(`${API_URL}/buku/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Gagal menghapus buku');
  return response.json();
}

// Peminjaman API
export async function fetchPeminjaman() {
  const response = await fetch(`${API_URL}/peminjaman`);
  if (!response.ok) throw new Error('Gagal mengambil data peminjaman');
  return response.json();
}

export async function fetchPeminjamanById(id) {
  const response = await fetch(`${API_URL}/peminjaman/${id}`);
  if (!response.ok) throw new Error('Peminjaman tidak ditemukan');
  return response.json();
}

export async function createPeminjaman(data) {
  const response = await fetch(`${API_URL}/peminjaman`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Gagal membuat peminjaman');
  return response.json();
}

export async function updatePeminjaman(id, data) {
  const response = await fetch(`${API_URL}/peminjaman/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Gagal memperbarui peminjaman');
  return response.json();
}

export async function deletePeminjaman(id) {
  const response = await fetch(`${API_URL}/peminjaman/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Gagal menghapus peminjaman');
  return response.json();
}
