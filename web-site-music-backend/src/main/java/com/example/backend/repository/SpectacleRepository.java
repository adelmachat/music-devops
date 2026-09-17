package com.example.backend.repository;

import com.example.backend.entity.Spectacle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpectacleRepository extends JpaRepository<Spectacle, Long> {
    List<Spectacle> findAllByOrderByDateDesc();
}