package com.lge.lcms.service.datafetcher;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lge.lcms.content.Content;
import com.lge.lcms.content.ContentRepository;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

@Component
public class ContentDataFetcher implements DataFetcher<Content> {

	@Autowired
	private ContentRepository contentRepository;

	@Override
	public Content get(DataFetchingEnvironment arg0) {
		Long id = arg0.getArgument("id");
		Optional<Content> content = this.contentRepository.findById(id);
		if (content.isPresent()) {
			return content.get();
		} else {
			return null;
		}
	}

}
