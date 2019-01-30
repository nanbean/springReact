package com.lge.lcms.content;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ContentRepositoryTest {

		@Autowired
		ContentRepository contentRepository;

		@After
		public void cleanup() {
			contentRepository.deleteAll();
		}

		@Test
		public void getTest() {
			contentRepository.save(Content.builder()
				.title("Incredible")
				.genre("Action")
				.build());

			List<Content> contentList = contentRepository.findAll();

			Content content = contentList.get(0);
			assertThat(content.getTitle(), is("Incredible"));
			assertThat(content.getGenre(), is("Action"));
		}
}
