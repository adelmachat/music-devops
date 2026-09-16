package com.example.backend.repository;

import com.example.backend.entity.EpisodePodcast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EpisodeRepository extends JpaRepository<EpisodePodcast, Long> {
    List<EpisodePodcast> findAllByOrderByNumeroDesc();
}