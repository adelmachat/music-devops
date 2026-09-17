package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MediaUploadResponse {
    private String url;
    private String publicId;
    private String type;
    private String message;
}