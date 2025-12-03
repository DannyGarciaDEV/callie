import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Events Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Profile Cloudinary configuration (separate instance)
export const profileCloudinary = {
  cloud_name: process.env.CLOUDINARY_PROFILE_NAME,
  api_key: process.env.CLOUDINARY_PROFILE_KEY,
  api_secret: process.env.CLOUDINARY_PROFILE_SECRET,
};

// Helper function to upload to events bucket
export const uploadToEvents = async (fileBuffer, folder = 'callie-events') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Helper function to upload to profile bucket (separate Cloudinary account)
// Note: This uses a workaround since Cloudinary SDK doesn't support multiple instances easily
// For production, consider using the REST API directly or a library that supports multiple accounts
export const uploadToProfile = async (fileBuffer, folder = 'callie-profile') => {
  return new Promise((resolve, reject) => {
    // Save original config
    const originalConfig = {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key,
      api_secret: cloudinary.config().api_secret,
    };
    
    try {
      // Temporarily set profile config
      cloudinary.config({
        cloud_name: profileCloudinary.cloud_name,
        api_key: profileCloudinary.api_key,
        api_secret: profileCloudinary.api_secret,
      });
      
      // Use upload_stream with current config
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          // Always restore original config
          cloudinary.config(originalConfig);
          
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(fileBuffer);
    } catch (error) {
      // Restore config on error
      cloudinary.config(originalConfig);
      reject(error);
    }
  });
};

