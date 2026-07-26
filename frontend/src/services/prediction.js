import api from './api';
import { API_BASE, BACKEND_ORIGIN } from '../utils/constants';

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
  if (!BACKEND_ORIGIN) {
    throw new Error('Backend URL is not configured. Set VITE_API_BASE on Render.');
  }
  return `${BACKEND_ORIGIN}/download/${id}`;
}

export function resolveAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (!BACKEND_ORIGIN) {
    console.warn('[FetalScan AI] BACKEND_ORIGIN missing; asset URL may 404:', path);
    return path;
  }
  if (path.startsWith('/outputs') || path.startsWith('/download')) {
    return `${BACKEND_ORIGIN}${path}`;
  }
  return `${BACKEND_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}
