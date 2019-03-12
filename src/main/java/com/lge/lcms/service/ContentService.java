package com.lge.lcms.service;

import com.lge.lcms.exception.BadRequestException;
import com.lge.lcms.exception.ResourceNotFoundException;
import com.lge.lcms.model.*;
import com.lge.lcms.payload.PagedResponse;
import com.lge.lcms.payload.ContentRequest;
import com.lge.lcms.payload.ContentResponse;
import com.lge.lcms.repository.ContentRepository;
import com.lge.lcms.repository.UserRepository;
import com.lge.lcms.security.UserPrincipal;
import com.lge.lcms.util.AppConstants;
import com.lge.lcms.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private UserRepository userRepository;

    // private static final Logger logger =
    // LoggerFactory.getLogger(ContentService.class);

    public PagedResponse<ContentResponse> getAllContents(UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Contents
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Content> contents = contentRepository.findAll(pageable);

        if (contents.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), contents.getNumber(), contents.getSize(),
                    contents.getTotalElements(), contents.getTotalPages(), contents.isLast());
        }

        // Map Contents to ContentResponses and content creator
        // details
        List<Long> contentIds = contents.map(Content::getId).getContent();
        Map<Long, User> creatorMap = getContentCreatorMap(contents.getContent());

        List<ContentResponse> contentResponses = contents.map(content -> {
            return ModelMapper.mapContentToContentResponse(content, creatorMap.get(content.getCreatedBy()));
        }).getContent();

        return new PagedResponse<>(contentResponses, contents.getNumber(), contents.getSize(),
                contents.getTotalElements(), contents.getTotalPages(), contents.isLast());
    }

    public PagedResponse<ContentResponse> getContentsCreatedBy(String username, UserPrincipal currentUser, int page,
            int size) {
        validatePageNumberAndSize(page, size);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        // Retrieve all contents created by the given username
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Content> contents = contentRepository.findByCreatedBy(user.getId(), pageable);

        if (contents.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), contents.getNumber(), contents.getSize(),
                    contents.getTotalElements(), contents.getTotalPages(), contents.isLast());
        }

        // Map Contents to ContentResponses and content creator
        // details
        List<Long> contentIds = contents.map(Content::getId).getContent();

        List<ContentResponse> contentResponses = contents.map(content -> {
            return ModelMapper.mapContentToContentResponse(content, user);
        }).getContent();

        return new PagedResponse<>(contentResponses, contents.getNumber(), contents.getSize(),
                contents.getTotalElements(), contents.getTotalPages(), contents.isLast());
    }

    public Content createContent(ContentRequest contentRequest) {
        Content content = new Content();
        content.setTitle(contentRequest.getTitle());
        content.setDescription(contentRequest.getDescription());
        content.setGenre(contentRequest.getGenre());

        return contentRepository.save(content);
    }

    public ContentResponse getContentById(Long contentId, UserPrincipal currentUser) {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException("Content", "id", contentId));

        // Retrieve content creator details
        User creator = userRepository.findById(content.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", content.getCreatedBy()));

        return ModelMapper.mapContentToContentResponse(content, creator);
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    Map<Long, User> getContentCreatorMap(List<Content> contents) {
        // Get Content Creator details of the given list of contents
        List<Long> creatorIds = contents.stream().map(Content::getCreatedBy).distinct().collect(Collectors.toList());

        List<User> creators = userRepository.findByIdIn(creatorIds);
        Map<Long, User> creatorMap = creators.stream().collect(Collectors.toMap(User::getId, Function.identity()));

        return creatorMap;
    }
}