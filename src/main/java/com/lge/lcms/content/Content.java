package com.lge.lcms.content;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

@NoArgsConstructor
@Table
@Getter
@Entity
public class Content {

	@Id
	@GeneratedValue
	private Long id;

	@Column
	private String title;

	@Column
	private String genre;

	@Builder
	public Content(String title, String genre) {
		this.title = title;
		this.genre = genre;
	}
}
