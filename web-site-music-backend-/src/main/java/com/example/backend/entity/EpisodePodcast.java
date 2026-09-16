package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "episodes_podcast")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EpisodePodcast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer numero;

    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String youtubeUrl;

    private String afficheUrl;

    private LocalDate datePublication;

    @OneToMany(mappedBy = "episode", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reel> reels;
}