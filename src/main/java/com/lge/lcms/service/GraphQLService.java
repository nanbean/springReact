package com.lge.lcms.service;

import java.io.InputStream;
import org.apache.commons.io.IOUtils;
import java.io.FileOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.lge.lcms.content.Content;
import com.lge.lcms.content.ContentRepository;
import com.lge.lcms.service.datafetcher.AllContentsDataFetcher;
import com.lge.lcms.service.datafetcher.ContentDataFetcher;

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

@Service
public class GraphQLService {

	@Value("classpath:contents.graphql")
	private Resource resource;

	private GraphQL graphQL;

	@Autowired
	private ContentRepository contentRepository;

	@Autowired
	private AllContentsDataFetcher allContentsDataFetcher;

	@Autowired
	private ContentDataFetcher contentDataFetcher;

	@PostConstruct
	public void loadSchema() throws IOException {

		loadDataHSQL();

		InputStream inputStream = resource.getInputStream();
		File schemaFile = File.createTempFile("p12", ".tmp");
		IOUtils.copy(inputStream, new FileOutputStream(schemaFile));

		TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemaFile);
		RuntimeWiring wiring =  buildRuntimeWiring();
		GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
		graphQL = GraphQL.newGraphQL(schema).build();
	}

	private RuntimeWiring buildRuntimeWiring() {
		return RuntimeWiring.newRuntimeWiring()
			.type("Query", typeWiring ->
				typeWiring.dataFetcher("allContents", allContentsDataFetcher)
				.dataFetcher("content", contentDataFetcher))
			.build();
	}

	public GraphQL getGraphQL() {
		return graphQL;
	}

	private void loadDataHSQL() {
		Stream.of(
			new Content("Incredible", "Action"),
			new Content("Frozen", "Fantasy"),
			new Content("Snow White", "Romance")
		).forEach(content ->
			contentRepository.save(content)
		);
	}

}
