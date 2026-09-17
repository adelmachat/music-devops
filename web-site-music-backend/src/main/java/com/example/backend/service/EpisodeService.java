package com.example.backend.service;


import com.example.backend.dto.EpisodeDTO;
import com.example.backend.dto.EpisodeResponseDTO;
import com.example.backend.dto.ReelDTO;
import com.example.backend.entity.EpisodePodcast;
import com.example.backend.entity.Reel;
import com.example.backend.repository.EpisodeRepository;
import com.example.backend.repository.ReelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EpisodeService {

    private final EpisodeRepository episodeRepository;
    private final ReelRepository reelRepository;

    public List<EpisodeResponseDTO> getAllEpisodes() {
        return episodeRepository.findAllByOrderByNumeroDesc()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public EpisodeResponseDTO getEpisodeById(Long id) {
        EpisodePodcast episode = episodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Episode non trouvé"));
        return toResponseDTO(episode);
    }

    public EpisodeResponseDTO createEpisode(EpisodeDTO dto) {
        EpisodePodcast episode = EpisodePodcast.builder()
                .numero(dto.getNumero())
                .titre(dto.getTitre())
                .description(dto.getDescription())
                .youtubeUrl(dto.getYoutubeUrl())
                .afficheUrl(dto.getAfficheUrl())
                .datePublication(dto.getDatePublication())
                .build();
        return toResponseDTO(episodeRepository.save(episode));
    }

    public EpisodeResponseDTO updateEpisode(Long id, EpisodeDTO dto) {
        EpisodePodcast episode = episodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Episode non trouvé"));

        episode.setNumero(dto.getNumero());
        episode.setTitre(dto.getTitre());
        episode.setDescription(dto.getDescription());
        episode.setYoutubeUrl(dto.getYoutubeUrl());
        episode.setDatePublication(dto.getDatePublication());
        if (dto.getAfficheUrl() != null) {
            episode.setAfficheUrl(dto.getAfficheUrl());
        }

        return toResponseDTO(episodeRepository.save(episode));
    }

    @Transactional
    public void deleteEpisode(Long id) {
        episodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Episode non trouvé"));
        reelRepository.deleteByEpisodeId(id);
        episodeRepository.deleteById(id);
    }

    public void uploadAfficheUrl(Long id, String url) {
        EpisodePodcast episode = episodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Episode non trouvé"));
        episode.setAfficheUrl(url);
        episodeRepository.save(episode);
    }

    public ReelDTO addReel(Long episodeId, String url, String titre) {
        EpisodePodcast episode = episodeRepository.findById(episodeId)
                .orElseThrow(() -> new RuntimeException("Episode non trouvé"));

        Reel reel = Reel.builder()
                .url(url)
                .titre(titre)
                .type(Reel.ReelType.PODCAST)
                .episode(episode)
                .build();

        Reel saved = reelRepository.save(reel);
        ReelDTO rdto = new ReelDTO();
        rdto.setId(saved.getId());
        rdto.setUrl(saved.getUrl());
        rdto.setTitre(saved.getTitre());
        rdto.setType(saved.getType().name());
        return rdto;
    }

    private EpisodeResponseDTO toResponseDTO(EpisodePodcast episode) {
        EpisodeResponseDTO dto = new EpisodeResponseDTO();
        dto.setId(episode.getId());
        dto.setNumero(episode.getNumero());
        dto.setTitre(episode.getTitre());
        dto.setDescription(episode.getDescription());
        dto.setYoutubeUrl(episode.getYoutubeUrl());
        dto.setAfficheUrl(episode.getAfficheUrl());
        dto.setDatePublication(episode.getDatePublication());

        dto.setReels(reelRepository.findByEpisodeId(episode.getId())
                .stream().map(r -> {
                    ReelDTO rdto = new ReelDTO();
                    rdto.setId(r.getId());
                    rdto.setUrl(r.getUrl());
                    rdto.setTitre(r.getTitre());
                    rdto.setType(r.getType().name());
                    return rdto;
                }).collect(Collectors.toList()));

        return dto;
    }
}