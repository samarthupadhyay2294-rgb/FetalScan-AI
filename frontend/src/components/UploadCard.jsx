import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiX, FiRefreshCw } from 'react-icons/fi';

export default function UploadCard({ file, preview, onFileSelect, onRemove, onReplace, error }) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) onFileSelect(dropped);
    },
    [onFileSelect]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card relative p-8 transition ${dragging ? 'ring-2 ring-primary' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center py-12 text-center">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FiUploadCloud size={36} />
          </motion.div>
          <p className="mt-6 text-xl font-semibold text-slate-900">Drag & drop ultrasound image</p>
          <p className="mt-2 text-sm text-slate-500">or click to browse (PNG, JPG, max 10MB)</p>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} aria-label="Upload ultrasound image" />
        </label>
      ) : (
        <div className="space-y-4">
          {preview && (
            <img src={preview} alt="Ultrasound preview" className="mx-auto max-h-80 rounded-xl object-contain shadow-card" />
          )}
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <p><strong>File:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</p>
            <p><strong>Type:</strong> {file.type || 'image'}</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onReplace} className="btn-secondary flex-1"><FiRefreshCw /> Replace</button>
            <button type="button" onClick={onRemove} className="btn-secondary flex-1 text-red-600"><FiX /> Remove</button>
          </div>
        </div>
      )}
      {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
    </motion.div>
  );
}
