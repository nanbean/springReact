package com.lge.lcms.util;

import com.lge.lcms.model.User;
import com.lge.lcms.model.Content;
import com.lge.lcms.payload.ContentResponse;
import com.lge.lcms.payload.UserSummary;

public class ModelMapper {

    public static ContentResponse mapContentToContentResponse(Content content, User creator) {
        ContentResponse contentResponse = new ContentResponse();
        contentResponse.setId(content.getId());
        contentResponse.setTitle(content.getTitle());
        contentResponse.setGenre(content.getGenre());
        contentResponse.setDescription(content.getDescription());
        contentResponse.setCreationDateTime(content.getCreatedAt());

        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        contentResponse.setCreatedBy(creatorSummary);

        return contentResponse;
    }
}