import api from './api';

export async function runPrediction(file, patientId = '', gestationalAge = '') {
  const form = new FormData();
  form.append('file', file);
  if (patientId) form.append('patient_id', patientId);
  if (gestationalAge) form.append('ga', gestationalAge);
  const { data } = await api.post('/predict', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function fetchReport(id) {
  const { data } = await api.get(`/report/${id}`);
  return data.data;
}

export async function fetchHistory(limit = 50) {
  const { data } = await api.get('/history', { params: { limit } });
  return data.data;
}

export async function fetchReferenceRange(ga) {
  const { data } = await api.get(`/reference/ci/${ga}`);
  return data.data;
}

export function getDownloadUrl(id) {
  return `/api/download/${id}`;
}

export function resolveAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/outputs')) return path;
  return `/api${path.startsWith('/') ? '' : '/'}${path}`;
}
