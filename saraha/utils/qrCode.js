import QRCode from 'qrcode';

export async function generateQRCode({ data }) {
  const result = await QRCode.toDataURL(data);
  return result;
}
