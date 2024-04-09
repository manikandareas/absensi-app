import { BadRequestException, Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
interface IQrcodeService {
  generateQrCode(data: string): Promise<string>;
}

@Injectable()
export class QrcodeService implements IQrcodeService {
  async generateQrCode(data: string): Promise<string> {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(data);
      return qrCodeDataURL;
    } catch (error) {
      throw new BadRequestException('Failed to generate QR code.');
    }
  }
}
