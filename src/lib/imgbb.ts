export const IMGBB_API_KEY = 'f20f56a14ab8d529a98745b32c5ef961';
export const IMGBB_ENDPOINT = 'https://api.imgbb.com/1/upload';

export interface ImgBBUploadResult {
  success: boolean;
  url?: string;
  displayUrl?: string;
  thumbUrl?: string;
  deleteUrl?: string;
  title?: string;
  error?: string;
}

/**
 * Uploads an image File or Base64 string directly to imgbb.com CDN
 */
export async function uploadImageToImgBB(
  fileOrBase64: File | string,
  name?: string
): Promise<ImgBBUploadResult> {
  try {
    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);

    if (typeof fileOrBase64 === 'string') {
      // Remove base64 header if present
      const cleanBase64 = fileOrBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      formData.append('image', cleanBase64);
    } else {
      formData.append('image', fileOrBase64);
    }

    if (name) {
      formData.append('name', name);
    }

    const response = await fetch(IMGBB_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success && data.data) {
      return {
        success: true,
        url: data.data.url,
        displayUrl: data.data.display_url,
        thumbUrl: data.data.thumb?.url || data.data.url,
        deleteUrl: data.data.delete_url,
        title: data.data.title,
      };
    } else {
      return {
        success: false,
        error: data.error?.message || 'Failed to upload image to imgbb',
      };
    }
  } catch (err: any) {
    console.error('ImgBB upload error:', err);
    return {
      success: false,
      error: err.message || 'Network error while contacting imgbb.com API',
    };
  }
}
