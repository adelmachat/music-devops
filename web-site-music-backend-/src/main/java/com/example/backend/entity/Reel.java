package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    private String titre;

    @Enumerated(EnumType.STRING)
    private ReelType type;

    @ManyToOne
    @JoinColumn(name = "spectacle_id")
    private Spectacle spectacle;

    @ManyToOne
    @JoinColumn(name = "episode_id")
    private EpisodePodcast episode;

    public enum ReelType {
        SPECTACLE, PODCAST
    }
}