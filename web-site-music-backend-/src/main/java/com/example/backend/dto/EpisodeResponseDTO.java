package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class EpisodeResponseDTO {

    private Long id;
    private Integer numero;
    private String titre;
    private String description;
    private String youtubeUrl;
    private String afficheUrl;
    private LocalDate datePublication;
    private List<ReelDTO> reels;
}