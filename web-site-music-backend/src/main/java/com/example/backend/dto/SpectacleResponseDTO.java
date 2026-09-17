package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class SpectacleResponseDTO {

    private Long id;
    private String titre;
    private LocalDate date;
    private String lieu;
    private String description;
    private String afficheUrl;
    private List<PhotoDTO> photos;
    private List<ReelDTO> reels;
}