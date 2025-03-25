package com.project.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataInsert implements CommandLineRunner {
	
	// 개발 환경에서 더미데이터 삽입 코드
	
	private final CategoryData cd;
//	private final UserData ud;
//	private final ProductData pd;
	private final SizeData sd;
//	private final WishData wd;
//	private final ReviewData rd;

	@Override
	public void run(String... args) throws Exception {
		cd.insertDate();
//		ud.insertDate();
//		pd.insertDate();
		sd.insertDate();
//		wd.insertDate();
//		rd.insertDate();
		
	}

}
