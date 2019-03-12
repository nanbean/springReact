package com.lge.lcms.service.datafetcher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lge.lcms.model.Content;
import com.lge.lcms.repository.ContentRepository;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

@Component
public class AllContentsDataFetcher implements DataFetcher<List<Content>> {

	@Autowired
	private ContentRepository contentRepository;

	@Override
	public List<Content> get(DataFetchingEnvironment arg0) {
		return contentRepository.findAll();
	}

}
