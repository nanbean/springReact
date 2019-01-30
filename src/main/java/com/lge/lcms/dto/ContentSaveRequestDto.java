package com.lge.lcms.dto;

import com.lge.lcms.content.Content;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
@NoArgsConstructor
public class ContentSaveRequestDto {

		private String title;
		private String genre;

		public Content toEntity(){
			return Content.builder()
				.title(title)
				.genre(genre)
				.build();
		}
}
