package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SpectacleDTO {

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    private LocalDate date;

    private String lieu;

    private String description;

    private String afficheUrl;
}