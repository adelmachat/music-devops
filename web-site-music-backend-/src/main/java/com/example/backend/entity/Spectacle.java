package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "spectacles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Spectacle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    private LocalDate date;

    private String lieu;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String afficheUrl;

    @OneToMany(mappedBy = "spectacle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos;

    @OneToMany(mappedBy = "spectacle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reel> reels;
}