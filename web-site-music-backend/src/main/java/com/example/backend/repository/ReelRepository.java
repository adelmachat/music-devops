package com.example.backend.repository;

import com.example.backend.entity.Reel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReelRepository extends JpaRepository<Reel, Long> {
    List<Reel> findBySpectacleId(Long spectacleId);
    List<Reel> findByEpisodeId(Long episodeId);
    List<Reel> findByType(Reel.ReelType type);
    void deleteBySpectacleId(Long spectacleId);
    void deleteByEpisodeId(Long episodeId);
}