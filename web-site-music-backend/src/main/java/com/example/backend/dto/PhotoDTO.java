package com.example.backend.dto;

import lombok.Data;

@Data
public class PhotoDTO {
    private Long id;
    private String url;
    private String legende;
    private Integer ordre;
}