package com.example.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public Map uploadImage(MultipartFile file, String folder) throws IOException {
        try {
            return cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "hkayet8ram/" + folder,
                            "resource_type", "image",
                            "use_filename", true,
                            "unique_filename", true
                    )
            );
        } catch (Exception e) {
            throw new IOException("Erreur upload image Cloudinary: " + e.getMessage(), e);
        }
    }

    public Map uploadVideo(MultipartFile file, String folder) throws IOException {
        try {
            return cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "hkayet8ram/" + folder,
                            "resource_type", "video",
                            "use_filename", true,
                            "unique_filename", true
                    )
            );
        } catch (Exception e) {
            throw new IOException("Erreur upload video Cloudinary: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String publicId, String resourceType) throws IOException {
        cloudinary.uploader().destroy(
                publicId,
                ObjectUtils.asMap("resource_type", resourceType)
        );
    }
}