package com.lge.lcms.web;

import com.lge.lcms.dto.ContentSaveRequestDto;
import com.lge.lcms.content.ContentRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/rest")
public class ContentRestController {

	private ContentRepository contentRepository;

	@PostMapping("/content")
	public void savePosts(@RequestBody ContentSaveRequestDto dto){
		contentRepository.save(dto.toEntity());
	}
}
