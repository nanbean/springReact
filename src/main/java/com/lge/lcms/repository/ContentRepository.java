package com.lge.lcms.repository;

import com.lge.lcms.model.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<Content> findById(Long contentId);

    Page<Content> findByCreatedBy(Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<Content> findByIdIn(List<Long> contentIds);

    List<Content> findByIdIn(List<Long> contentIds, Sort sort);
}