package com.lge.lcms.controller;

import com.lge.lcms.model.*;
import com.lge.lcms.payload.*;
import com.lge.lcms.repository.ContentRepository;
import com.lge.lcms.repository.UserRepository;
import com.lge.lcms.security.CurrentUser;
import com.lge.lcms.security.UserPrincipal;
import com.lge.lcms.service.ContentService;
import com.lge.lcms.util.AppConstants;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/contents")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContentService contentService;

    // private static final Logger logger =
    // LoggerFactory.getLogger(ContentController.class);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public PagedResponse<ContentResponse> getContents(@CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return contentService.getAllContents(currentUser, page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createContent(@Valid @RequestBody ContentRequest contentRequest) {
        Content content = contentService.createContent(contentRequest);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{contentId}")
                .buildAndExpand(content.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Content Created Successfully"));
    }

    @PostAuthorize("(returnObject.createdBy.username == #currentUser.username) or hasRole('ROLE_ADMIN')")
    @GetMapping("/{contentId}")
    public ContentResponse getContentById(@CurrentUser UserPrincipal currentUser, @PathVariable Long contentId) {
        return contentService.getContentById(contentId, currentUser);
    }
}