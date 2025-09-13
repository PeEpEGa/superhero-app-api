import { supabase } from "../db/supabase";

export const uploadService = {
  async uploadFile(
    file: Buffer,
    filename: string,
    folder: string
  ): Promise<string> {
    const key = `${folder}/${Date.now()}-${filename}`;

    const { data: fileData, error } = await supabase.storage
      .from(folder)
      .upload(key, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Failed to upload file:", error);
      throw new Error("Could not upload file");
    }

    if (!fileData?.path) throw new Error("Invalid file path returned");

    const { data: urlData } = supabase.storage
      .from(folder)
      .getPublicUrl(fileData.path);

    if (!urlData.publicUrl) throw new Error("Failed to get public URL");

    return urlData.publicUrl;
  },

  async uploadFiles(
    files: { buffer: Buffer; originalName: string }[],
    folder: string
  ): Promise<string[]> {
    return Promise.all(
      files.map((file) =>
        this.uploadFile(file.buffer, file.originalName, folder)
      )
    );
  },
};
