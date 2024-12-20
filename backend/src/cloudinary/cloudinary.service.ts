
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-respone';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<string> { 
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        if (result.result !== 'ok') {
          return reject(new Error('Failed to delete file on Cloudinary'));
        }
        resolve();
      });
    });
  }
}


