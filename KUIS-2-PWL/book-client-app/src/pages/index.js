import { useState } from 'react';
import { useBuku } from '@/hooks/useBuku';
import styles from '@/styles/Home.module.css';
import { createPeminjaman } from '@/lib/api';

export default function Home() {
  const { bukuList, loading, error } = useBuku();
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    nama_peminjam: '',
    tanggal_pinjam: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setFormData({
      nama_peminjam: '',
      tanggal_pinjam: new Date().toISOString().split('T')[0]
    });
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitPeminjaman = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      await createPeminjaman({
        id_buku: selectedBook._id,
        nama_peminjam: formData.nama_peminjam,
        tanggal_pinjam: new Date(formData.tanggal_pinjam).toISOString()
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedBook(null);
        setSubmitSuccess(false);
      }, 2000);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.container}><p>Loading...</p></div>;
  if (error) return <div className={styles.container}><p style={{ color: 'red' }}>Error: {error}</p></div>;

  return (
    <div className={styles.container}>
      <h1>IBIK Digital Library</h1>
      
      <div className={styles.bookList}>
        {bukuList.length === 0 ? (
          <p>Tidak ada buku</p>
        ) : (
          bukuList.map((book) => (
            <div 
              key={book._id} 
              className={styles.bookCard}
              onClick={() => handleBookClick(book)}
            >
              <h3>{book.judul}</h3>
              <p><strong>Pengarang   :</strong> {book.author}</p>
              <p><strong>Tahun Terbit:</strong> {book.tahun_terbit}</p>
              <p><strong>Stok        :</strong> {book.stok}</p>
              <button className={styles.pinjamBtn}>Pinjam Buku</button>
            </div>
          ))
        )}
      </div>

      {/* Modal Peminjaman */}
      {selectedBook && (
        <div className={styles.modalOverlay} onClick={() => setSelectedBook(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Pinjam Buku: {selectedBook.judul}</h2>
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedBook(null)}
              >
                ✕
              </button>
            </div>

            {submitSuccess && (
              <div className={styles.successMessage}>
                ✓ Peminjaman berhasil ditambahkan!
              </div>
            )}

            {submitError && (
              <div className={styles.errorMessage}>
                ✕ Error: {submitError}
              </div>
            )}

            <form onSubmit={handleSubmitPeminjaman} className={styles.peminjamanForm}>
              <div className={styles.formGroup}>
                <label htmlFor="nama_peminjam">Nama Peminjam:</label>
                <input
                  type="text"
                  id="nama_peminjam"
                  name="nama_peminjam"
                  value={formData.nama_peminjam}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="tanggal_pinjam">Tanggal Pinjam:</label>
                <input
                  type="date"
                  id="tanggal_pinjam"
                  name="tanggal_pinjam"
                  value={formData.tanggal_pinjam}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Peminjaman'}
                </button>
                <button 
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setSelectedBook(null)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}