package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EpisodeDTO {

    @NotNull(message = "Le numéro est obligatoire")
    private Integer numero;

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    private String description;

    private String youtubeUrl;

    private String afficheUrl;

    private LocalDate datePublication;
}